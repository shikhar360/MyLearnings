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
  name: string; // Key_type pair instead of key value pair
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
