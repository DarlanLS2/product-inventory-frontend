const exibirFormulario = async (id) => {
  let resposta = await fetch("http://localhost:3000/product/" + id);
  let produto = await resposta.json();
  let form = document.querySelector("#form");
  form.innerHTML += `
    <section class="nome">
    <section class="inputLargo">
    <label for="inputNome">Nome:</label>
    <input type="text" id="inputNome" value="${produto.nome}"required/>
    <!-- This field is required -->
    </section>
    </section>

    <section class="precoQuantidade">
    <section class="inputPequeno">
    <label for="inputPreco">Preço:</label>
    <input type="number" id="inputPreco" value="${produto.preco}"required/>
    </section>
    <section class="inputPequeno">
    <label for="inputQuantidade">Quantidade:</label>
    <input type="number" id="inputQuantidade" value="${produto.quantidade}"required/>
    </section>
    <!-- Please enter a valid email address -->
    <!-- This field is required -->
    </section>

    <section class="descricao">
    <label for="inputDescricao">Descrição:</label>
    <textarea id="inputDescricao" required>${produto.descricao}</textarea>

    <!-- This field is required -->
    </section>

    <section class="botoes">
    <button type="button" class="buttonVoltar" onclick="paginaHome(event)">Voltar</button>
    <button type="submit" onclick="validarUpdate(event)" class="buttonUpdate">Atualizar</button>
    </section>


    <!-- Message Sent! -->
    <!-- Thanks for completing the form. We'll be in touch soon! -->
    `;
}
const paginaHome = (event) => {
  event.preventDefault();
  window.location.href = "../../index.html";
};
const validarUpdate = async (event) => {
  event.preventDefault(); 
  let nome = document.getElementById("inputNome").value;
  let preco = document.getElementById("inputPreco").value;
  let quantidade = document.getElementById("inputQuantidade").value;
  let descricao = document.getElementById("inputDescricao").value;
  let resposta = await fetch("http://localhost:3000/update/"+ dados.idDigitado + "/" + nome + "/" + preco + "/" + quantidade + "/" + descricao, {
    method: "PUT"
  });
  window.location.href = "../../index.html"
};
const dados = JSON.parse(sessionStorage.getItem("dadosProduto"));
console.log(dados.idDigitado);
exibirFormulario(dados.idDigitado);
