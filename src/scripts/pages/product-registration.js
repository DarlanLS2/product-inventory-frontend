import { NavigationHandler } from "../utils/NavigationHandler.js";
import { Api } from "../utils/Api.js";

class RegisterPage {
  constructor() {
    this.cancelBtn = document.querySelector("#cancelBtn");
    this.registerBtn = document.querySelector("#registerBtn");
    this.indexPagePath = "../../index.html"

    this.handleRegisterBtn();
    this.handleCancelBtn();
  }

  /*
    * TODO: Fazer função que valide os inputs 
    * export e fazer outra função que mostre um 
    * alerta para o usuario troque o valor escrito
    */
  async handleRegisterBtn() {
    registerBtn.addEventListener("click", async () => {
      let productData = this.getInputsValues();
      await Api.postProduct(productData);
      NavigationHandler.goTo(this.indexPagePath)
    })
  }

  getInputsValues() {
     return {
       name: document.getElementById("inputNome").value,
       price: document.getElementById("inputPreco").value,
       quantity: document.getElementById("inputQuantidade").value,
       description: document.getElementById("inputDescricao").value
     }
  }

  handleCancelBtn() {
    this.cancelBtn.addEventListener("click", () => {
      NavigationHandler.goTo(this.indexPagePath)
    })
  }
}

const registerPage = new RegisterPage();
