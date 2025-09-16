import { Api } from "../utils/Api.js";
import { NavigationHandler } from "../utils/NavigationHandler.js";

class UpdatePage {
  constructor() {
    this.indexPagePath = "../../index.html"
    this.formElement = document.querySelector("#form");
    this.selectedProductData = JSON.parse(sessionStorage.getItem("data"));

    this.showUpdateForm(this.selectedProductData.id)
  }

  async showUpdateForm(id) {
    let product = await Api.getProductByIdJson(id);
    this.formElement.innerHTML += `
      <section class="nome">
      <section class="inputLargo">
      <label for="inputNome">Name:</label>
      <input type="text" id="inputNome" value="${product.nome}"required/>
      </section>
      </section>
      <section class="precoQuantidade">
      <section class="inputPequeno">
      <label for="inputPreco">Price:</label>
      <input type="number" id="inputPreco" value="${product.preco}"required/>
      </section>
      <section class="inputPequeno">
      <label for="inputQuantidade">Quantity:</label>
      <input type="number" id="inputQuantidade" value="${product.quantidade}"required/>
      </section>
      <!-- Please enter a valid email address -->
      <!-- This field is required -->
      </section>
      <section class="descricao">
      <label for="inputDescricao">Description:</label>
      <textarea id="inputDescricao" required>${product.descricao}</textarea>
      <!-- This field is required -->
      </section>
      <section class="botoes">
      <button id="cancelBtn" type="button" class="buttonVoltar">Cancel</button>
      <button id="updateBtn" type="button" class="buttonUpdate">Confirm</button>
      </section>
      <!-- Message Sent! -->
      <!-- Thanks for completing the form. We'll be in touch soon! -->
      `;
    this.handleBtnCancel();
    this.handleBtnUpdate();
  }

  handleBtnCancel() {
    let cancelBtn = document.querySelector("#cancelBtn");
    cancelBtn.addEventListener("click", () => {
      NavigationHandler.goTo(this.indexPagePath)
    })
  }

  handleBtnUpdate() {
    let updateBtn = document.querySelector("#updateBtn");
    updateBtn.addEventListener("click", () => {
      this.updateProduct();
    })
  }

  async updateProduct() {
    let newProductData = this.getInputsValues();
    let id = this.selectedProductData.id;

    await Api.upadateProduct(id, newProductData);
    NavigationHandler.goTo(this.indexPagePath)
  };

  getInputsValues() {
    return {
      name: document.getElementById("inputNome").value,
      price: document.getElementById("inputPreco").value,
      quantity: document.getElementById("inputQuantidade").value,
      description: document.getElementById("inputDescricao").value
    }
  }
}

const updatePage = new UpdatePage();
