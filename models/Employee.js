let mongoose = require("mongoose")
let schema = mongoose.Schema({
    first_name: {
        type: String,
        required: [true, "Required!"],
        minlength:[5, "Must be more than 5"]
    },
    last_name: String,
    surname: String,
    phone: String,
    gender: String,
    residence: String,
    id_number: String,
    department: String,
    qualification: String
},
{
collection: 'employees'
})

module.exports = mongoose.model("Employee", schema)
    



