const BOOKS_KEY = 'bookshelf_books';
let books = [];
let isEditing = false;
let editingBookId = null;

function generateUniqueId() {
  return Number(new Date());
}

function saveBooksToStorage() {
  localStorage.setItem(BOOKS_KEY, JSON.stringify(books));
}

function loadBooksFromStorage() {
  const storedBooks = localStorage.getItem(BOOKS_KEY);
  if (storedBooks) {
    books = JSON.parse(storedBooks);
  }
}

function createBookObject(title, author, year, isComplete) {
  return {
    id: generateUniqueId(),
    title: title,
    author: author,
    year: Number(year),
    isComplete: isComplete
  };
}

function addBook(title, author, year, isComplete) {
  const newBook = createBookObject(title, author, year, isComplete);
  books.push(newBook);
  saveBooksToStorage();
  renderBooks();
}

function updateBook(id, title, author, year, isComplete) {
  const bookIndex = books.findIndex(book => book.id === id);
  if (bookIndex !== -1) {
    books[bookIndex] = {
      id: id,
      title: title,
      author: author,
      year: Number(year),
      isComplete: isComplete
    };
    saveBooksToStorage();
    renderBooks();
  }
}

function deleteBook(id) {
  if (confirm('Apakah Anda yakin ingin menghapus buku ini?')) {
    books = books.filter(book => book.id !== id);
    saveBooksToStorage();
    renderBooks();
  }
}

function toggleBookComplete(id) {
  const book = books.find(book => book.id === id);
  if (book) {
    book.isComplete = !book.isComplete;
    saveBooksToStorage();
    renderBooks();
  }
}

function createBookElement(book) {
  const bookElement = document.createElement('div');
  bookElement.setAttribute('data-bookid', book.id);
  bookElement.setAttribute('data-testid', 'bookItem');

  const completeButtonText = book.isComplete ? 'Belum selesai dibaca' : 'Selesai dibaca';

  bookElement.innerHTML = `
    <h3 data-testid="bookItemTitle">${book.title}</h3>
    <p data-testid="bookItemAuthor">Penulis: ${book.author}</p>
    <p data-testid="bookItemYear">Tahun: ${book.year}</p>
    <div>
      <button data-testid="bookItemIsCompleteButton">${completeButtonText}</button>
      <button data-testid="bookItemDeleteButton">Hapus Buku</button>
      <button data-testid="bookItemEditButton">Edit Buku</button>
    </div>
  `;

  const completeButton = bookElement.querySelector('[data-testid="bookItemIsCompleteButton"]');
  const deleteButton = bookElement.querySelector('[data-testid="bookItemDeleteButton"]');
  const editButton = bookElement.querySelector('[data-testid="bookItemEditButton"]');

  completeButton.addEventListener('click', () => {
    toggleBookComplete(book.id);
  });

  deleteButton.addEventListener('click', () => {
    deleteBook(book.id);
  });

  editButton.addEventListener('click', () => {
    startEditBook(book);
  });

  return bookElement;
}

function renderBooks(booksToRender = books) {
  const incompleteBookList = document.getElementById('incompleteBookList');
  const completeBookList = document.getElementById('completeBookList');

  incompleteBookList.innerHTML = '';
  completeBookList.innerHTML = '';

  booksToRender.forEach(book => {
    const bookElement = createBookElement(book);

    if (book.isComplete) {
      completeBookList.appendChild(bookElement);
    } else {
      incompleteBookList.appendChild(bookElement);
    }
  });

  const sampleIncompleteBook = incompleteBookList.querySelector('[data-bookid="123123123"]');
  const sampleCompleteBook = completeBookList.querySelector('[data-bookid="456456456"]');

  if (sampleIncompleteBook) {
    sampleIncompleteBook.remove();
  }
  if (sampleCompleteBook) {
    sampleCompleteBook.remove();
  }
}

function startEditBook(book) {
  isEditing = true;
  editingBookId = book.id;

  const titleInput = document.getElementById('bookFormTitle');
  const authorInput = document.getElementById('bookFormAuthor');
  const yearInput = document.getElementById('bookFormYear');
  const isCompleteCheckbox = document.getElementById('bookFormIsComplete');
  const submitButton = document.getElementById('bookFormSubmit');

  titleInput.value = book.title;
  authorInput.value = book.author;
  yearInput.value = book.year;
  isCompleteCheckbox.checked = book.isComplete;

  submitButton.innerHTML = `Update Buku`;
  updateSubmitButtonText();

  titleInput.focus();
}

function cancelEdit() {
  isEditing = false;
  editingBookId = null;

  const form = document.getElementById('bookForm');
  form.reset();

  const submitButton = document.getElementById('bookFormSubmit');
  submitButton.innerHTML = `Masukkan Buku ke rak <span>Belum selesai dibaca</span>`;
}

function updateSubmitButtonText() {
  const isCompleteCheckbox = document.getElementById('bookFormIsComplete');
  const submitButton = document.getElementById('bookFormSubmit');

  if (!isEditing) {
    const shelfText = isCompleteCheckbox.checked ? 'Selesai dibaca' : 'Belum selesai dibaca';
    submitButton.innerHTML = `Masukkan Buku ke rak <span>${shelfText}</span>`;
  }
}

function handleFormSubmit(event) {
  event.preventDefault();

  const titleInput = document.getElementById('bookFormTitle');
  const authorInput = document.getElementById('bookFormAuthor');
  const yearInput = document.getElementById('bookFormYear');
  const isCompleteCheckbox = document.getElementById('bookFormIsComplete');

  const title = titleInput.value.trim();
  const author = authorInput.value.trim();
  const year = parseInt(yearInput.value);
  const isComplete = isCompleteCheckbox.checked;

  if (!title || !author || !year) {
    alert('Harap isi semua field yang diperlukan!');
    return;
  }

  if (isEditing) {
    updateBook(editingBookId, title, author, year, isComplete);
    cancelEdit();
  } else {
    addBook(title, author, year, isComplete);
    event.target.reset();
    updateSubmitButtonText();
  }
}

function handleSearchSubmit(event) {
  event.preventDefault();

  const searchInput = document.getElementById('searchBookTitle');
  const searchTerm = searchInput.value.trim().toLowerCase();

  if (searchTerm === '') {
    renderBooks();
  } else {
    const filteredBooks = books.filter(book =>
      book.title.toLowerCase().includes(searchTerm)
    );
    renderBooks(filteredBooks);
  }
}

function initializeApp() {
  loadBooksFromStorage();
  renderBooks();

  const bookForm = document.getElementById('bookForm');
  const searchForm = document.getElementById('searchBook');
  const isCompleteCheckbox = document.getElementById('bookFormIsComplete');

  bookForm.addEventListener('submit', handleFormSubmit);
  searchForm.addEventListener('submit', handleSearchSubmit);

  isCompleteCheckbox.addEventListener('change', updateSubmitButtonText);

  const searchInput = document.getElementById('searchBookTitle');
  searchInput.addEventListener('input', (event) => {
    if (event.target.value.trim() === '') {
      renderBooks();
    }
  });
}

document.addEventListener('DOMContentLoaded', initializeApp);
