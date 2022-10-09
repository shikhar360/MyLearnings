const GRAPHQL_URL = "http://localhost:9000/";

async function fetchGreetings() {
  const response = await fetch(GRAPHQL_URL, {
    method: "POST", // this should be a string
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify({
      query: `
      query{
        greeting
      }`,
    }),
  });

  // const data = await response.json();  // this is returning a obj with data key

  const { data } = await response.json();
  return data;
}

fetchGreetings().then((/*data*/ { greeting }) => {
  //destructuring
  const title = document.querySelector("h1");
  title.textContent = greeting;
});
