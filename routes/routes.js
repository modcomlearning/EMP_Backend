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
        res.status(200).json({ 'message': 'Error Occured!' })
    }
});



module.exports = router;