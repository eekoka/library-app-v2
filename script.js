const myLibrary = [];

function Book(title, author, noPages, read) {
    this.title = title;
    this.author = author;
    this.noPages = noPages;
    this.read = read;

    this.info = function() {
        return title+" by "+author+", "+noPages+" pages, "+read;
    }

}

function addBookToLibrary(title, author, noPages, read) {
   const book = new Book(title, author, noPages, read);
   myLibrary.push(book);
}

addBookToLibrary("The Intelligent Investor", "Benjamin Graham", 640, "Read");
addBookToLibrary("Security Analysis", "Benjamin Graham", 725, "Not Read");
addBookToLibrary("A Random Walk Down Wall Street", "Burton Malkiel", 448, "Not Read");
addBookToLibrary("Common Stocks and Uncommon Profits", "Philip A. Fisher", 320, "Read");
addBookToLibrary("The Little Book of Common Sense Investing", "John C. Bogle", 304, "Not Read");


//get reference to content div that already exists
const oldTableBody = document.querySelector("#bTableBody");
//create table body
const newTableBody = document.createElement("tbody");
//add ID to the created element
newTableBody.id = "bTableBody";

myLibrary.forEach(getDetails);

function getDetails(book, index) {

   const tableRow = newTableBody.insertRow(index);
   const cell1 = tableRow.insertCell(0);
   const cell2 = tableRow.insertCell(1);
   const cell3 = tableRow.insertCell(2);
   const cell4 = tableRow.insertCell(3);
   cell1.textContent = book.title;

   //add remove button to first column
   const removeBtn = document.createElement("button");
   removeBtn.textContent = "Remove";
   removeBtn.className = "removeBtn";
   removeBtn.id = "removeBtn_" + index;
   cell1.appendChild(removeBtn);

   cell2.textContent = book.author;
   cell3.textContent = book.noPages;
   cell4.textContent = book.read;

   //add button to change read status to last column
   const changeStatusBtn = document.createElement("button");
   changeStatusBtn.textContent = "Change";
   changeStatusBtn.className = "changeStatusBtn";
   changeStatusBtn.id = "changeStatusBtn_" + index;
   cell4.appendChild(changeStatusBtn);
}

//replace reference tbody with new one
oldTableBody.parentNode.replaceChild(newTableBody, oldTableBody)



//get references to elements in html file
const dialog = document.querySelector("#newBookDialog");
const cancelBtn = document.querySelector("#cancelBtn");
const confirmBtn = document.querySelector("#confirmBtn");
const newBookBtn = document.querySelector("#newBookBtn");

// Update button opens a modal dialog
newBookBtn.addEventListener("click", () => {
    dialog.showModal();
});

// Form cancel button closes the dialog box
cancelBtn.addEventListener("click", () => {
    dialog.close();
});

function removeTableBody () {
    const oldTableBodyV0 = document.querySelector("#bTableBody");
    oldTableBodyV0.remove();
}


//refresh table
function refreshTable () {
    //const oldTableBodyV2 = document.querySelector("#bTableBody");
    //create table body
    const newTableBodyV2 = document.createElement("tbody");
    //add ID to the created element
    newTableBodyV2.id = "bTableBody";

    //adds entries back table
    myLibrary.forEach(getDetailsV2);

    function getDetailsV2(book, index) {

        const tableRow = newTableBodyV2.insertRow(index);
        const cell1 = tableRow.insertCell(0);
        const cell2 = tableRow.insertCell(1);
        const cell3 = tableRow.insertCell(2);
        const cell4 = tableRow.insertCell(3);
        cell1.textContent = book.title;
     
        //add remove button to first column
        const removeBtn = document.createElement("button");
        removeBtn.textContent = "Remove";
        removeBtn.className = "removeBtn";
        removeBtn.id = "removeBtn_" + index;
        cell1.appendChild(removeBtn);
     
        cell2.textContent = book.author;
        cell3.textContent = book.noPages;
        cell4.textContent = book.read;
     
        //add button to change read status to last column
        const changeStatusBtn = document.createElement("button");
        changeStatusBtn.textContent = "Change";
        changeStatusBtn.className = "changeStatusBtn";
        changeStatusBtn.id = "changeStatusBtn_" + index;
        cell4.appendChild(changeStatusBtn);
    }

    removeTableBody();
    //replace reference tbody with new one
    //oldTableBodyV2.parentNode.replaceChild(newTableBodyV2, oldTableBodyV2);
    //remove old table and put new one
    const tableDiv = document.querySelector("#bTable");
    tableDiv.appendChild(newTableBodyV2);
}


//confirm button collects data and closes the dialog box
confirmBtn.addEventListener("click", (event) => {
    //event.preventDefault(); //this prevent the form from submitting in test form - it should be removed in production code
    //dialog.close();//removed this because the form closes by default when confirm button is clicked
    const bTitle = document.querySelector("#bookTitle").value;
    const bAuthor = document.querySelector("#author").value;
    const bPages = document.querySelector("#nPages").value;
    const bStatus = document.querySelector("#readStatus").value;

    //add book to library then wipe and repopulation table if all inputs are valid
    if (document.querySelector("#bookTitle").validity.valid === true &&
        document.querySelector("#author").validity.valid === true &&
        document.querySelector("#nPages").validity.valid === true &&
        document.querySelector("#readStatus").validity.valid === true) {
            addBookToLibrary(bTitle, bAuthor, bPages, bStatus);
            refreshTable();
    }
});

//listen for clicks on the table
const refTable = document.querySelector("#bTable");
const ruSureDialog = document.querySelector("#ruSureDialog");
const ruSureBtnYes = document.querySelector("#ruSureBtnYes");
const ruSureBtnNo = document.querySelector("#ruSureBtnNo");
const ruSureBtnMsg = document.querySelector("#ruSureMsg");

// Form cancel button closes the dialog box
ruSureBtnNo.addEventListener("click", () => {
    ruSureDialog.close();
});

refTable.addEventListener("click", (event)=>{
   //remove the book when button is clicked
   //and if the change button is clicked then change the read status
   if (event.target.className === "removeBtn") {
      const btnOrder = event.target.id.split("_");
      ruSureBtnMsg.textContent = "Do you want to remove the book: " + 
                                myLibrary[btnOrder[1]].title + " by " + myLibrary[btnOrder[1]].author + "?";
      ruSureDialog.showModal();
      ruSureBtnYes.onclick = () => {
        event.preventDefault();
        myLibrary.splice(btnOrder[1], 1);
        refreshTable();
        ruSureDialog.close();
      }

   } else if (event.target.className === "changeStatusBtn") {
      const btnOrder = event.target.id.split("_");
      //use ternary operator just for fun - you can also use ifelse statement
      let readStatus;
      readStatus = myLibrary[btnOrder[1]].read == "Read" ? "Not read" : "Read";
      myLibrary[btnOrder[1]].read = readStatus;
      refreshTable();
   };
});

