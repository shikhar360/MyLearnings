import { render ,  screen} from "@testing-library/react";
import Greet from ".";

test("should render the greet component" , ()=>{
  render(<Greet/>)
  const textElement = screen.getByText(/hello world/i)
  expect( textElement).toBeInTheDocument();
})