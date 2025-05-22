import { exibirModal } from "../modal/modal.js";
let modalFavoritos = null;
let listaAberta = false;

const botaoFavoritoLista = document.getElementById("botaoFavoritoLista");
botaoFavoritoLista.addEventListener("click", async () => {
  // Toggle: se já está aberta, fecha e remove a modal
  if (listaAberta && modalFavoritos) {
    document.body.removeChild(modalFavoritos);
    modalFavoritos = null;
    listaAberta = false;
    return;
  }

  const userId = localStorage.getItem("userId");
  const res = await fetch(`http://localhost:3001/pokemon/?userId=${userId}`);
  const favoritos = await res.json();

  if (favoritos.length === 0) {
    exibirModal("Você ainda não possui Pokémons favoritos!");
    return;
  }
  modalFavoritos = document.createElement("div");
  modalFavoritos.classList.add("modalFavoritos");


  let listaFavoritosHTML = `
    <div style="background:#fff; padding:24px; border-radius:8px; width:1000px; max-height:80vh; overflow-y:auto; box-shadow:0 2px 16px #0003;">
      <div style="display:flex;justify-content:space-between;align-items:center;">
        <h1 style="margin:0;font-size:1.2em;">Pokémons Favoritos:</h1>
        <button id="fecharModalFavoritos" style="font-size:1.2em; background:none; border:none; cursor:pointer;">✖</button>
      </div>
      <ul class="ListaPokemonsFavoritados" style="max-height:300px;overflow-y:auto;list-style:none;padding:0;">
  `;

  for (const pokeFavorito of favoritos) {
    listaFavoritosHTML += `
      <li class="PokemonsFavoritados" style="background-color: ${pokeFavorito.color}; margin-bottom:10px; padding:10px; border-radius:6px;">
        <p class="nomePoke">${pokeFavorito.name}</p>
        <img class="imgPoke" src="${pokeFavorito.img}">
        <button class="removerFavoritoBtn imgRemove" style="background-color: ${pokeFavorito.color}" data-id="${pokeFavorito.id}" data-name="${pokeFavorito.name}">
          <img src="../imagens/mdi--remove.svg" alt="Remover">
        </button>
      </li>
    `;
  }
  listaFavoritosHTML += `</ul></div>`;

  modalFavoritos.innerHTML = listaFavoritosHTML;
  document.body.appendChild(modalFavoritos);
  listaAberta = true;

  // Fechar modal ao clicar no botão X
  document.getElementById("fecharModalFavoritos").onclick = () => {
    document.body.removeChild(modalFavoritos);
    modalFavoritos = null;
    listaAberta = false;
  };

  // Remover favorito
  modalFavoritos.querySelectorAll(".removerFavoritoBtn").forEach((btn) => {
    btn.addEventListener("click", async () => {
      const id = btn.getAttribute("data-id");
      const name = btn.getAttribute("data-name");

      const response = await fetch(`http://localhost:3001/pokemon/${id}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
      });

      if (response.ok) {
        btn.closest("li").remove();

        const favBtn = document.getElementById(`${name}img`);
        if (favBtn) {
          favBtn.src = "./imagens/Botaofav/botaofav.svg";
        }

        if (modalFavoritos.querySelectorAll(".removerFavoritoBtn").length === 0) {
          document.body.removeChild(modalFavoritos);
          modalFavoritos = null;
          listaAberta = false;
          exibirModal("Você removeu todos os seus favoritos.");
        }
      }
    });
  });
});

async function detalhesPerfil() {
  const userId = localStorage.getItem("userId");
  if (!userId) return;

  const res = await fetch(`http://localhost:3001/users/${userId}`);
  if (!res.ok) return;

  const user = await res.json();

  const email = document.querySelector(".emailPerfil");
  if (email) {
    email.innerHTML = `<strong>Email:</strong> ${user.email}`;
  }
}

detalhesPerfil();