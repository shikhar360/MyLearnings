RPC_URL = `https://kovan.infura.io/v3/fdaugdffdy`;
PRIVATE_KEY = `0x25249684294964hackmatkarnabhai2484848457`; // some tools needs '0x' before the private key
PRIVATE_KAY_PASSWORD = password;

/* 



A breif Intro about Environment Variables
An environment variable is a variable whose value is set outside the program, typically through 
functionality built into the operating system or microservice. An environment variable is made up of a name/
value pair, and any number may be created and available for reference at a point in time.




To store the SENSITIVE information that we dont want it to be public we use ``.env`` file. 




To use the env file first you have to install the respected nvm package
`` npm install dotenv``
or
`` yarn add dotenv``




Then go the file where you want to use the data of .env file and write this (deploy.js in my case)

`` require("dotenv").config(); ``   // exact same code





After you have done this now you will have the access of allthe DATA of the ``.env`` file.
Now you have to use the DATA that is in the env file by this way.

`` const wallet =  new.ethers.Wallet(process.env.PRIVATE_KEY , provider)  ``
or
`` const privateKey = process.env.VARIABLE_NAME ``
or
console.log(process.env.RPC_URL) 







The problem withe this method is that you can accidently pushed your ``.env`` file into github and 
thats not we want , Or what happen if someone hacked your computer , he could directly visit to your 
.env file and there he will see the plain PRIVATE_KEY text hanging around.
One of the other method that we can use to make our .env file more secure is by ENCRYPTING it.




Encryption of the sensitive data is going to be very useful when you will start working out with real funds





To ENCRYPT your .env file or your SENSITIVE DATA 


Follow these steps:

1-- Run this command in terminal
     `` npm install fs-extra ``            // if you already installed ethers using npm then its OK

2-- Make a file name ``encrypt.js''       //you could name it whatever you want  

3-- Write a async function and a require statement in the ``encrypt.js`` like this






```

const {ethers} = require('ethers');       // ignore in case if you are not using ethers.js
const fs = require("fs-extra")            // used to read and write File   
require("dotenv").config()                //  The ``.env`` file to get access




async function main(){
const wallet = new ethers.Wallet(process.env.PRIVATE_KEY)
const encryptedJsonKey = await wallet.encrypt(
  process.env.PRIVATE_KEY_PASSWORD,                               //this will take 2 arguments private key 
  process.env.PRIVATE_KEY                                         // and the password
)



console.log(encryptedJsonKey);                            // we will be able to see the encrypted object 




//now we will write the encrypted object into the file





fs.writeFileSync("./.encyptedKey.json" , encryptedJsonKey);     
// We are saving (or pushing) the encrypted object into the file named `` .encryptedKey.json ``


//               After this by running the command in the terminal 
//                     `` node encrypt.js ``
//                   we will get a file named 
//                   `` .encryptedKey.json``






// Also DONT FORGET TO WRITE THE FILE NAME IN GITIGNORE FILE ie .encryptedKey.json



}




// After you have done this process you can DELETE the PRIVATE_KEY and PRIVATE_KEY_PASSWORD variable from `` .env `` file


main().then(()=> process.exit(0)).catch((error)=>{           //Just some stuffs to catch the errors
  console.error(error);                                      // you can ignore this if you want to  
  process.exit(1);
});


```



Now that you have done all these process just go ahead to your `` deploy.js `` file or anywhere you want to use that private key (in my case m going to the deploy.js file)

There you have to READ it and USE it (in my case i have encrypted it with a password so i have to use it with the PRIVATE_KEY_PASSWORD)





```

NOW go into your deploy.js file 



Earlier we were using 
``const wallet =  new.ethers.Wallet(process.env.PRIVATE_KEY , provider) ``



But after the Encryption we will use it like this



const encryptedJson = fs.readFileSync("./.encryptedKey.json" , "utf8");   //exactly same if you also have `` .encryptedKey.json ``file name



let wallet = new ethres.Wallet.fromEncryptedJsonSync(        // a ethers.js function 
//It takes 2 arguments 
encryptedJson , 
process.env.PRIVATE_KEY_PASSWORD

)


wallet = await wallet.connect(provider);



```




Now in terminal you will have to run the file using your password everytime---
`` PRIVATE_KEY_PASSWORD=yourpassword node deploy.js ``



*/
