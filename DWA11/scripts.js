// The max and min number allowed for the range.
const MAX_NUMBER = 15;
const MIN_NUMBER = -5;
const STEP_AMOUNT = 1;// The amount by which the number should increase or decrease.


// ActionTypes is an object that defines action types for a counter feature.

const ActionTypes = {
  INCREMENT: "INCREMENT",// Represents the action type for incrementing the counter.
  DECREMENT: "DECREMENT",// Represents the action type for decrementing the counter.
  RESET: "RESET", // Represents the action type for resetting the counter.
};


// This function creates an action object to increment, decrement and reset the counter.
function incrementCounter() {
  return { type: ActionTypes.INCREMENT };
}
function decrementCounter() {
    return { type: ActionTypes.DECREMENT };
  }
  
  function resetCounter() {
    return { type: ActionTypes.RESET };
  }
  
  // This function is a reducer that handles actions related to the counter.
  
  function counterReducer(state = 0, action) {
    switch (action.type) {
      case ActionTypes.INCREMENT:
        return state + STEP_AMOUNT;
      case ActionTypes.DECREMENT:
        return state - STEP_AMOUNT;
      case ActionTypes.RESET:
        return 0;
      default:
        return state;
    }
  }
  // Create a Redux store using the counterReducer
const store = Redux.createStore(counterReducer);
let currentValue = store.getState();// Variable to hold the current value of the state

// Function to update the user interface based on the current state
function updateUI() {
currentValue = store.getState();  // Update the current value with the state from the Redux store
number.value = currentValue.toString();// Update the value displayed in the UI input element

  // Disable or enable the subtract and add buttons based on the current value
  if (currentValue <= MIN_NUMBER) {
    subtract.disabled = true;
  } else if (currentValue >= MAX_NUMBER) {
    add.disabled = true;
  } else {
    subtract.disabled = false;
    add.disabled = false;
  }
    console.log(currentValue);
}


// Subscribe to state changes in the Redux store and update the UI
store.subscribe(updateUI);
// Get the DOM elements for the number input, subtract button, and add button
const number = document.querySelector('[data-key="number"]');
const subtract = document.querySelector('[data-key="subtract"]');
const add = document.querySelector('[data-key="add"]');

// Add an event listener to the subtract and add button
subtract.addEventListener("click", () => {
  store.dispatch(decrementCounter());// Dispatch an action to decrement the counter
});
add.addEventListener("click", () => {
  store.dispatch(incrementCounter());// Dispatch an action to increment the counter
});

const resetButton = document.querySelector("sl-button");// Get the DOM element for the reset button
resetButton.addEventListener("click", () => {
store.dispatch(resetCounter());
alert("The counter has been reset.");
});

// Update the UI with the initial state
updateUI();
