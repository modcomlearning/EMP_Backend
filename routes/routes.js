var express = require("express")
var Employee = require("../models/Employee")
var User = require("../models/User")
// Using require (CommonJS)
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');




var router = express.Router();

const verifyToken = require('../middleware/verifyToken');

router.post("/add", async (req, res)=>{
    var post = Employee({
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        surname: req.body.surname,
        phone: req.body.phone,
        gender: req.body.gender,
        residence: req.body.residence,
        id_number: req.body.id_number,
        department: req.body.department,
        qualification: req.body.qualification
    })
   
    try {
        var result = await post.save()
        res.status(200).json({ 'message': 'Employee Registered' })
    }
    catch (err) {
        res.status(400).json({ 'message': err.message })
    }
});


//GET
router.get("/employees", verifyToken, async (req, res)=> {
       try {
        var result = await Employee.find({})
        res.status(200).json({ 'message': result })
        }
        catch (err) {
            res.status(400).json({ 'message': err.message })
        }
})



//GET by Name
router.get("/employees/byname", verifyToken, async (req, res) => {
    try {
        var first_name = req.body.first_name
        var result = await Employee.find({ 'first_name': first_name })
        res.status(200).json({ 'message': result })
    }
    catch (err) {
        res.status(400).json({ 'message': err.message })
    }
});


//PUT
router.put("/employees/update", verifyToken, async (req, res) => {
    try {
        var first_name = req.body.first_name
        var qualification = req.body.qualification

        var result = await Employee.updateOne({ 'first_name': first_name }, {
            $set: {
                qualification: qualification
            }
        });

        res.status(200).json({ 'message': result })
    }
    catch (err) {
        res.status(400).json({ 'message': err.message })
    }
});

//DELETE
router.delete("/employees/delete", verifyToken, async (req, res) => {
    try {
        var first_name = req.body.first_name

        var result = await Employee.deleteOne({ 'first_name': first_name });

        res.status(200).json({ 'message': result })
    }
    catch (err) {
        res.status(400).json({ 'message': err.message })
    }
});

//REGISTER USER
router.post('/register-user', async (req, res) => {
    bcrypt.hash(req.body.password, 10).then((hash) => {
      const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: hash,
      })
        
      user.save()
        .then((response) => {
          res.status(201).json({
            message: 'User successfully created!',
            result: response,
          })
        })
        .catch((error) => {
          res.status(500).json({
            error: error,
          })
        })
    })
})


//LOGIN
// Login route to verify a user and get a token
router.post("/signin", async (req, res) => {
  try {
    // check if the user exists
    const user = await User.findOne({ email: req.body.email });
    if (user) {
      //check if password matches
      const result = await bcrypt.compare(req.body.password, user.password);
      if (result) {
        // sign token and send it in response
        const token = await jwt.sign({ email: user.email }, 'long-is-always-better');
          res.json({'token':token, 'user': user});
          

      } else {
        res.status(400).json({ error: "password doesn't match" });
      }
    } else {
      res.status(400).json({ error: "User doesn't exist" });
    }
  } catch (error) {
    res.status(400).json({ error });
  }
});



module.exports = router;