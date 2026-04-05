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
  if (
    inputTitle.value.trim() == "" ||
    inputAuthor.value.trim() == "" ||
    inputPages.value.trim() == "" ||
    Number(inputPages.value) <= 0 ||
    Number(inputPages.value) > 5000

  ) {
    alert("Please check your input!");
    return false;
  } else {
    let book = new Book(inputTitle.value.trim(), inputAuthor.value.trim(), Number(inputPages.value.trim()), check.checked);
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
  let tableDisplay = document.getElementById("display");
  //delete old table
  document.querySelector('#display tbody').innerHTML = "";
  //insert updated row and cells
  let length = myLibrary.length;
  for (let i = 0; i < length; i++) {
    const row = tableDisplay.insertRow(1);
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
