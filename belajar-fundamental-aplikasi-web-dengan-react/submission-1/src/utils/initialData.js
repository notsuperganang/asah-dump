const getInitialData = () => [
  {
    id: 'notes-1',
    title: 'Babel',
    body: 'Babel merupakan tools open-source yang digunakan untuk mengubah sintaks ECMAScript 2015+ menjadi sintaks yang didukung oleh JavaScript engine versi lama. Babel sering dipakai ketika kita menggunakan sintaks terbaru termasuk sintaks JSX.',
    archived: false,
    createdAt: '2022-04-14T04:27:34.572Z',
  },
  {
    id: 'notes-2',
    title: 'Functional Component',
    body: 'Functional component merupakan cara lain untuk menulis sebuah component. Pada sintaks ES2015 (ES6) kita bisa menggunakan arrow function untuk membuat functional component.\n\nFunctional component adalah sebuah fungsi JavaScript yang mengembalikan element JSX.',
    archived: false,
    createdAt: '2022-04-14T04:27:34.572Z',
  },
  {
    id: 'notes-3',
    title: 'Modularization',
    body: 'Dalam konteks pemrograman JavaScript, modularization merupakan teknik memecah atau membagi kode ke dalam berkas JavaScript yang terpisah berdasarkan tanggung jawabnya masing-masing.\n\nKita bisa membuat component-component kecil dan satukan kemudian untuk menciptakan aplikasi yang lebih besar.',
    archived: false,
    createdAt: '2022-04-14T04:27:34.572Z',
  },
  {
    id: 'notes-4',
    title: 'Lifecycle',
    body: 'Dalam React.js, lifecycle merupakan kumpulan method yang menjadi siklus hidup dari component. Lifecycle method akan dijalankan pada waktu tertentu pada proses hidup component tersebut.\n\nTiga siklus hidup component yaitu ketika component pertama kali dibuat (mounting), component mengalami perubahan (updating), dan component dihapus (unmounting).',
    archived: false,
    createdAt: '2022-04-14T04:27:34.572Z',
  },
  {
    id: 'notes-5',
    title: 'ESLint',
    body: 'ESLint merupakan tools yang digunakan untuk mengidentifikasi pola bermasalah yang ditemukan dalam kode JavaScript. Dengan menggunakan ESLint kita bisa mendapatkan umpan balik akan kesalahan dalam kod kita.',
    archived: false,
    createdAt: '2022-04-14T04:27:34.572Z',
  },
  {
    id: 'notes-6',
    title: 'Webpack',
    body: 'Webpack merupakan tools yang digunakan untuk menggabungkan seluruh berkas JavaScript yang terpisah menjadi satu berkas saja. Webpack juga mampu menggabungkan berkas CSS, gambar, dan aset lainnya menjadi satu berkas.',
    archived: true,
    createdAt: '2022-04-14T04:27:34.572Z',
  },
];

export default getInitialData;