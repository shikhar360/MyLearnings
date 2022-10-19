import Input from "./Input";
import React, { Component } from "react";

export default{
  title:"Input",  // If we want to group the stories === Form/Input or anyparentname/storycomponent
  component : Input
}

export const Small = ()=> <Input variant="small" />
export const Medium = ()=> <Input variant="medium" />
export const Large = ()=> <Input variant="large" />