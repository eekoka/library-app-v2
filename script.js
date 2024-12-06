//wrap all the code in a self-executing function so we will have no global variable
//this will keep the variables private
(function() {
    let myLibrary = [
        {title: "The Intelligent Investor", author: "Benjamin Graham", pages: 640, status: "Read"},
        {title: "Security Analysis", author: "Benjamin Graham", pages: 725, status: "Not read"},
        {title: "A Random Walk Down Wall Street", author: "Burton Malkiel", pages: 448, status: "Not read"},
        {title: "Common Stocks and Uncommon Profits", author: "Philip A. Fisher", pages: 320, status: "Read"},
        {title: "The Little Book of Common Sense Investing", author: "John C. Bogle", pages: 304, status: "Not read"}
    ];

    //cache DOM
    const container = document.querySelector(".container");
    //const library = document.querySelector("#library");
    const dialog = document.querySelector("#newBookDialog");
    const cancelBtn = document.querySelector("#cancelBtn");
    const confirmBtn = document.querySelector("#confirmBtn");
    const newBookBtn = document.querySelector("#newBookBtn");

    _render();

    function _render () {
        //create new container (use thesame ID) to updated cards
        //this new container got to be created in this function for script to work properly
        const newLibrary = document.createElement("div");
        newLibrary.id = "library";

        myLibrary.forEach(showAllBooks);

        function showAllBooks(book, index) {
           const bCard = document.createElement("div");
           //add book details
           const bTitle = document.createElement("div");
           const bAuthor = document.createElement("div");
           const bPages = document.createElement("div");
           const bStatusBtn = document.createElement("button");
           //close button
           const bCloseBtn = document.createElement("button");

           bTitle.textContent = book.title;
           bAuthor.textContent = book.author;
           bPages.textContent = book.pages;
           bStatusBtn.textContent = book.status;
           bCloseBtn.textContent = "X";

           //define classnames and ID
           bCard.className = "bcard";
           bTitle.className = "btitle";
           bAuthor.className = "bauthor";
           bPages.className = "bpages";
           bStatusBtn.className = "bstatusbtn";
           bCloseBtn.className = "bclosebtn";
           bStatusBtn.id = "statusBtn_" + index;
           bCloseBtn.id = "removeBtn_" + index;

           //put all divs as children of Card
           bCard.appendChild(bTitle);
           bCard.appendChild(bAuthor);
           bCard.appendChild(bPages);
           bCard.appendChild(bStatusBtn);
           bCard.appendChild(bCloseBtn);
        
           newLibrary.appendChild(bCard);
        }
        //replace library with new one
        const library = document.querySelector("#library");
        library.remove();
        container.appendChild(newLibrary);
    }

    //Update button opens a modal dialog
    newBookBtn.addEventListener("click", () => {
        dialog.showModal();
    });

    //Form cancel button closes the dialog box
    cancelBtn.addEventListener("click", () => {
        dialog.close();
    });

    //confirm button collects data and closes the dialog box
    confirmBtn.addEventListener("click", (event) => {
        //event.preventDefault(); //this prevent the form from submitting in test form - it should be removed in production code
        //dialog.close();//removed this because the form closes by default when confirm button is clicked
        const title = document.querySelector("#bookTitle").value;
        const author = document.querySelector("#author").value;
        const pages = parseInt(document.querySelector("#nPages").value);
        const status = document.querySelector("#readStatus").value;

        //add book to library then wipe and repopulation table if all inputs are valid
        if (document.querySelector("#bookTitle").validity.valid === true &&
            document.querySelector("#author").validity.valid === true &&
            document.querySelector("#nPages").validity.valid === true &&
            document.querySelector("#readStatus").validity.valid === true) {
                myLibrary.push({title, author, pages, status});
                _render();
                //console.log(myLibrary);
        }
    });

    //cache DOM again here for deleting books
    const ruSureDialog = document.querySelector("#ruSureDialog");
    const ruSureBtnYes = document.querySelector("#ruSureBtnYes");
    const ruSureBtnNo = document.querySelector("#ruSureBtnNo");
    const ruSureBtnMsg = document.querySelector("#ruSureMsg");

    // Form cancel button closes the dialog box
    ruSureBtnNo.addEventListener("click", () => {
        ruSureDialog.close();
    });

    container.addEventListener("click", (event)=>{
        //get book ID to identify which book needs to be removed or changed
        const btnOrder = event.target.id.split("_");

        //remove the book when button is clicked
        //and if the change button is clicked then change the read status
        if (event.target.className === "bclosebtn") {
            ruSureBtnMsg.textContent = "Do you want to remove the book: " + 
                                        myLibrary[btnOrder[1]].title + " by " + myLibrary[btnOrder[1]].author + "?";
            ruSureDialog.showModal();
            ruSureBtnYes.onclick = () => {
                event.preventDefault();
                myLibrary.splice(btnOrder[1], 1);
                _render();
                ruSureDialog.close();
            }

        } else if (event.target.className === "bstatusbtn") {
            //use ternary operator just for fun - you can also use ifelse statement
            let readStatus;
            readStatus = myLibrary[btnOrder[1]].status == "Read" ? "Not read" : "Read";
            myLibrary[btnOrder[1]].status = readStatus;
            _render();
        };
    });

})();