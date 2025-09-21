import { InputValidator } from "./InputValidator.js";
import { InputErrorMessenger } from "./InputErrorMessenger.js";

export class FormValidator {
  static validateFields(inputsValues, fieldRefs) {
    let fields = {
      name: {
        value: inputsValues.name,
        validator: InputValidator.isNameValid,
        errorElement: fieldRefs.name.nextElementSibling
      },
      price: {
        value: inputsValues.price,
        validator: InputValidator.isPriceValid,
        errorElement: fieldRefs.price.nextElementSibling
      },
      quantity: {
        value: inputsValues.quantity,
        validator: InputValidator.isQuantityValid,
        errorElement: fieldRefs.quantity.nextElementSibling
      },
      description: {
        value: inputsValues.description,
        validator: InputValidator.isDescriptionValid,
        errorElement: fieldRefs.description.nextElementSibling
      }
    };

    for (const key in fields) {
      let field = fields[key];

      InputErrorMessenger.validateInputAndShowError(field.value, field.validator, field.errorElement)
    }
  }
}
