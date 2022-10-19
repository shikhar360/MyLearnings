import { addDecorator } from "@storybook/react";
import React from "react";
import Center from "../src/components/center/Center";
//Add the necesary imports all above
//addDecorator(story => <Center>{story()}</Center>) //restart the server after editing .storybook folder

import { ChakraProvider, theme, CSSReset, Box } from "@chakra-ui/react";

addDecorator((story) => (
  <ChakraProvider theme={theme}>
    {/* <CSSReset /> */}
    <Box m={4}>{story()}</Box>
  </ChakraProvider>
));

// Added theme

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
};
