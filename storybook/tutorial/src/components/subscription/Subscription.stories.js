import React from "react";
import { Danger } from '../button/Button.stories';
import { Large } from "../input/Input.stories";

export default{
  title : "subscription"
}

export const PrimarySubscription = () => (
  <>
   <Large/>
   <Danger/>
  </>
)