export class Api {

  static async getAllProductsJson() {
    try {
      let response = await fetch("http://localhost:3000/");
      return await response.json();
    } catch (err) {
      throw new Error("Erro ao buscar produtos: " + err);
    }
  }

  static async getProductByIdJson(id) {
    try {
      let response = await fetch("http://localhost:3000/product/" + id);
      return await response.json();
    } catch (err) {
      throw new Error("Erro ao buscar produto: " + err)
    }
  }

  static async postProduct(productData) {
    try {
      let route = `http://localhost:3000/product/${productData.name}/${productData.price}/${productData.quantity}/${productData.description}`
      await fetch(route, {
        method: "POST"
      });
    } catch (err) {
      throw new Error("Erro ao cadastrar produto: " + err)
    }
  }
  
  //TODO: Passar os parametros pelo body da requisição
  static async upadateProduct(id, newProductData) {
    try {
      let updateRoute = `http://localhost:3000/update/${id}/${newProductData.name}/${newProductData.price}/${newProductData.quantity}/${newProductData.description}`;
      await fetch(updateRoute, {
        method: "PUT"
      });
    } catch (err) {
      throw new Error("Erro ao atulaizar produto: " + err);
    }
  }

  static async deleteProduct(id) {
    try {
      await fetch("http://localhost:3000/product/" + id, {
        method: "DELETE"
      })
    } catch (err) {
      throw new Error("Erro ao deletar produto/" + err)
    }
  }
}
