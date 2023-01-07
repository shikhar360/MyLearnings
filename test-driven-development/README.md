## Why test is needed ???
To ensure that the software is working as expected 

**Manual testing**

Individual will interact with the website interacts with it and ensures that everything work as expected.

If a new feature is released the same steps will be repeated again 

**Drawbacks**
- Time consuming
- Complex repetitive task having risk of human errors
- May not get a chance to test all the features.


**Automated Testing**
Programs that automates the task of testing your softwares
Write odes to test the softwares.

**Advantages**
- Less time consuming
- Reliable not prone to have errors
- Easy to identify and run the breaking tests 
- Gives confidence while shiping the software

## Jest
 Jest is a javascript testing framework
 It is a testrunner , find the test , runs the test , deterine wether the test passes or failed and report it back in a human readable manner .

## React Testing Library
Javascript testing utility , provides a virtual DOM for testing reat components .
Core library is DOM testing library and react testing library is just a wrapper around it.

### Types of test

1. Unit test
It focus on testing small building blocks of a application such as class component or function or a component. Each unit of building block in tested in isolation , dependencies are mocked .
It runs in very short amount of time and make it very easy to pinpoint failures.
Easy to write and maintain.

2. Integration test

3. End to end test (frontend to backend)

#### Testing

The test() accepts three arguments :
name : string
function : fn
timeout : default timeout is 5 seconds ( how long to wait before aborting the test)

The function (test()) and expect() is provided globally by the JEST library 

## Test Driven Development

Development proces where you write test before writing software codes

After that you write the codes to ensure the test passes

1. Create the test that verify the functonality of a specific feature
2. Write the spftware codes that runs successfully when reexecuting the code .
3. Refactor the code for the optimization

Coverage Statement

 "npm run test" or "yarn test" below
 
```json
"coverage" : "npm run test --coverage --watchAll --collectiveCoverageFrom='src/components/**/*.{ts,tsx}' --collectCoverageFrom='!src/components/**/*.{types,constants,stories,spec,test}.{ts,tsx}' "
```