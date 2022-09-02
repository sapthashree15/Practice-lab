const express = require('express');

const router = express.Router();

let users = [
    {
        firstName: "John",
        lastName: "Doe",
        email:"johndoe@gamil.com",
        DOB:"22-12-1990",
    },
    {
        firstName: "Anna",
        lastName: "smith",
        email:"annasmith@gamil.com",
        DOB:"02-07-1983",
    },
    {
        firstName: "Peter",
        lastName: "Jones",
        email:"peterjones@gamil.com",
        DOB:"21-03-1989",
    },
];


router.get('/',function (req, res) {
    res.json(users);
});

router.get("/:email",function (req,res){
    const email = req.params.email;
    let filtered_users = users.filter((user) => user.email === email);
    res.json(filtered_users);
});

router.post("/new/",function (req,res){
    if(!req.body.email){
        res.status(400)
        return res.json({error: "email is required..."})
    }

    const user ={
        "firstName":req.body.firstName,
        "lastName":req.body.lastName,
        "email":req.body.email,
        "DOB":req.body.DOB
    }

    users.push(user);
    res.send("The user" + (' ')+ (req.body.firstName) + " Has been added!");
})
  
router.put("/:email", function (req, res) {
    const email = req.params.email;
   
    let filtered_users = users.filter((user) => user.email === email);
   
    if (filtered_users.length > 0) {
        let filtered_user = filtered_users[0];
        let DOB = req.params.DOB;
        let firstName = req.params.firstName;
        let lastName = req.params.lastName;
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
    users = users.filter((user) => user.email != email);
    res.send(`User with the email  ${email} deleted.`);
  });

  module.exports=router;