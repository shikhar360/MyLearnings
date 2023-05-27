What is Denormalising ?
- Including all the related data into a single document . Allow us to quickly access the data but not the best solution  

What is normalizing ?
- Instead storing all the related data into a single file we create a separate file for similar related data and we give the reference point (like an id ) in other documents

How to create a local database ?
Follow these steps to create a local database 
Installation::
- Download the files from the mongodb website (it will be tgz file)
- Then in terminal write 'sudo cp drag all the unix executable file that is located in the bin folder of the downloads to the terminal' and before pressing enter add "/usr/local/bin" also change the directory into that

Creating the actual folder where the database will store the file
Now we are in the bin folder we will create a folder
Run the following command 
`sudo mkdir /data/db `

Now for us to be able to write in the database we need to run the following command
"sudo chown -R `id -un` /data/db"

Now running the command `mongod` will run on the port 27017
and after running the command `mongo` we will start mongo db

To check if its running or not 
we have to write db in the terminal and it will return test in the terminal

Now to create a new database in the local we have to run the following command

use --nameofthedatabase--
(it will create a new database)

To create a new collection in the database we run
`db.--nameofcollection--.insertOne({ name : "something name" , price :232})`
here db stands for the current database and insertOne will insert something into the database
We can also insert more than one data into the collections by
`db.--NOC--.insertMany([{} , {}])`



To find or get all the data we run
"db.--NOC--.find()"
this will return all the data in the database

We can also see the collection by running
"show collections"
similarly
"show dbs"
to know all the dbs

After we are done we can also quit by 
"quit()"

#### How to query the data from the database

As we know we use 
`db.--noc--.find()`to get all the data
similarly
`db.--noc--.find({name : "the relevant name"})`
to get the data with a specific name
`db.--noc--.find({otherProperty : "value of the property"})`
to get the data of otherproperty
`db.--noc--.find({price : {$lte : 300}})`// "$lt" "$gt" "$gte"
to get the price with the value less than or equal to 300

similarly there is a or condition as well in which we want one of the condition to be true , it accepts the array of objects
`db.--noc--.find({$or : [ {price : {$gte : 500}} , {rating : {$lt : 4.5}}   ]})`

and if we only want the name of the or result
`db.--noc--.find({$or : [ {price : {$gte : 500}} , {rating : {$lt : 4.5}}   ]} , {name : 1})`

#### How to update the db

`db.--noc--.updateMany({price : {$gte : 500}} , {rating : {$lt : 4.5}}} , {$set : {premium : true}})`
- finding the one data using the condition and updating that using the $set operator

`db.--noc--.updateOne( {price : {$gte : 500}} , {$set : {price : 600}}  )`
- finding one and updating one

We can also set something in a particular data even if it doesn't exist at first

There is also something called "replaceOne" (search on google)

#### How to delete from the db
`db.--noc--.deleteMany({price : {$gte : 500}})`
- Will delete many datas passing the conditions

