### What is a Microservice??
A monolithic server is an application architecture where all components of the application are tightly integrated into a single executable or process running on a single server. While this architecture is simple and easy to develop and deploy, it can become limiting as applications grow in size and complexity. Changes to one module may require redeployment of the entire application, and scaling the application can be difficult. As a result, alternative architectures such as microservices or serverless have become popular to address these limitations.
 
 A Microservise contain routing , middleware , business logic and Database access to implement **one feature** of the app. 

We store data in a dfferent way in Microservice

**Each service get its own database(if it neds one)**

#### Why so ??
- want to run services independently
- Database schema might change unexpectedly
- Some servises might be efficient in other DB like sql/nosql
