class Book{

    constructor (author, title, isbn){
        author = this.author;
        title=this.title;
        isbn=this.isbn;
    }
}

class UI{
    addBookToList(book){

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


    }

    clearFields(){

    }
}