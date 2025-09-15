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
      <label for="inputNome">Nome:</label>
      <input type="text" id="inputNome" value="${product.nome}"required/>
      <!-- This field is required -->
      </section>
      </section>
      <section class="precoQuantidade">
      <section class="inputPequeno">
      <label for="inputPreco">Preço:</label>
      <input type="number" id="inputPreco" value="${product.preco}"required/>
      </section>
      <section class="inputPequeno">
      <label for="inputQuantidade">Quantidade:</label>
      <input type="number" id="inputQuantidade" value="${product.quantidade}"required/>
      </section>
      <!-- Please enter a valid email address -->
      <!-- This field is required -->
      </section>
      <section class="descricao">
      <label for="inputDescricao">Descrição:</label>
      <textarea id="inputDescricao" required>${product.descricao}</textarea>
      <!-- This field is required -->
      </section>
      <section class="botoes">
      <button id="btnCancel" type="button" class="buttonVoltar">Voltar</button>
      <button id="btnUpdate" type="button" class="buttonUpdate">Atualizar</button>
      </section>
      <!-- Message Sent! -->
      <!-- Thanks for completing the form. We'll be in touch soon! -->
      `;
    this.handleBtnCancel();
    this.handleBtnUpdate();
  }

  handleBtnCancel() {
    let btnCancel = document.querySelector("#btnCancel");
    btnCancel.addEventListener("click", () => {
      NavigationHandler.goTo(this.indexPagePath)
    })
  }

  handleBtnUpdate() {
    let btnUpdate = document.querySelector("#btnUpdate");
    btnUpdate.addEventListener("click", () => {
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
