require('dotenv').config();
const amqp = require('amqplib');
const nodemailer = require('nodemailer');
const CollaborationsService = require('../services/CollaborationsService');
const PlaylistsService = require('../services/PlaylistsService');
const PlaylistSongsService = require('../services/PlaylistSongsService');

async function buildPlaylistJSON(playlistId) {
  const collaborationsService = new CollaborationsService();
  const playlistsService = new PlaylistsService(collaborationsService);
  const playlistSongsService = new PlaylistSongsService();

  const playlist = await playlistsService.getPlaylistById(playlistId);
  const songs = await playlistSongsService.getSongsFromPlaylist(playlistId);

  return {
    playlist: {
      id: playlist.id,
      name: playlist.name,
      songs: songs.map((s) => ({ id: s.id, title: s.title, performer: s.performer })),
    },
  };
}

async function sendEmailJSON(to, data) {
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT || 587),
    secure: false,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASSWORD,
    },
  });

  const jsonString = JSON.stringify(data, null, 2);

  await transporter.sendMail({
    from: process.env.SMTP_USER,
    to,
    subject: 'Export Playlist',
    text: jsonString,
    attachments: [
      { filename: 'playlist-export.json', content: jsonString, contentType: 'application/json' },
    ],
  });
}

async function start() {
  const queue = 'export:playlists';
  const connection = await amqp.connect(process.env.RABBITMQ_SERVER);
  const channel = await connection.createChannel();
  await channel.assertQueue(queue, { durable: true });
  channel.prefetch(1);

  console.log('Export consumer started. Waiting for messages...');
  channel.consume(queue, async (msg) => {
    if (!msg) return;
    try {
      const payload = JSON.parse(msg.content.toString());
      const { playlistId, targetEmail } = payload;
      const data = await buildPlaylistJSON(playlistId);
      await sendEmailJSON(targetEmail, data);
      channel.ack(msg);
    } catch (err) {
      console.error('Export consumer error:', err);
      // requeue false to avoid infinite loop; alternatively, DLQ could be used
      channel.nack(msg, false, false);
    }
  });
}

// Start if executed directly
if (require.main === module) {
  start().catch((e) => {
    console.error('Failed to start export consumer:', e);
    process.exit(1);
  });
}

module.exports = { start };
