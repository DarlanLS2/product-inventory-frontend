import { NavigationHandler } from "../utils/NavigationHandler.js";
import { Api } from "../utils/Api.js";
import { InputValidator } from "../utils/InputValidator.js";

class RegisterPage {
  constructor() {
    this.registerBtn = document.querySelector("#registerBtn");
    this.cancelBtn = document.querySelector("#cancelBtn");
    this.indexPagePath = "../../index.html";

    this.inputName = document.getElementById("inputNome");
    this.inputPrice = document.getElementById("inputPreco");
    this.inputQuantity = document.getElementById("inputQuantidade");
    this.inputDescription = document.getElementById("inputDescricao");

    this.handleRegisterBtn();
    this.handleCancelBtn();
  }

  async handleRegisterBtn() {
    registerBtn.addEventListener("click", async () => {
      let productData = this.getInputsValues();

      this.handleInputsValidator(productData);

      if (this.isAllInputsValid(productData)) {
        await Api.postProduct(productData);
        NavigationHandler.goTo(this.indexPagePath)
      }
    })
  }

  getInputsValues() {
     return {
       name: this.inputName.value,
       price: this.inputPrice.value,
       quantity: this.inputQuantity.value,
       description: this.inputDescription.value
     }
  }

  handleInputsValidator(productData) {
    this.validNameInput(productData.name);
    this.validPriceInput(productData.price);
    this.validQuantityInput(productData.quantity);
    this.validDescriptionInput(productData.description);
  }

  // TODO: Modularizar esta função
  validNameInput(name) {
    if (InputValidator.isNameValid(name)) {
      this.hideInvalidValueMessage(this.inputName.nextElementSibling)
    } else {
      this.showInvalidValueMessage(this.inputName.nextElementSibling)
    }
  }

  // TODO: Modularizar esta função
  validPriceInput(price) {
    if (InputValidator.isPriceValid(price)) {
      this.hideInvalidValueMessage(this.inputPrice.nextElementSibling)
    } else {
      this.showInvalidValueMessage(this.inputPrice.nextElementSibling)
    }
  }

  // TODO: Modularizar esta função
  validQuantityInput(quantity) {
    if (InputValidator.isQuantityValid(quantity)) {
      this.hideInvalidValueMessage(this.inputQuantity.nextElementSibling)
    } else {
      this.showInvalidValueMessage(this.inputQuantity.nextElementSibling)
    }
  }

  // TODO: Modularizar esta função
  validDescriptionInput(description) {
    if (InputValidator.isDescriptionValid(description)) {
      this.hideInvalidValueMessage(this.inputDescription.nextElementSibling)
    } else {
      this.showInvalidValueMessage(this.inputDescription.nextElementSibling)
    }
  }

  // TODO: Modularizar esta função
  showInvalidValueMessage(span) {
      span.style.display = "flex";
  }

  // TODO: Modularizar esta função
  hideInvalidValueMessage(span) {
      span.style.display = "none";
  }

  // TODO: Modularizar esta função
  isAllInputsValid(productData) {
    return (
      InputValidator.isNameValid(productData.name) &&
      InputValidator.isPriceValid(productData.price) &&
      InputValidator.isQuantityValid(productData.quantity) &&
      InputValidator.isDescriptionValid(productData.description)
    );
  }

  handleCancelBtn() {
    this.cancelBtn.addEventListener("click", () => {
      NavigationHandler.goTo(this.indexPagePath)
    })
  }
}

const registerPage = new RegisterPage();
