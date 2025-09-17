import { Api } from "../utils/Api.js";
import { NavigationHandler } from "../utils/NavigationHandler.js";

class IndexPage {
  constructor() {
    this.registerPagePath = "./src/pages/product-registration.html";
    this.updatePagePath = "./src/pages/product-update.html";
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
        <td class="description">${product.descricao}</td>
        <td class="button" onclick="goToUpdatePage(${product.id})">
        <i class="fa-solid fa-square-pen iconeUpdate"></i>
        </td>
        <td class="button" onclick="deleteProduct(${product.id})">
        <i class="fa-solid fa-circle-xmark iconeDelete"></i>
        </td>
        </tr>
        `;
    })
  }

  async handleBtnUpdate(id) {
    this.setIdSessionStorage(id);
    NavigationHandler.goTo(this.updatePagePath);
  }

  setIdSessionStorage(id) {
    let idJson = { id : id }
    sessionStorage.setItem("data", JSON.stringify(idJson))
  }
  
  async handleBtnDelete(id) {
      await Api.deleteProduct(id);
      NavigationHandler.reload();
  }

  handleBtnRegistration() {
    this.btnRegister.addEventListener("click", () => {
      NavigationHandler.goTo(this.registerPagePath)
    })
  }
}

const indexPage = new IndexPage();
window.deleteProduct = indexPage.handleBtnDelete;
window.goToUpdatePage = indexPage.handleBtnUpdate.bind(indexPage);

