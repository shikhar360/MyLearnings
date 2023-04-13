### What is a Microservice??
A monolithic server is an application architecture where all components of the application are tightly integrated into a single executable or process running on a single server. While this architecture is simple and easy to develop and deploy, it can become limiting as applications grow in size and complexity. Changes to one module may require redeployment of the entire application, and scaling the application can be difficult. As a result, alternative architectures such as microservices or serverless have become popular to address these limitations.
 
 A Microservise contain routing , middleware , business logic and Database access to implement **one feature** of the app. 

We store data in a dfferent way in Microservice

**Each service get its own database(if it neds one)**

#### Why so ??
- want to run services independently
- Database schema might change unexpectedly
- Some servises might be efficient in other DB like sql/nosql

#### Some problems....
Suppose each services has their own DB and admin wants o add a new feature than how we can do that because accessing the data pesent in the other DB directly (what use to happen in monolithic ) is not recommended and allowed.

There are 2 ways to do that 
- Sync 

  Services communicate using Direct request
  - Easy to understand
  - Might not need a DB if it's just reading
  - Introduces Dependency
  - If one sevice fails all services might fail
  - Might be slow to send req
  - Creates webs of request

- Async
  
  Services communicate each other using events (events are like small nodes that tells that something is going to happen in the app), Usually in Async model of communicating there has to be set up a resilient event bus which takes care of all the events.

  (probably not the best way to get the data if not used correctly)

  To use this eficiently we have to set the even on each DB (like event on the creation of new user ) AND ( when the existing user purchase the product then emmit the event of userID along the the productID)

  **Pros and Cons**
  - They are not dependend
  - This will be fast
  - Data duplication , paying extra for DBs
  - Harder to understand

(...not related to js world)

