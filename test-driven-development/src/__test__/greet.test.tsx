import { render ,  screen} from "@testing-library/react";
import Greet from "../components/greet";



// test("should render the greet component" , ()=>{
//   render(<Greet/>)
//   const textElement = screen.getByText(/hello world/i)
//   expect( textElement).toBeInTheDocument();
// })

// test("hellow world with name", ()=>{
//   render( <Greet name={"Shikhar"}/>)
//   const textElement = screen.getByText(/hello world shikhar/i)
//   expect(textElement).toBeInTheDocument();
// })

//-- Filtering test
/*
During the watch mode you can press w and choose the option "p" or "t" (Already explained what it does)

//- Or you can do insert .only or .skip to the test like

test.only("hellow world with name", ()=>{     //This will only run this test
  render( <Greet name={"Shikhar"}/>)
  const textElement = screen.getByText(/hello world shikhar/i)
  expect(textElement).toBeInTheDocument();
})
*/

//-- We can use describe to group the tests (we can also use .only and .skip if we want)

describe("Greet" , ()=>{
  
  test(" render the greet component" , ()=>{
    render(<Greet/>)
    const textElement = screen.getByText(/hello world/i)
    expect( textElement).toBeInTheDocument();
  })
  
  
})

test("hello world with name", ()=>{
  render( <Greet name={"Shikhar"}/>)
  const textElement = screen.getByText(/hello world shikhar/i)
  expect(textElement).toBeInTheDocument();
})



/*
-- FIle Name Conventions
.test.tsx  or .test.js

.spec.tsx  or  .spec.js

__test__   //folder
.js or .tsx in this folder



-- Code Coverage
Metric to understand how much of the code is tested
Statement Coverage
Branch Coverage
Function Coverage 
Line Coverage


In package.json file under "scripts" object
we have to add ::: see README.md


For adding a certain limit for coveragage to pass:

```
"jest":{
  "coverageThreshold" : {
    "global":{
      "branches": 80,
      "functions":80,
      "lines": 80,
      "statements": -10
    }
    }
  }
```
Jest assertions can be found in jestjs.io/docs/using-matchers
https://github.com/testing-library/jest-dom     //already installed
*/

// .getByRole + options
// Roles are the different role that a element have predefault 
// https://www.w3.org/TR/html-aria/#docconformance    visit here to know more

// fit for .only   xit .skip
// it("hello world with name", ()=>{
//   render( <Greet name={"Shikhar"}/>)
//   const textElement = screen.getByRole( /*desired role*/ , {
//     name : "text that is present in the role"                    //casesensitive
//   })
//   expect(textElement).toBeInTheDocument();
// })


//-- QueryBy 
// when the node is present and we dont want to sho it or it is conditionally rendered  we ue queryBy

//-- FindBy
// when the element is fetched by an API and takes some time to show in the docuument then we use FindBy default time for wait until the contet loads is 1sec but can be modified by passin a second argument as a object 


// These all can be (written accouding to priority list)

// ByRole        //getByRole   // queryByRole // findByRole
// ByLabelText
// ByPlaceholderText
// ByText
// ByDisplayValue
// ByAltText
// ByTitle
// ByTestId


// React Custom hooks :
