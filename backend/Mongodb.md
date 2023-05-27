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


