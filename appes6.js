class Book{

    constructor(title,author, isbn){
     this.author=author;
     this.title=title;
     this.isbn=isbn;
    }
}
  
class UI{
    addBookToList(book){
        const list = document.getElementById('book-list');
        //create tr element
        const row = document.createElement('tr');
       //insert cols
     row.innerHTML = `<td> ${book.title} </td>
                     <td> ${book.author} </td>
                     <td> ${book.isbn} </td>
                     <td> <a href="#" class="delete">X<a></td>`;
                     list.appendChild(row);
    }

    
    showAlert(message, className){
//create div
const div= document.createElement('div');

//add classes
div.className = `alert ${className}`;
//add text
div.appendChild(document.createTextNode(message));
//get parent
const container = document.querySelector('.container');
//get form
const form = document.querySelector('#book-form');
//insert error label
container.insertBefore(div, form);
//timeout 
setTimeout(function(){
    document.querySelector('.alert').remove();
}, 3000
);
    }


    removeBookFromList(target){
        if(target.className=='delete'){
            target.parentElement.parentElement.remove();   
        }
    }

    clearFields(){
        document.getElementById('title').value='';
        document.getElementById('author').value='';
        document.getElementById('isbn').value='';
    }
}

//Local Storage Class
class Store{
    
    static getBooks(){
        let books;
        if(localStorage.getItem('books')===null){
            books = [];
        }else{
            books = JSON.parse(localStorage.getItem('books'))
        }
        return books
    }
    
    static displayBooks(){
        const books = Store.getBooks();
        books.forEach(function(book){
            const ui = new UI();
            //add book to ui
            ui.addBookToList(book);
        })
    }

    static addBook(book){
        const books = Store.getBooks();

        books.push(book);

        localStorage.setItem('books', JSON.stringify(books));
    }

    static removeBook(isbn){
        const books = Store.getBooks();

        books.forEach(function(book, index){
            console.log(book.isbn === isbn)
            if(book.isbn === isbn){
                books.splice(index,1);
            }
        });
        localStorage.setItem('books', JSON.stringify(books));
    }

}


//DOM load event
document.addEventListener('DOMContentLoaded', Store.displayBooks);
//event listeners
document.getElementById('book-form').addEventListener('submit', 
function(e){
//get form values
    const title = document.getElementById('title').value,
    author =document.getElementById('author').value,
    isbn=document.getElementById('isbn').value;
    //instantiate book
    const book = new Book(title,author, isbn);

      // Instantiate UI
      const ui = new UI();
   
      console.log(ui)
    //validate
    if(title==='' || author ==='' || isbn===''){
        ui.showAlert('Please show all fields', 'error');
    }else{

        //success
    ui.showAlert('Book Added!', 'success')
    //add book to list
    ui.addBookToList(book);
    
    //add to local storage
    Store.addBook(book);

   //clear fields
   ui.clearFields();
    }
    e.preventDefault();
});


//event listener for delete
document.getElementById('book-list').addEventListener(
    'click', function(e){
          // Instantiate UI
  const ui = new UI();
       ui.removeBookFromList(e.target);

       //remove from local storage
       let textContent =e.target.parentElement.previousElementSibling.textContent;
       Store.removeBook(textContent);
       console.log(textContent)
       ui.showAlert('Book Removed!', 'success');
       e.preventDefault();
    }
)