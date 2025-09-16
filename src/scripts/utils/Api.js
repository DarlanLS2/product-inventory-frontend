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
      await fetch("http://localhost:3000/product", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          name: productData.name,
          price: productData.price,
          quantity: productData.quantity,
          description: productData.description
        })
      });
    } catch (err) {
      throw new Error("Erro ao cadastrar produto: " + err)
    }
  }
  
  static async upadateProduct(id, newProductData) {
    try {
      await fetch("http://localhost:3000/product", {
        method: "PUT",
        headers: {
          "Content-Type" : "application/json"
        },
        body: JSON.stringify({
          id: id,
          name: newProductData.name,
          price: newProductData.price,
          quantity: newProductData.quantity,
          description: newProductData.description
        })
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
