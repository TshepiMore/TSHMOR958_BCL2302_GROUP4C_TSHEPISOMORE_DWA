const form = document.querySelector("[data-form]");
const result = document.querySelector("[data-result]");

form.addEventListener("submit", (event) => {
    event.preventDefault();
    const entries = new FormData(event.target);
    const { dividend, divider } = Object.fromEntries(entries);

 // Checking if either dividend or divider is empty,displaying an error message if either value is missing.
    if (dividend === "" || divider === "") {
        result.innerText = "Division not performed. Both values are required in inputs. Try again";
  }

  // Checking if divider is less than 0, if so display error message and console error.
    else if (divider < 0) {
        result.innerText = "Division not performed. Invalid number provided. Try again";
        console.error("Invalid division:");
  }

   // Checking if either dividend or divider is not a number, if so display error message and console error.
     else if ( isNaN(dividend) || isNaN(divider)){
        document.body.innerHTML = "Something critical went wrong. Please reload the page";
        console.error("Critical error occured.");
  }

  // Performing the division and rounding down to the nearest whole number.
    else {
        const divisionResult = Math.floor(dividend / divider);
        result.innerText = divisionResult;
  }
});

// const form = document.querySelector("[data-form]");
// const result = document.querySelector("[data-result]");

// form.addEventListener("submit", (event) => {
//   event.preventDefault();
//   try {
//     const entries = new FormData(event.target);
//     const { dividend, divider } = Object.fromEntries(entries);

//     if (!dividend || !divider) {
//       throw new Error("Division not performed. Both values are required in inputs. Try again");
//     }
//     if (divider < 0) {
//       throw new Error("Division not performed. Invalid number provided. Try again");
//     }
//     if (isNaN(dividend) || isNaN(divider)) {
//       document.body.innerHTML = "invalid number";
//     }

//     const divisionResult = Math.floor(dividend / divider);
//     result.innerText = divisionResult;
//   } catch (error) {
//     result.innerText = error.message;
//     console.error(error);
//   }
// });
