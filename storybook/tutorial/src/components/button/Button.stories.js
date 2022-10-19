import React, { Component } from "react";
import Button from "./Button";
import Center from "../center/Center";

export default{
  title : "Button",
  component : Button,
  // decorators: [story => <Center>{story()}</Center>]   we can do this if we want to decorate specific components
}

//See 

export const Primary = ()=> /*<Center> */ <Button variant="primary">Primary</Button>/*</Center> */  //we can do this with <Center>
export const Secondary = ()=> <Button variant="secondary">secondary</Button>
export const Success = ()=> <Button variant="success">success</Button>
export const Danger = ()=> <Button variant="danger">danger</Button>
export const Danger2 = ()=> <Button variant="danger2">danger</Button>

//we use args pattern to avoid using long codes 

const Template = args => <Button {...args} />

export const PrimaryA = Template.bind({})
PrimaryA.args = {
  variant : "danger2",
  children : "primaryA"
}

export const LongPrimaryA = Template.bind({})
LongPrimaryA.args={
  ...PrimaryA.args,
  children :"LONG PRIMARY A "
}

// Decorators
/*
css props that used to decorrate the component is called decorators.
we can set it globally also or can be specipfic to a component as well
ce
*/