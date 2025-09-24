const getInitialData = () => [
  {
    id: 1,
    title: "Babel",
    body: "Babel merupakan tools open-source yang digunakan untuk mengubah sintaks ECMAScript 2015+ menjadi sintaks yang didukung oleh JavaScript engine versi lama. Babel sering dipakai ketika kita menggunakan sintaks terbaru termasuk sintaks JSX.",
    archived: false,
    createdAt: '2022-04-14T04:27:34.572Z'
  },
  {
    id: 2,
    title: "Functional Component",
    body: "Functional component merupakan cara terbaru untuk membuat komponen di React. Dengan menggunakan functional component, kita dapat membuat komponen yang lebih sederhana dan mudah dipahami.",
    archived: false,
    createdAt: '2022-04-14T04:27:34.572Z'
  },
  {
    id: 3,
    title: "Modularitas",
    body: "Dalam pemrograman, modularitas adalah konsep di mana kode dipecah menjadi modul-modul kecil yang dapat digunakan kembali. Hal ini membuat kode lebih mudah dipelihara dan dikembangkan.",
    archived: false,
    createdAt: '2022-04-14T04:27:34.572Z'
  },
  {
    id: 4,
    title: "Lifecycle",
    body: "Lifecycle dalam React merupakan siklus hidup komponen. Lifecycle terdiri dari tiga tahapan: mounting, updating, dan unmounting. Setiap tahap memiliki method yang dapat digunakan untuk melakukan aksi tertentu.",
    archived: false,
    createdAt: '2022-04-14T04:27:34.572Z'
  },
  {
    id: 5,
    title: "State Management",
    body: "State management adalah cara untuk mengelola state dalam aplikasi React. Ada berbagai cara untuk melakukan state management, salah satunya adalah menggunakan React hooks seperti useState dan useReducer.",
    archived: true,
    createdAt: '2022-04-14T04:27:34.572Z'
  },
  {
    id: 6,
    title: "React Router",
    body: "React Router adalah library yang digunakan untuk membuat routing dalam aplikasi React. Dengan React Router, kita dapat membuat single page application (SPA) yang memiliki beberapa halaman.",
    archived: true,
    createdAt: '2022-04-14T04:27:34.572Z'
  }
];

const showFormattedDate = (date) => {
  const options = {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  };
  return new Date(date).toLocaleDateString('id-ID', options);
};

export { getInitialData, showFormattedDate };