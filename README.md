# EMP_Backend
In this Section we will be Create an API - Application Programming Interface, Read more  on REST Apis here https://www.redhat.com/en/topics/api/what-is-a-rest-api
This API will Contain methods such as POST, GET, PUT, DELETE. 
The API is Developed using Mongo, Node JS and Express JS, Check materials here.  http://coding.co.ke/mean/

![image](https://github.com/modcomlearning/EMP_Backend/assets/66998462/8b54f158-3461-41fa-b8c3-cc4e8e999001)

## Part 1 : Creating a Mongo DB.
Open Terminal and Type: mongosh
![image](https://github.com/modcomlearning/EMP_Backend/assets/66998462/852486c7-d4e2-4891-98a6-dcee9b460145)

We will create a database named Emp_DB, on the Mongo shell above type below command
```
use Emp_DB
```
The terminal now changes to Emp_DB> ..  We have a Mongo DB created.
Next we create an API to POST, GET, PUT, DELETE Employees using Node and Express JS.

## Part 2: Creating an API using Node and Express JS
Create a Folder Named Emp_Backend and Open this Folde rin your VS Code.
On VS code terminal and install express, Mongoose, Cors.
See http://coding.co.ke/mean/nodejs/10.%20MEAN_API_Part1.pdf  For more information.
Type below command in Terminal
```
npm install --save body-parser cors express mongoose
```

a) In Your **Emp_Backend** Folder create a subfolder named **models**, here we create a Mdel representing our Collection/Table that will store our employee in the Emp_DB created in step 1.
inside models folder create a File named Employee.js and place below code inside.
```
let mongoose = require("mongoose")
let schema = mongoose.Schema({
    first_name: String,
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
//Table/Collection to be created
collection: 'employees'
})
//We Must export the Schema to make it usable and visible to ther files in this Project.
module.exports = mongoose.model("Employee", schema)
    
```

b) We now create a Router which will now include the POST, GET, PUT, DELETE methods used in ABove Schema created.
In your Emp_Backend Folder, Create a subfolder named routes, inside this folder create a file named routes.js.
Inside routes.js place below codes.

```
//Import Express JS to be used in creating routes
var express = require("express")
//import our Employee Schema
var Employee = require("../models/Employee")
//create a Router from Express
var router = express.Router();

//POST Route - to Post data using our Employee model variables
router.post("/add", async (req, res)=>{
    //Provide data payload using req => ths is the Payload sent by Client, through, Angular, Curl, or even Postman
    var post = Employee({
        //Extract each variable from request
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
        //Post the data 
        var result = await post.save()
        res.status(200).json({ 'message': 'Employee Registered' })
    }
    catch (err) {
        res.status(200).json({ 'message': 'Error Occured!' })
    }
});

//
module.exports = router;
```

In above Code Async and await were used since there is a Long running operation, The post Promises a result that we will have to wait, then the promised result will arrive at a later point through a call back.
The result can be a success or an Error. Finally we export this Router to make it usable and visible to other files in this project that might need it.

c) In your  Emp_Backend Folder create a File named app.js.
This will be our main File, Type the code below.

```
//Import Express JS
var express = require("express")
//Import Mongoose
var mongoose = require("mongoose")
//Import the Routes
var routes = require("./routes/routes")
//Import Cross Origin Module
var cors = require("cors")

//Connect to Your Mongo DB. NB: Your DB must be running
mongoose.connect("mongodb://localhost:27017/Emp_DB", { useNewUrlParser: true })
    .then(() => {
        //Create an Express APP
        var app = express()
        //Allow client to send/parse data as JSON Object
        app.use(express.json())
        //Load the routes in this app and append a name that can be appended in our base URL.
        app.use("/api", routes)
        //Create a Server Runnning on port 3000.
        app.listen(3000, () => {
            console.log("Running on Base URL 127.0.0.1:3000")
        });
    });

```

Code Explanations.

useNewUrlParser - The underlying MongoDB driver has deprecated their current connection string parser. Because this is a major change, they added the useNewUrlParser flag to allow users to fall back to the old parser if they find a bug in the new parser.

Cross-origin resource sharing (CORS) is a browser security feature that restricts HTTP requests that are initiated from scripts running in the browser. CORS is typically required to build web applications that access APIs hosted on a different domain or origin.

express.json() - This is a built-in middleware function in Express. It parses incoming requests with JSON payloads and is based on body-parser. 

Below is the Folder structure of your Final App. Type: **node app.js** in terminal to run the app. See Image below

![image](https://github.com/modcomlearning/EMP_Backend/assets/66998462/5671b16f-9381-4924-9bfb-82e7d4d6ab36)



Once the App is running, Open Your Postman, download postman from here:
https://www.postman.com/downloads/

Now, Your Api is running in base URL: http://127.0.0.1:3000
We configured a /api to access our routes in routes.js
In routes we have a /add route.
So, the Full API for adding/post employees can be accessed at: http://127.0.0.1:3000/api/add

Its a POST with below Payload.
```
{
    "first_name": "John",
    "last_name": "Kamau",
    "surname": "Mwangi",
    "phone": "254729225710",
    "gender": "Male",
    "residence": "Kawangware",
    "id_number": "24917989",
    "department": "IT",
    "qualification": "Diploma"
}
```

Test it in Postman.
![image](https://github.com/modcomlearning/EMP_Backend/assets/66998462/e7132e62-1460-475c-990f-a0c0422d5d00)


d) Open your Mongo Shell.
Switch to Your Emp_DB,  Then Find records in employees Collection/Table.
```
db.employees.find()
```
Below shows the Save Employee.
![image](https://github.com/modcomlearning/EMP_Backend/assets/66998462/1ddcaed5-968c-4a0d-99dc-927c111fed0c)


You can Install Nodemon to avoid stop/running the Node server all the time.
Visit on how to use nodemon.
```
npm install --global nodemon
```

Now your can run your app as  nodemon app.js
Once run with nodemon No need to Stop/Run the node server, Just save and we are good to go!
END.

## Part 3.
In this Part, we will get, put, delete employees from mongo DB.
In  routes.js  add below route for vieweing all employees.
```
//GET
router.get("/employees", async (req, res)=> {
       try {
        //Here we find all employees from Employee Model
        var result = await Employee.find({})
        res.status(200).json({ 'message': result })
        }
        //Display an Error
        catch (err) {
            res.status(400).json({ 'message': err.message })
        }
});

```
Test in Postman
![image](https://github.com/modcomlearning/EMP_Backend/assets/66998462/6908b4e0-dc58-4597-ae30-4c2543da71f2)

Below Demonstrates a Get request with a firstname body, this will search a memebr based on first name.
```

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
```

Test in postman
![image](https://github.com/modcomlearning/EMP_Backend/assets/66998462/c31ab947-897b-4ad3-b135-18e535487d28)



UPDATE.
In routes.js, add below route to update a member qualification based on first name.
```
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
```

Test in postman
Below we update an employee qualification given first_name.
![image](https://github.com/modcomlearning/EMP_Backend/assets/66998462/0de921e8-9a84-4115-8160-d117cccbb582)

DELETE.

In this step we will delete an employee by first_name.

Add below code in your routes.js File.
```
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
```

Test in Postman
Here, we delete Jane record.
![image](https://github.com/modcomlearning/EMP_Backend/assets/66998462/c82b6660-caa4-4bb7-ae4b-801b86a6ee2b)

End.

# Part 4
## Authentication with Node/Express and Mongo.
This Part is a walkthrough to creating an module authentication with Express, Mongo and JSON Web Token. 

Overview of dependencies
express: the web framework
jsonwebtoken: library for signing/creating and verifying/validating JSON Web Tokens (JWT), often pronounced 'JOT' for some reason.
bcryptjs: library for hashing strings like password and then comparing the hash to strings for validation.
morgan: library for logs that can be helpful for debugging
mongoose: ODM for connecting and sending queries to a mongo database
cors: adds cors headers so our frontend app can make requests

a) Install Dependancies, Run below command.
```
npm install jsonwebtoken bcrypt mongoose-unique-validator
```

b ) We will create a user model which has the  username , email and password, This will define our users table/collection.

Create a models folder(If you dont have one) inside this folder create a User.js and write below code.

User.js
```
// models/User.js
const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
let userSchema = mongoose.Schema({
    name: {
        type: String
    },
    email: {
        type: String,
        unique: true
    },
    password: {
        type: String
    }
}, {
    collection: 'users'
})
userSchema.plugin(uniqueValidator, { message: 'Email already in use.' });
module.exports = mongoose.model('User', userSchema)
```

c) Now we create two routes for register-user and signin user.
This routes controller will handle:
"/register-user" receive data, hash password, create a new user
"/signin" receive data, check if user exists, check if password is correct, generate token and send it in response

d) Create a route for register-user.
In this function we will ' bcrypt.hash(req.body.password, 10).then((hash)' to hash the password provided by the user. Othe r details will include unique email and username.

Add below code in routes.js
```

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
  ```
  
  Run the app.js and test the register-user in Post man.
  ![image](https://github.com/modcomlearning/EMP_Backend/assets/66998462/196baf24-39a0-40fa-a51c-d19d49e88f9f)

  
e) Create a Signin route
This Route will involve;
1 . Receiving email, check if that email exists in MongoDB and give a response either Found or Not Found 
2.  If email Found we will get the hashed password saved under that email
3.  Verify the hashed password with the password the user Provided, We use bcrypt.
4    **bcrypt.compare(req.body.password, user.password);**
5.  If they Match Logged in Successful message is issed else authentication failure message is given.
6.  After Loggedin Successful, Generate JWT Token to be used for securing and limiting who can Access the Endpoints.

In routes.js add below Route.
```
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
```
Run the app.js and Test Login Postman, Notice below after Login success, we can see the user details and JWT token as response. see below.
![image](https://github.com/modcomlearning/EMP_Backend/assets/66998462/1070a918-8ee8-49d0-9dca-757ec4c43ac1)











