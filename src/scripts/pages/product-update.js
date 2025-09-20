import { Api } from "../utils/Api.js";
import { NavigationHandler } from "../utils/NavigationHandler.js";
import { InputValidator } from "../utils/InputValidator.js";

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

  // TODO: Refatorar esta função
  async initUpdateForm(id) {
    let product = await Api.getProductByIdJson(id);

    this.renderInputsFields(this.formElement, product);
    this.renderFormButtons(this.formElement);
    this.bindInputsFields();
    this.handleBtnCancel();
    this.handleBtnUpdate();
  }

  renderInputsFields(element, product) {
    this.renderInputNameField(element, product.nome)
    this.renderPriceAndQuantityFields(element, product)
    this.renderDescriptionField(element, product.descricao)
  }

  renderInputNameField(element, name) {
    element.innerHTML += `
      <section class="nome">
      <section class="inputLargo">
      <label for="inputNome">Name:</label>
      <input type="text" id="inputNome" value="${name}"required/>
      <span class="inputSpan inputSpan-name">Please enter a valid value.</span>
      </section>
      </section>
    `
  }
  
  renderPriceAndQuantityFields(element, product) {
    element.innerHTML += `
      <section class="precoQuantidade">
      <section class="inputPequeno">
      <label for="inputPreco">Price:</label>
      <input type="number" id="inputPreco" value="${product.preco}"required/>
      <span class="inputSpan inputSpan-price">Please enter a valid value.</span>
      </section>
      <section class="inputPequeno">
      <label for="inputQuantidade">Quantity:</label>
      <input type="number" id="inputQuantidade" value="${product.quantidade}"required/>
      <span class="inputSpan inputSpan-quantity">Please enter a valid value.</span>
      </section>
      </section>
    `
  }


  renderDescriptionField(element, description) {
    element.innerHTML += `
      <section class="descricao">
      <label for="inputDescricao">Description:</label>
      <textarea id="inputDescricao" required>${description}</textarea>
      <span class="inputSpan inputSpan-description">Please enter a valid value.</span>
      </section>
    `
  }

  renderFormButtons(element) {
    element.innerHTML += `
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

  handleBtnCancel() {
    let cancelBtn = document.querySelector("#cancelBtn");

    cancelBtn.addEventListener("click", () => {
      NavigationHandler.goTo(this.indexPagePath)
    })
  }

  async handleBtnUpdate() {
    let updateBtn = document.querySelector("#updateBtn");

    updateBtn.addEventListener("click", async () => {
      let newProductData = this.getInputsValues();

      this.handleInputsValidator(newProductData);
      if (this.isAllInputsValid(newProductData)) {
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

  async updateProduct(newProductData) {
    let id = this.selectedProductData.id;

    await Api.upadateProduct(id, newProductData);
  };
}

const updatePage = new UpdatePage();
