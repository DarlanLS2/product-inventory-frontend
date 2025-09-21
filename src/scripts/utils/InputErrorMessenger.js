export class InputErrorMessenger {
  static validateInputAndShowError(inputValue, validator, errorMessageElement) {
    if (validator(inputValue)) {
      this.toggleInvalidValueMessage(false, errorMessageElement)
    } else {
      this.toggleInvalidValueMessage(true, errorMessageElement)
    }
  }

  static toggleInvalidValueMessage(show, element) {
      element.style.display = show ? "flex" : "none";
  }
}
