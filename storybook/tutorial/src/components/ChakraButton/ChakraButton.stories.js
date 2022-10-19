import React from "react";
import {Button} from "@chakra-ui/react"

export default{
  title : "ChakraButton",
  component : Button
}

export const Success = ()=> <Button colorScheme={"green"}>Success</Button>
export const Danger = ()=> <Button colorScheme={"red"}>Danger</Button>