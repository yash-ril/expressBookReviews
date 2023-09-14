const express = require('express');
const jwt = require('jsonwebtoken');
let books = require("./booksdb.js");
const regd_users = express.Router();

let users = [];

const isValid = (username)=>{ //returns boolean
//write code to check is the username is valid
for(const user of users){
    if(user['username']==username){
        return false;
    }
}
return true;

}

const authenticatedUser = (username,password)=>{ //returns boolean
//write code to check if username and password match the one we have in records.
let validUsers=users.filter((user)=>{
    return (user.username==username && user.password==password)
});
if(validUsers.length>0){
    return true;
}
return false;
}

//only registered users can login
regd_users.post("/login", (req,res) => {
  //Write your code here
  const username=req.body.username;
  const password=req.body.password;
   if (!username || !password){
    return res.status(404).json({message:'Error in logging in'});
   }
   if(authenticatedUser(username,password)){
       let accessToken=jwt.sign({
           data:password
       },'access',{expiresIn:60*60});
       req.session.authorization={accessToken,username}
       return res.status(200).json({message:'User logged in'});
   }
   else{
    return res.status(208).json({message:'Invalid credentials'});
   }
});

// Add a book review
regd_users.put("/auth/review/:isbn", (req, res) => {
  //Write your code here
  
  return res.status(300).json({message: "The review for book with ISBN"});
});

module.exports.authenticated = regd_users;
module.exports.isValid = isValid;
module.exports.users = users;
