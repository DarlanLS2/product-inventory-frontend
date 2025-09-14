let paginaHome = (event) => {
  event.preventDefault();
  window.location.href = "../../index.html";
};

let validarCadastro = async (event) => {
  event.preventDefault(); 
  let nome = document.getElementById("inputNome").value;
  let preco = document.getElementById("inputPreco").value;
  let quantidade = document.getElementById("inputQuantidade").value;
  let descricao = document.getElementById("inputDescricao").value;

  let resposta = await fetch("http://localhost:3000/product/" + nome + "/" + preco + "/" + quantidade + "/" + descricao, {method: "POST"});
  window.location.href = "../../index.html";
};
