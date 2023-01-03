import { render ,  screen} from "@testing-library/react";
import Greet from ".";

test("should render the greet component" , ()=>{
  render(<Greet/>)
  const textElement = screen.getByText(/aur bhai kya hal chal/i)
  expect( textElement).toBeInTheDocument();
})