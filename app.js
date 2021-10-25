//book constructor
function book(title, author, isbn){
    this.title=title;
    this.author=author;
    this.isbn=isbn;
}


//ui constructor
function UI(){

}


//event listeners
document.getElementById('book-form').addEventListener('submit', 
function(e){

    const title = document.getElementById('title').value,
    author =document.getElementById('author'),
    isbn=document.getElementById('isbn').value; 
    console.log(title,author, isbn)
    e.preventDefault();
});

