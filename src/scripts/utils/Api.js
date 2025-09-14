export class Api {
  static async getAllProductsJson() {
    try {
      let response = await fetch("http://localhost:3000/");
      return await response.json();
    } catch (err) {
      throw new Error("Erro ao buscar produtos");
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
