const express = require('express');

const router = express.Router();

var users = {
    "johnsmith@gamil.com": {"firstName": "John","lastName": "Doe","DOB":"22-12-1990"},
    "annasmith@gamil.com":{"firstName": "Anna","lastName": "smith","DOB":"02-07-1983"},
    "peterjones@gamil.com":{"firstName": "Peter","lastName": "Jones","DOB":"21-03-1989"}
};


router.get('/',function (req, res) {
    
    res.send(JSON.stringify({users}, null, 4));
    
});

router.get('/:email',function (req, res) {
const email = req.params.email;
res.send(users[email])

});

router.post("/",function (req,res){
   
    if (req.body.email){
        users[req.body.email] = {
            "firstName":req.body.firstName,
            "lastName":req.body.lastName,
            "DOB":req.body.DOB,
    
            }
    }
res.send("The user" + (' ')+ (req.body.firstName) + " Has been added!");
});
  
router.put("/:email", function (req, res) {
    const email = req.params.email;
   
    let filtered_users = users.filter((user) => user.email === email);
   
    if (filtered_users.length > 0) {
        let filtered_user = filtered_users[0];
        let DOB = req.body.DOB;
        let firstName = req.body.firstName;
        let lastName = req.body.lastName;
        if(DOB) {
            filtered_user.DOB = DOB
        }
        if(firstName) {
            filtered_user.firstName = firstName
        }
        if(lastName) {
            filtered_user.lastName = lastName
        }
        users = users.filter((user) => user.email != email);
        users.push(filtered_user);
        res.send(`User with the email  ${email} updated.`);
    }
    else{
        res.send("Unable to find user!");
    }
  });


  router.delete("/:email", (req, res) => {
    const email = req.params.email;
    if (req.params.email){
        users[req.params.email] = {
            "firstName":req.body.firstName,
            "lastName":req.body.lastName,
            "DOB":req.body.DOB,
    
            }
    }
    res.send(`User with the email  ${email} deleted.`);
  });



  module.exports=router;