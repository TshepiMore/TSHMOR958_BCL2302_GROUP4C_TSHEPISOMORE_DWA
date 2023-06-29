/**
 * The maximum number allowed.
 * @type {number}
 */
const MAX_NUMBER = 15

/**
 * The minimum number allowed.
 * @type {number}
 */
const MIN_NUMBER = -5

/**
 * The input element for the number.
 * @type {HTMLElement}
 */
const numberInput = document.querySelector('[data-key="number"]');

/**
 * The subtract button element.
 * @type {HTMLElement}
 */
const subtractButton = document.querySelector('[data-key="subtract"]');

/**
 * The add button element.
 * @type {HTMLElement}
 */
const addButton = document.querySelector('[data-key="add"]');

const resetButton = document.querySelector('[data-key="reset"]');

/**
 * Handles the subtraction operation and updates the state of relevant elements.
 * @type {number} 
 */

const subtractHandler = () => {
    const newVaulue  = parseInt (numberInput.value) - 1;
    numberInput.value = newVaulue;

    if (addButton.disabled === true) {
        addButton.disabled = false
    }

    if (newVaulue <= MIN_NUMBER) {
    subtractButton.disabled = true;
    }
}

/**
 * Handles the addition operation and updates the state of relevant elements.
 * @type {number}
 */

const addtHandler = () => {
    const newValue  = parseInt (number.value) + 1;
    numberInput.value = newValue;


    if (subtractButton.disabled === true) {
        subtractButton.disabled = false
    }

    if (newValue >= MAX_NUMBER) {
    addButton.disabled = true
    }
}
const resetHandler = () => {
    numberInput.value = 0;
    addButton.disabled = false;
    addButton.disabled = false;
    showMessage("The counter has been reset.");
};

const showMessage = (message) => {
    alert(message);
    message.disabled = false
  };

subtractButton.addEventListener('click', subtractHandler)

addButton.addEventListener('click', addtHandler)

resetButton.addEventListener('click', resetHandler);