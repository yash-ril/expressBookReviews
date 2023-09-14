const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();


public_users.post("/register", (req,res) => {
  const username=req.body.username;
  const password=req.body.password;
    console.log(username,password);
  if(username && password){
    if(isValid(username)){
        users.push({"username":username,"password":password});
        return res.status(200).json({message:'User successfully registered'});
    }
    
    else{
        return res.status(404).json({message:'Username alredy exist'});
    }
  }
  else if(username){
    return res.status(404).json({message:'Enter password'});
  }
  else{
    return res.status(404).json({message:'Enter username'});
  }
  
});

// Get the book list available in the shop
public_users.get('/',function (req, res) {
  //Write your code here
  res.send(JSON.stringify(books,null,4));
  return res.status(300).json({message: "Yet to be implemented"});
});

// Get book details based on ISBN
public_users.get('/isbn/:isbn',function (req, res) {
  //Write your code here
  const isbn=req.params.isbn;
  console.log(isbn);

  for(const book in books){
      if (book==isbn){
        res.send(JSON.stringify(books[book],null,4));
      }
  }

  
  return res.status(300).json({message: "ISBN Not found"});
 });
  
// Get book details based on author
public_users.get('/author/:author',function (req, res) {
  //Write your code here
  list=[]
  const author=req.params.author;
  console.log(author);

  for(const book in books){
      if (books[book]['author']==author){
          list.push(books[book]);
      }
  }

  res.send(JSON.stringify(list,null,4));
  return res.status(300).json({message: "Yet to be implemented"});
});

// Get all books based on title
public_users.get('/title/:title',function (req, res) {
  //Write your code here
  list=[]
  const title=req.params.title;
  console.log(title);

  for(const book in books){
      if (books[book]['title']==title){
          list.push(books[book]);
      }
  }

  res.send(JSON.stringify(list));

  return res.status(300).json({message: "Yet to be implemented"});
});

//  Get book review
public_users.get('/review/:isbn',function (req, res) {
  //Write your code here
  const isbn=req.params.isbn;
  console.log(isbn);

  for(const book in books){
      if (book==isbn){
        res.send(JSON.stringify(books[book]['reviews']));
      }
  }
  return res.status(300).json({message: "ISBN not found"});
});

module.exports.general = public_users;
