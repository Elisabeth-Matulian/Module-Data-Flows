let myLibrary = [];

window.addEventListener("load", function (e) {
  populateStorage();
  render();
});

function populateStorage() {
  if (myLibrary.length == 0) {
    let book1 = new Book("Robison Crusoe", "Daniel Defoe", 252, true);
    let book2 = new Book(
      "The Old Man and the Sea",
      "Ernest Hemingway",
      127,
      true
    );
    myLibrary.push(book1);
    myLibrary.push(book2);
  }
}

const inputTitle = document.getElementById("title");
const inputAuthor = document.getElementById("author");
const inputPages = document.getElementById("pages");
const check = document.getElementById("check");

//check the right input from forms and if its ok -> add the new book (object in array)
//via Book function and start render function
function submit() {
  const pages = Number(inputPages.value);
  const title = inputTitle.value.trim();
  const author = inputAuthor.value.trim();

  if (
    title == "" ||
    author == "" ||
    inputPages.value.trim() == "" ||
    pages <= 0 ||
    pages > 5000 || 
    !Number.isInteger(pages)
  ) {
    alert("Please check your input!");
    return false;
  } else {
    let book = new Book(title, author, pages, check.checked);
    myLibrary.push(book);
    render();
  }
}

function Book(title, author, pages, check) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.check = check;
}

function render() {
  let tableBody = document.querySelector("#display tbody");
  //delete old table
  tableBody.innerHTML = "";
  //insert updated row and cells
  let length = myLibrary.length;
  for (let i = 0; i < length; i++) {
    const row = tableBody.insertRow(0);
    const titleCell = row.insertCell(0);
    const authorCell = row.insertCell(1);
    const pagesCell = row.insertCell(2);
    const wasReadCell = row.insertCell(3);
    const deleteCell = row.insertCell(4);
    titleCell.textContent = myLibrary[i].title;
    authorCell.textContent = myLibrary[i].author;
    pagesCell.textContent = myLibrary[i].pages;

    //add and wait for action for read/unread button
    const changeBtn = document.createElement("button");
    changeBtn.className = "btn btn-success";
    wasReadCell.appendChild(changeBtn);
    const readStatus = myLibrary[i].check === false ? "No" : "Yes";
    changeBtn.innerText = readStatus;

    changeBtn.addEventListener("click", function () {
      myLibrary[i].check = !myLibrary[i].check;
      render();
    });

    //add delete button to every row and render again
    const deleteBtn = document.createElement("button");
    deleteCell.appendChild(deleteBtn);
    deleteBtn.className = "btn btn-warning";
    deleteBtn.innerHTML = "Delete";
    deleteBtn.addEventListener("click", function () {
      const deletedBook = myLibrary[i].title;
      myLibrary.splice(i, 1);
      render();
      alert(`You've deleted title: ${deletedBook}`);
    });
  }
}
