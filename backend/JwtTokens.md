### How JWT works ??

So when the user login using post req with their email and password then it checks if the user and password is valid or not or exist or not 

If it founds that it exists then it creates a unique JWT token for the user and sends it back 

The user then stores it in the localstorage or the cookies 
(By this way the server stays stateless means server doesn't know that a user is logged in only the user know that it is logged in )

JWT act as a password 

Now the next time the user want to have access to a protected route the user have to send the post or get req along with the JWT token in order to get the access

Once the user hits the protected routes the server checks if the JWT is valid or not and sends the data if its valid

One thing to notice that all the communication of sending the get or post req must happen under the HTTPS req 




### More about the JWT web tokens

ababababababababa.jkjkjkjkjkjkjkjkjjjkjkjk.xyzxyzxyzxyzxyzxyzxyxzyxzyxz (JWT LOOKS LIKE THIS)

A JWT consist of three parts the header (metadata about the JWT), the payload (the data like the ID or something) and the verifing signature 

The header and the payload can be decoded easily anyone can decode them it is the signature which is important

Signature is made of header, payload and the secret which is stored in the server by the process od siging algorithm .



### The actual rundown

The header and the payload along with the secret in the server creates the signature .
The signature along with the header and payload forms the JWT token ,
The JWT is then stored as cookie or in local storage

NOW the client have to send the req (along with JWTtokens) then 

The Jwt will be sent to the server and it will take the token's header and payload & create a test signature
The server checks if the test signature matches the signature that is sent by user.
If the signature matches the server will send the protected data to the user.


NOW! Lets implementing what we have learnt ! 

### Signup and Login along with JWT implementation

Lets start by creating a simple user model which will have the following feilds

```js
const mongoose = require("mongoose")
const validator = require("validator")
const bcrypt = require("bcryptjs");

const userSchema = mongoose.Schema({
  name: {
    type : String , 
    required : [true , "Name is required"]
  },
  email : {
    type: String ,
    required : [true , "Email is required"],
    unique : true,
    lowercase: true,
    validate : [validator.isEmail , "Provide a valid email"]
  },
  password : {
    type: String,
    required : [true , "Password is required"],
    select : false   // this means the encrypted password will not be visible in the DB
  },
  passwordConfirm : {
    type : String,
    required : [true , "Plz confirm your password"],
    validate : {
      validator : function(el){
       return el === this.password
    }}
  },
})

//Along with some modle instance function means it will be available to all the Users

// This is a middleware
// ~~userSchema.pre("save"~~ means before saving, run this function
userSchema.pre("save" , async function(next){ 
  if(!this.isModified("password"))return next()  //regular JS function to check if its modified
  this.password = await bcrypt.hash(this.password , 12); //hashing the password
  this.passwordConfirm = undefined  // setting it undefined
  next()
})

```

Now lets create a signup function in the controller's folder 

```js
//JWT sign is the process by which we are getting our token
const signtoken = id => jwt.sign({id} , process.env.JWTSecret , {  
  expiresIn: process.env.JWTexpiresIn
})

exports.signup = catchAsync(async(req, res , next)=>{
  const user = await User.create({
    name: req.body.name,
    email: req.body.email,
    password : req.body.password,
    passwordConfirm : req.body.passwordConfirm
  });

  const token = signtoken(user._id); //generally the signed up user is also logged in 
  res.status(200).json({
    status: 'success',
    token,  //returning the token after every successfull signin 
    data: {
      user  // with the info of the user
    }
  });

})


```

And by this simple way we can create a signin method . Now lets create a Login method 

Head over to your Models file where you have created user and add the following code 

```js
// this function will take unencrypted candidate's password and encrypted saved password and copare them whether they are same or not 

userSchema.methods.correctPassword = async function(candidatePassword , userPassword){
  return await bcrypt.compare(candidatePassword , userPassword);
}

```

Now head over to Controller file and add the following login code  


There are following checkpoints to keep in mind before login
- Checking if the user entered email and password
- Checking if the user is present in DB or not 
- Checking if the password entered is correct or not 

After these checks we can give back token in response

```js
exports.login = catchAsync(async(req, res , next)=>{
  
  const {email , password} = req.body;

  //check if there is email and pass
   if(!email || !password){
    return next(new AppError("Provide valid email or password" , 400))
   }

  //check if its correct or not (for that we have to make a instance method which will be available to all the models by default)
  // see the user Model file 
  const user = await User.findOne({email}).select('+password')
  // console.log(user.password);

  // const correct = await user.correctPassword(password , user.password)


  if(!user || !(await user.correctPassword(password , user.password))){
    return next(new AppError("Email or Password is not correct" , 401))
  }

  //return a token back

  const token = signtoken(user._id)  //using the signtoken function from above

  res.status(200).json({
    status: 'success',
    token,  // giving back token on successfull login
  });
})
``