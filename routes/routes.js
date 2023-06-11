var express = require("express")
var Employee = require("../models/Employee")

var router = express.Router();


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
router.get("/employees", async (req, res)=> {
       try {
        var result = await Employee.find({})
        res.status(200).json({ 'message': result })
        }
        catch (err) {
            res.status(400).json({ 'message': err.message })
        }
})



//GET by Name
router.get("/employees/byname", async (req, res) => {
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
router.put("/employees/update", async (req, res) => {
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
router.delete("/employees/delete", async (req, res) => {
    try {
        var first_name = req.body.first_name

        var result = await Employee.deleteOne({ 'first_name': first_name });

        res.status(200).json({ 'message': result })
    }
    catch (err) {
        res.status(400).json({ 'message': err.message })
    }
});



module.exports = router;