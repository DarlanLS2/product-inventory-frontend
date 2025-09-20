export class InputValidator {
  static isNameValid(name) {
    let regex = /^[A-Za-zÀ-ÖØ-öø-ÿ'’\- ]+$/
    return regex.test(name);
  }

  static isPriceValid(price) {
    let regex = /^(\d{1,3}(\.\d{3})*|\d+)(,\d{2})?$/
    return regex.test(price);
  }

  static isQuantityValid(quantity) {
    let regex = /^[1-9]\d*$/
    return regex.test(quantity);
  }

  static isDescriptionValid(description) {
    let regex = /^[A-Za-zÀ-ÖØ-öø-ÿ0-9 .,;:!?'"()\-–—]{1,}$/
    return regex.test(description);
  }

  static isAllInputsValid(inputsValues) {
    return (
      this.isNameValid(inputsValues.name) &&
      this.isPriceValid(inputsValues.price) &&
      this.isQuantityValid(inputsValues.quantity) &&
      this.isDescriptionValid(inputsValues.description)
    );
  }
}
