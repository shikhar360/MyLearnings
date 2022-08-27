# TypeScript Learnings

This folder will be dedicated to the Typescript learnings
<br/>
Javascript that can be scalable is TypeScript
<br/>

TypeScripts's Type system helps you during the developement (i.e before the codes get compile.)
Browsers dont have TS type support.

To compile the TS file

run `tsc app.ts` in the terminal.
If we dont wanna run this command frequently we can run a `tsc --init` this will create a tscconfig.json file
and after that we can compile using `tsc` command only.

If we also dint want to run the tsc command after the tsc --init command ..
We can also use ` tsc -w or tsc --watch` command and it will auto compile the file.

`"noEmitOnError": true ,` in the tsconfig.json file will stopcreating files during the compiling if there is
any error in the TS

## Tips

#### Basics

```typescript
function (num: number , str: string , bool: boolean){  //this is how we define number sttring and Boolean
  console.log(num , str , bool);
}


let anyNumber: number = 1 ;  // this is not a good practise

let anyNumber: number;  // this is recommended
anyNumber = 1;

// ALSO

// const is in nature not re-assignable so

const newNum = 9 ; // here newNum is a type of number that is 9

```

#### Objects

```typescript
const owner: {
  name: string; // Key_type pair instead of key_value pair
  age: number; // We can do this but its recommended not to do this
} = {
  name: "Shikhar",
  age: 23,
};

// Let TS do the inference on its own ONLY do inference when the TS is not infering as you want it to be

const owner = {
  name: "Shikhar",
  age: 23,
};
```

#### Arrays

```typescript
const owner = {
  name: "Shikhar",
  age: 23,
  hobbies: ["playing", "biking", "kiting"], //Ts inference will automatically knows its a string[]
};

let activities: string[];
activities = ["abc", "def", "ghi"]; //we can include no number/object/bool in this

// we can also have arrays of object
/*


*/
```

#### Tuples

Arrays with a fixed length and having exact types can be called as tuples

```typescript
const owner: {
  name: string;
  age: number;
  roles: [number, string]; // called tuples (array with fixed length and type orderwise)
} = {
  name: "Shikhar",
  age: 23,
  roles: [69, "vns"],
};

// Only exception in this is that owner.roles.push("newplace") will work (.push method will work)
```

#### Enums

To create human readable identifiers we use enums
The convention of using enum values all-uppercase but it is not a "mustdo"

```typescript

enums Role {  //naming start with capital letter
  ADMIN ,
  ATTENDEE,     //here value of ADMIN is 0 , ATTENDEE is 1 and soo on
  AUTHOR
}

// enums Role {  //we can also give enums our own value that we like
//   ADMIN = 2,
//   ATTENDEE,    //Here ADMIN = 2 therefore ATTENDEE = 3 , AUTHOR = 4
//   AUTHOR
// }

// enums Role {  //or we can give all enums its own value
//   ADMIN  = 0,
//   ATTENDEE = "abcd",
//   AUTHOR = true
// }

const owner = {
  name: "Shikhar",
  age: 23,
  role : Role.ADMIN
};

console.log(owner.role) // this will be 0

```

#### ANY

Try to avoid using this . Any takes away all the TS features that it provides.

#### Union Types

Suppose when we want to work with more than 1 type in the function or anywhere else we will use
union type

```typescript
function combine(val: string | number, val2: string | number) {
  // suppose here we want to work with strings and numbers too
  let result;
  if (typeof val === "number" && typeof val2 === "number") {
    return (result = val + val2);
  } else {
    return (result = val.toString() + val2.toString());
  }

  return result;
}
```

#### Type Alias

To create a custom type of our own we use the type alias

```typescript

type NumStr = string | number ; // here we have create a own custom type alias

type OwProp = {            // a custom type
  name: string;
  age: number;
  roles: [number, string];
}

const owner : OwProp = {
  name : "abcd"
  age : 23,
  role : [123 , "xyz"]
}

function combine(val: NumStr , val2: NumStr) {

  let result;
  if (typeof val === "number" && typeof val2 === "number") {
    return (result = val + val2);
  } else {
    return (result = val.toString() + val2.toString());
  }

  return result;
}

```

#### Return Function Types

There are two categories of types that can bve returned by the function . The core typeslike
Number , String , Boolean and other is `:void or :never ` type .

Ts automatically infers the suggested type after writing the function but we can also
explictly ask the function that what it shoud return

A function with `:never` will never return anything .

#### Function as a Type

We can also assign variable a function type

```typescript
function add(a: number, b: number): number {
  return a + b;
}

// There will be cases when we want a variable to be assign a function

//let combine ; //here combine is :any which is useless
// we want combine to work as add function , we can do that like this

let combine: (x: number, y: number) => number;
// Combine should be any function which takes 2 parameter (that should be number) and
// should return a number

combine = add;

console.log(combine(7, 8));

// we can also use the same pattern {  callbackFunction: (x: number) => void   } to pass
// a function as a callbackFunction (Function that are passed as a arguments)
```

There is also a `: unknown` type . It is bit more restrictive than tha :any type.
We have to do the typechecking in a `if(typeof val === "string"){ //dosomething} ` to proceede
with this

#### Interface

Interface are like types the key difference between both of them is the familiarity (extends) and
declaration merging with OOP of interface is more .

Interfaces can only define objects i.e we CANT use union types in interfces.

In Interfaces we can extend the properties by implementing it in a another class

```typescript

interface Greetable {
  name: string;
  greet(n: string): void;
}

// interface Greetable {
         //we can also have a readonly feature if we want a property not to change in future
//   readonly name: string;
//   greet(n: string): void;
// }

class Person implements Greetable {
  // this class should have the the properties of name and greet and it can also have other props of its own
  name : string ,
  age  = 30;     //other speccial props of Person class

  greet (phrase : string){
    console.log("Hi my name is" + this.name)
  }

  //name and greet are compulsary because they are inherited
}


// INTERFACES CAN ALSO BE EXTENDS

interface Named {
 readonly name: string;

}

interface Greetable2 extends Named {
  greet(n: string): void;
}

// Interface can also be used as a funcction

interface Add {
  (a: number , b: number) : number
}

// in types we usually do like a arrow

type addFunc = (a: number , b: number) => number;


```

When we want object to share exact features of it in other classes then we use interfaces .

When you have a preference of choosing the structure of
<b> Union , Primitives , Shorthand Functions , Advanced Type Functions </b> use `Type` instead of
`interface`

## Advance TS Features

#### Intersection types

```typescript
// When we have two object types that are intersecting its features like this

type Person = {
  address: string;
  name: string;
};

type Employee = {
  name: string;
  job: string[];
};

type ElevatedEmployee = Person & Employee;
// then ElevatedEmployee will have combined feature (properties) of person and employee because {};

//BUT

type Combined = string | number;
type OtherCombine = number | boolean;

type Universal = Combined & OtherCombined; // this will have intersecting feature of number
// Because the number is the type that is common in Combined and OtherCombined
```

#### Type Gaurd

TypeGaurd is just use to check where we are getting our desired type or not

```typescript
//1

if (typeof val === "string") {
  // could be string or number or boolean
}

//2

if ("ObjectPropName" in aObject) {
  // do something if the objectPropName property is present in the "aObject"
}

//3

if (parameterIs instanceof aClassObj) {
  //proceede with the code
}

// We can TypeCast a element using a `as` syntax

ex: (document.querySelector("p") as HTMLInputElement).value = "Hello Bhai";
```

#### Generic Types

When the value is unknown and you are expecting a particular type to take out of the info recieved
then you can use generic types

Mainly used on Arrays and Promise

```typescript
const result: Array<string> = [];
const result2: Array<string | number> = [];

const somePromise: Promise<string> = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve("I am a String");
    // if the resolve here will be number or boolean then we will get err while using .then method
  }, 2000);
});

somePromise.then((data) => {
  data.split(" "); // this will give err if resolve is not the desired type
});
```
