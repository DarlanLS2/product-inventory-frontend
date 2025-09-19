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

    this.showUpdateForm(this.selectedProductData.id)
  }

  async showUpdateForm(id) {
    let product = await Api.getProductByIdJson(id);
    this.formElement.innerHTML += `
      <section class="nome">
      <section class="inputLargo">
      <label for="inputNome">Name:</label>
      <input type="text" id="inputNome" value="${product.nome}"required/>
      <span class="inputSpan inputSpan-name">Please enter a valid value.</span>
      </section>
      </section>
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
      <!-- Please enter a valid email address -->
      <!-- This field is required -->
      </section>
      <section class="descricao">
      <label for="inputDescricao">Description:</label>
      <textarea id="inputDescricao" required>${product.descricao}</textarea>
      <span class="inputSpan inputSpan-description">Please enter a valid value.</span>
      <!-- This field is required -->
      </section>
      <section class="botoes">
      <button id="cancelBtn" type="button" class="buttonVoltar">Cancel</button>
      <button id="updateBtn" type="button" class="buttonUpdate">Confirm</button>
      </section>
      <!-- Message Sent! -->
      <!-- Thanks for completing the form. We'll be in touch soon! -->
      `;
    this.setInputs();
    this.handleBtnCancel();
    this.handleBtnUpdate();
  }

  setInputs() {
    this.inputName = document.getElementById("inputNome");
    this.inputPrice = document.getElementById("inputPreco");
    this.inputQuantity = document.getElementById("inputQuantidade");
    this.inputDescription = document.getElementById("inputDescricao");
    console.log(this.inputName)
    console.log(this.inputPrice)
    console.log(this.inputQuantity)
    console.log(this.inputDescription)
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

  validNameInput(name) {
    if (InputValidator.isNameValid(name)) {
      this.hideInvalidValueMessage(this.inputName.nextElementSibling)
    } else {
      this.showInvalidValueMessage(this.inputName.nextElementSibling)
    }
  }

  validPriceInput(price) {
    if (InputValidator.isPriceValid(price)) {
      this.hideInvalidValueMessage(this.inputPrice.nextElementSibling)
    } else {
      this.showInvalidValueMessage(this.inputPrice.nextElementSibling)
    }
  }

  validQuantityInput(quantity) {
    if (InputValidator.isQuantityValid(quantity)) {
      this.hideInvalidValueMessage(this.inputQuantity.nextElementSibling)
    } else {
      this.showInvalidValueMessage(this.inputQuantity.nextElementSibling)
    }
  }

  validDescriptionInput(description) {
    if (InputValidator.isDescriptionValid(description)) {
      this.hideInvalidValueMessage(this.inputDescription.nextElementSibling)
    } else {
      this.showInvalidValueMessage(this.inputDescription.nextElementSibling)
    }
  }

  showInvalidValueMessage(span) {
      span.style.display = "flex";
  }

  hideInvalidValueMessage(span) {
      span.style.display = "none";
  }
  
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
