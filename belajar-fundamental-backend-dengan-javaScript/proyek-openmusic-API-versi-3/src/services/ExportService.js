const amqp = require('amqplib');

class ExportService {
  constructor() {
    this._server = process.env.RABBITMQ_SERVER;
    this._queue = 'export:playlists';
  }

  async sendPlaylistExportMessage(playlistId, targetEmail) {
    const connection = await amqp.connect(this._server);
    const channel = await connection.createChannel();
    await channel.assertQueue(this._queue, { durable: true });

    const message = JSON.stringify({ playlistId, targetEmail });
    channel.sendToQueue(this._queue, Buffer.from(message), { persistent: true });

    // Close connection gracefully
    setTimeout(() => {
      channel.close().catch(() => {});
      connection.close().catch(() => {});
    }, 0);
  }
}

module.exports = ExportService;

