import { Api } from "../utils/Api.js";
import { NavigationHandler } from "../utils/NavigationHandler.js";
import { InputValidator } from "../utils/InputValidator.js";
import { FormValidator } from "../utils/FormValidator.js";

class UpdatePage {
  constructor() {
    this.indexPagePath = "../../index.html"
    this.formElement = document.querySelector("#form");
    this.selectedProductData = JSON.parse(sessionStorage.getItem("data"));
    this.inputName;
    this.inputPrice;
    this.inputQuantity;
    this.inputDescription;

    this.initUpdateForm(this.selectedProductData.id)
  }

  async initUpdateForm(id) {
    let product = await Api.getProductByIdJson(id);

    this.renderForm(this.formElement, product);
    this.bindInputsFields();
    this.handleBtnUpdate();
    this.handleBtnCancel();
  }

  renderForm(formElement, product) {
    let htmlString = 
      this.getInputNameHtml(product.name) + 
      this.getPriceAndQuantityInputsHtml(product) +
      this.getInputDescriptionHtml(product.description) +
      this.getButtonsHtml();

    formElement.innerHTML = htmlString;
  }

  getInputNameHtml(name) {
    return `
      <section class="nome">
      <section class="inputLargo">
      <label for="inputNome">Name:</label>
      <input type="text" id="inputNome" value="${name}"required/>
      <span class="inputSpan inputSpan-name">Please enter a valid value.</span>
      </section>
      </section>
    `
  }
  
  getPriceAndQuantityInputsHtml(product) {
    return `
      <section class="precoQuantidade">
      <section class="inputPequeno">
      <label for="inputPreco">Price:</label>
      <input type="number" id="inputPreco" value="${product.price}"required/>
      <span class="inputSpan inputSpan-price">Please enter a valid value.</span>
      </section>
      <section class="inputPequeno">
      <label for="inputQuantidade">Quantity:</label>
      <input type="number" id="inputQuantidade" value="${product.quantity}"required/>
      <span class="inputSpan inputSpan-quantity">Please enter a valid value.</span>
      </section>
      </section>
    `
  }

  getInputDescriptionHtml(description) {
      return `
      <section class="descricao">
      <label for="inputDescricao">Description:</label>
      <textarea id="inputDescricao" required>${description}</textarea>
      <span class="inputSpan inputSpan-description">Please enter a valid value.</span>
      </section>
    `
  }

  getButtonsHtml() {
    return `
      <section class="botoes">
      <button id="cancelBtn" type="button" class="buttonVoltar">Cancel</button>
      <button id="updateBtn" type="button" class="buttonUpdate">Confirm</button>
      </section>
    `
  }

  bindInputsFields() {
    this.inputName = document.getElementById("inputNome");
    this.inputPrice = document.getElementById("inputPreco");
    this.inputQuantity = document.getElementById("inputQuantidade");
    this.inputDescription = document.getElementById("inputDescricao");
  }

  async handleBtnUpdate() {
    let updateBtn = document.querySelector("#updateBtn");

    updateBtn.addEventListener("click", async () => {
      let newProductData = this.getInputsValues();
      let fields = {
        name: this.inputName,
        price: this.inputPrice,
        quantity: this.inputQuantity,
        description: this.inputDescription
      }

      FormValidator.validateFields(newProductData, fields);

      if (InputValidator.isAllInputsValid(newProductData)) {
        await this.updateProduct(newProductData);
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

  async updateProduct(newProductData) {
    let id = this.selectedProductData.id;

    await Api.updateProduct(id, newProductData);
  };

  handleBtnCancel() {
    let cancelBtn = document.querySelector("#cancelBtn");

    cancelBtn.addEventListener("click", () => {
      NavigationHandler.goTo(this.indexPagePath)
    })
  }
}

const updatePage = new UpdatePage();
