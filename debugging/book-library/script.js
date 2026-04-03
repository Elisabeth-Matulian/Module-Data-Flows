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
    //inputTitle.value == null ||
    inputTitle.value == "" ||
    //inputPages.value == null ||
    inputPages.value == ""
  ) {
    alert("Please fill all fields!");
    return false;
  } else {
    let book = new Book(inputTitle.value, inputAuthor.value, Number(inputPages.value), check.checked);
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
  let rowsNumber = tableDisplay.rows.length;
  //delete old table
  for (let n = rowsNumber - 1; n > 0; n--) {
    tableDisplay.deleteRow(n);
  }
  //insert updated row and cells
  let length = myLibrary.length;
  for (let i = 0; i < length; i++) {
    let row = tableDisplay.insertRow(1);
    let titleCell = row.insertCell(0);
    let authorCell = row.insertCell(1);
    let pagesCell = row.insertCell(2);
    let wasReadCell = row.insertCell(3);
    let deleteCell = row.insertCell(4);
    titleCell.textContent = myLibrary[i].title;
    authorCell.textContent = myLibrary[i].author;
    pagesCell.textContent = myLibrary[i].pages;

    //add and wait for action for read/unread button
    let changeBtn = document.createElement("button");
    //changeBtn.id = i;
    changeBtn.className = "btn btn-success";
    wasReadCell.appendChild(changeBtn);
    let readStatus = "";
    if (myLibrary[i].check === false) {
      readStatus = "No";
    } else {
      readStatus = "Yes";
    }
    changeBtn.innerText = readStatus;

    changeBtn.addEventListener("click", function () {
      myLibrary[i].check = !myLibrary[i].check;
      render();
    });

    //add delete button to every row and render again
    let deleteBtn = document.createElement("button");
    //deleteBtn.id = i + 5;
    deleteCell.appendChild(deleteBtn);
    deleteBtn.className = "btn btn-warning";
    deleteBtn.innerHTML = "Delete";
    deleteBtn.addEventListener("click", function () {
      myLibrary.splice(i, 1);
      render();
      alert(`You've deleted title: ${myLibrary[i].title}`);
    });
  }
}
