import { Api } from "../utils/Api.js";
import { NavigationHandler } from "../utils/NavigationHandler.js";

//TODO: Refatorar esta função
const paginaUpdate = async (id) => {
  const dados = { idDigitado: id };
  sessionStorage.setItem("dadosProduto", JSON.stringify(dados));
  window.location.href = "./src/pages/product-update.html";
};

class IndexPage {
  constructor() {
    this.tableElement = document.querySelector("#tabela");
    this.btnRegister = document.querySelector("#btnRegister")
    this.btnDelete = document.querySelector("#btnDelete")

    this.renderProducts();
    this.handleBtnRegistration();
  }

  async renderProducts() {
    let productsJson = await Api.getAllProductsJson()
    productsJson.forEach((product) => {
      this.tableElement.innerHTML += `
        <tr>
        <td>${product.id}</td>
        <td>${product.nome}</td>
        <td>${product.preco}</td>
        <td>${product.quantidade}</td>
        <td>${product.descricao}</td>
        <td class="button" onclick="paginaUpdate(${product.id})">
        <i class="fa-solid fa-square-pen iconeUpdate"></i>
        </td>
        <td class="button" onclick="deleteProduct(${product.id})">
        <i class="fa-solid fa-circle-xmark iconeDelete"></i>
        </td>
        </tr>
        `;
    })
  }
  
  async handleBtnDelete(id) {
      await Api.deleteProduct(id);
      NavigationHandler.reload();
  }

  handleBtnRegistration() {
    this.btnRegister.addEventListener("click", () => {
      NavigationHandler.goTo("./src/pages/product-registration.html")
    })
  }
}

const indexPage = new IndexPage();
window.deleteProduct = indexPage.handleBtnDelete;
