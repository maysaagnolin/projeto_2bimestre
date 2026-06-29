const API = "http://localhost:3000";

async function verCardapio() {
  const res = await fetch(`${API}/menu`);
  const dados = await res.json();
  mostrar(dados.cafes.concat(dados.doces));
}

async function verCafes() {
  const res = await fetch(`${API}/cafes`);
  const dados = await res.json();
  mostrar(dados);
}

async function verDoces() {
  const res = await fetch(`${API}/doces`);
  const dados = await res.json();
  mostrar(dados);
}

function mostrar(lista) {
  const div = document.getElementById("conteudo");
  div.innerHTML = "";
  lista.forEach(item => {
    div.innerHTML += `
      <div class="card">
        <img src="images/${item.nome.toLowerCase().replace(/ /g,'_')}.jpg" alt="${item.nome}">
        <h3>${item.nome}</h3>
        <p>R$ ${item.preco}</p>
      </div>
    `;
  });
}

