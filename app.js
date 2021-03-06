//book constructor
function Book(title, author, isbn){
    this.title=title;
    this.author=author;
    this.isbn=isbn;
}


//ui constructor
function UI(){

}

  //instantiate ui
  const ui = new UI();

UI.prototype.addBookToList = function(book){
   const list = document.getElementById('book-list');
   //create tr element
   const row = document.createElement('tr');
  //insert cols
row.innerHTML = `<td> ${book.title} </td>
                <td> ${book.author} </td>
                <td> ${book.isbn} </td>
                <td> ${book.title} </td>
                <td> <a href="#" class="delete">X<a></td>`;
                list.appendChild(row);
            }

//delete
UI.prototype.removeBookFromList=function(target){
 
    if(target.className=='delete'){
        target.parentElement.parentElement.remove();
        
    }

}

    //clear fields
    UI.prototype.clearFields= function(){
        document.getElementById('title').value='';
        document.getElementById('author').value='';
        document.getElementById('isbn').value='';
    }

// create and display error alert
    UI.prototype.showAlert = function(message, className){
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

//event listeners
document.getElementById('book-form').addEventListener('submit', 
function(e){
//get form values
    const title = document.getElementById('title').value,
    author =document.getElementById('author').value,
    isbn=document.getElementById('isbn').value;
    //instantiate book
    const book = new Book(title,author, isbn);

    //validate
    if(title==='' || author ==='' || isbn===''){
        ui.showAlert('Please show all fields', 'error');
    }else{

        //success
    ui.showAlert('Book Added!', 'success')
    //add book to list
    ui.addBookToList(book);
    
   //clear fields
   ui.clearFields();
    }
    e.preventDefault();
});

//event listener for delete
document.getElementById('book-list').addEventListener(
    'click', function(e){
       ui.removeBookFromList(e.target);
       ui.showAlert('Book Removed!', 'success');
       e.preventDefault();
    }
)