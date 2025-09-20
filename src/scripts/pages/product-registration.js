import { NavigationHandler } from "../utils/NavigationHandler.js";
import { Api } from "../utils/Api.js";
import { InputValidator } from "../utils/InputValidator.js";
import { FormValidator } from "../utils/FormValidator.js";

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
      let inputsValues = this.getInputsValues();
      let fields = {
        name: this.inputName,
        price: this.inputPrice,
        quantity: this.inputQuantity,
        description: this.inputDescription
      }

      FormValidator.validateFields(inputsValues, fields);

      if (InputValidator.isAllInputsValid(inputsValues)) {
        await Api.postProduct(inputsValues);
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

  handleCancelBtn() {
    this.cancelBtn.addEventListener("click", () => {
      NavigationHandler.goTo(this.indexPagePath)
    })
  }
}

const registerPage = new RegisterPage();
