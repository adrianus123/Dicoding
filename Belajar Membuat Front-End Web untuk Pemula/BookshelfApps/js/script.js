let BOOK_ID = 0;
const books = [];
const STORAGE_KEY = "BOOKSHELF_APPS";
const RENDER_EVENT = "render-books";
const submitForm = document.getElementById("form-data-book");
const searchForm = document.getElementById("form-data-search");
const submitFormEdit = document.getElementById("form-edit-book");

const editTitle = document.getElementById("edit-title");
const editAuthor = document.getElementById("edit-author");
const editYear = document.getElementById("edit-year");
const editCompleted = document.getElementById("edit-check-completed");

const addForm = document.getElementById("add-form");
const editForm = document.getElementById("edit-form");

function isStorageExist() {
  if (typeof Storage === undefined) {
    alert("Browser kamu tidak mendukung local storage");
    return false;
  }
  return true;
}

function generateId() {
  return +new Date();
}

function generateBookObject(id, title, author, year, isCompleted) {
  return {
    id: id,
    title: title,
    author: author,
    year: year,
    isCompleted: isCompleted,
  };
}

function findBook(bookId) {
  for (const bookItem of books) {
    if (bookItem.id === bookId) {
      return bookItem;
    }
  }

  return null;
}

function findBookIndex(bookId) {
  for (const index in books) {
    if (books[index].id === bookId) {
      return index;
    }
  }

  return -1;
}

function addBook() {
  const id = generateId();
  const inputJudul = document.getElementById("book-title").value;
  const inputPenulis = document.getElementById("author").value;
  const inputTahun = document.getElementById("year").value;
  const checkBox = document.getElementById("check-completed").checked;

  const book = generateBookObject(
    id,
    inputJudul,
    inputPenulis,
    inputTahun,
    checkBox
  );

  books.push(book);
  document.dispatchEvent(new Event(RENDER_EVENT));
  saveData();
}

function saveData() {
  if (isStorageExist()) {
    const parsed = JSON.stringify(books);
    localStorage.setItem(STORAGE_KEY, parsed);
  }
}

function makeCardBook(book) {
  const textTitle = document.createElement("h3");
  textTitle.innerText = book.title;

  const textAuthor = document.createElement("p");
  textAuthor.innerText = book.author;

  const textYear = document.createElement("p");
  textYear.innerText = book.year;

  const bookInfoContainer = document.createElement("div");
  bookInfoContainer.classList.add("book-info");
  bookInfoContainer.append(textAuthor, textYear);

  const card = document.createElement("div");
  card.classList.add("card-book");
  card.append(textTitle, bookInfoContainer);
  card.setAttribute("id", `book-${book.id}`);

  const actionButton = document.createElement("div");
  actionButton.classList.add("action-button");

  const editButton = document.createElement("button");
  editButton.classList.add("btn-edit");
  editButton.setAttribute("title", "Edit");
  editButton.addEventListener("click", function () {
    editBook(book.id);
  });

  const deleteButton = document.createElement("button");
  deleteButton.classList.add("btn-delete");
  deleteButton.setAttribute("title", "Delete");
  deleteButton.addEventListener("click", function () {
    removeBookFromList(book.id);
  });

  if (book.isCompleted) {
    const undoButton = document.createElement("button");
    undoButton.classList.add("btn-undo");
    undoButton.setAttribute("title", "Uncompleted");
    undoButton.addEventListener("click", function () {
      undoBookFromCompleted(book.id);
    });

    actionButton.append(undoButton, editButton, deleteButton);
    card.append(actionButton);
  } else {
    const doneButton = document.createElement("button");
    doneButton.classList.add("btn-done");
    doneButton.setAttribute("title", "Completed");
    doneButton.addEventListener("click", function () {
      addBookToCompleted(book.id);
    });

    actionButton.append(doneButton, editButton, deleteButton);
    card.append(actionButton);
  }

  return card;
}

function addBookToCompleted(bookId) {
  const bookTarget = findBook(bookId);

  if (bookTarget == null) return;

  bookTarget.isCompleted = true;
  document.dispatchEvent(new Event(RENDER_EVENT));
  saveData();
}

function undoBookFromCompleted(bookId) {
  const bookTarget = findBook(bookId);

  if (bookTarget == null) return;

  bookTarget.isCompleted = false;
  document.dispatchEvent(new Event(RENDER_EVENT));
  saveData();
}

function editBook(bookId) {
  addForm.setAttribute("hidden", true);
  editForm.removeAttribute("hidden");

  const bookTarget = findBook(bookId);
  editTitle.value = bookTarget.title;
  editAuthor.value = bookTarget.author;
  editYear.value = bookTarget.year;
  editCompleted.checked = bookTarget.isCompleted;

  BOOK_ID = bookId;
}

function editDataBook(bookId) {
  const bookIndex = findBookIndex(bookId);

  if (bookIndex == -1) return;

  books[bookIndex].title = editTitle.value;
  books[bookIndex].author = editAuthor.value;
  books[bookIndex].year = editYear.value;
  books[bookIndex].isCompleted = editCompleted.checked;

  addForm.removeAttribute("hidden");
  editForm.setAttribute("hidden", true);

  document.dispatchEvent(new Event(RENDER_EVENT));
  saveData();
}

function removeBookFromList(bookId) {
  const bookTarget = findBookIndex(bookId);

  if (bookTarget === -1) return;

  books.splice(bookTarget, 1);
  document.dispatchEvent(new Event(RENDER_EVENT));
  saveData();
}

function loadDataFromStorage() {
  const serializedData = localStorage.getItem(STORAGE_KEY);
  let data = JSON.parse(serializedData);

  if (data !== null) {
    for (const book of data) {
      books.push(book);
    }
  }

  document.dispatchEvent(new Event(RENDER_EVENT));
}

function searchBook(keyword) {
  books.splice(0, books.length);

  if (keyword == "") {
    loadDataFromStorage();
    return;
  }

  const serializedData = localStorage.getItem(STORAGE_KEY);
  let data = JSON.parse(serializedData);

  if (data !== null) {
    for (const book of data) {
      if (book.title.match(keyword)) {
        books.push(book);
      }
    }
  }

  document.dispatchEvent(new Event(RENDER_EVENT));
}

document.addEventListener("DOMContentLoaded", function () {
  submitForm.addEventListener("submit", function (event) {
    event.preventDefault();
    addBook();
    submitForm.reset();
  });

  if (isStorageExist()) {
    loadDataFromStorage();
  }
});

document.addEventListener(RENDER_EVENT, function () {
  const notFinishedRead = document.getElementById("not-finished");
  const finishedRead = document.getElementById("finished");

  notFinishedRead.innerHTML = "";
  finishedRead.innerHTML = "";

  for (const book of books) {
    const cardBook = makeCardBook(book);
    if (book.isCompleted) {
      finishedRead.append(cardBook);
    } else {
      notFinishedRead.append(cardBook);
    }
  }
});

searchForm.addEventListener("click", function (event) {
  event.preventDefault();

  const keyword = document.getElementById("search-input").value;
  searchBook(keyword);
});

submitFormEdit.addEventListener("submit", function (event) {
  event.preventDefault();
  editDataBook(BOOK_ID);
});
