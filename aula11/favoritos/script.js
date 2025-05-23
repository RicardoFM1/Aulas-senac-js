import { exibirModal } from "../modal/modal.js";
let modalFavoritos = null;
let listaAberta = false;

const botaoFavoritoLista = document.getElementById("botaoFavoritoLista");
botaoFavoritoLista.addEventListener("click", async () => {
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
    <div class="modalFavoritosFundo">
      <div style="display:flex;justify-content:space-between;align-items:center; ">
        <h1 style="margin:0;font-size:1.2em;">Pokémons Favoritos:</h1>
        <button id="fecharModalFavoritos" style="font-size:18px; background:none; border:none; cursor:pointer;">✖</button>
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

  document.getElementById("fecharModalFavoritos").onclick = () => {
    document.body.removeChild(modalFavoritos);
    modalFavoritos = null;
    listaAberta = false;
  };

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

        if (
          modalFavoritos.querySelectorAll(".removerFavoritoBtn").length === 0
        ) {
          document.body.removeChild(modalFavoritos);
          modalFavoritos = null;
          listaAberta = false;
          exibirModal(
            "Você removeu todos os seus pokémons favoritos.",
            "sucesso"
          );
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
  const nome = document.querySelector(".nomePerfil");
  if (email) {
    email.innerHTML = `<strong>Email:</strong> ${user.email}`;
  }
  if (nome) {
    nome.innerHTML = `<strong>Nome:</strong> ${user.nome}`;
  }
}
detalhesPerfil();

function deletarConta() {
  const botaoDeletar = document.getElementById("deletarConta");

  botaoDeletar.addEventListener("click", (e) => {
    const modalConfirmacao = document.getElementById("confirmacaoModal");
    if (modalConfirmacao) {
      modalConfirmacao.remove();
      return;
    } else {
      e.preventDefault();
      document.body.insertAdjacentHTML(
        "beforeend",
        `
    <div class="modalDeletarFundo">
    <div id="confirmacaoModal">
    <h1 class="tituloConfirmacao">TEM CERTEZA?</h1>
    <p>Tem realmente certeza que quer <span>DELETAR</span> sua <span>CONTA?</span></p>
    <div class="botoesDeletar">
    <button id="buttonConfirmarSim">Sim</button>
    <button id="buttonConfirmarNao">Não</button>
    </div>
    </div>
    </div>
    
      `
      );
      const botaoTirarModal = document.getElementById("buttonConfirmarNao");
      botaoTirarModal.addEventListener("click", (e) => {
        const modalConfirmacao = document.getElementById("confirmacaoModal");
        const modalDeletarFundo = document.querySelector(".modalDeletarFundo");
        e.preventDefault();
        if (modalConfirmacao) {
          modalDeletarFundo.remove();
          modalConfirmacao.remove();
        }
      });
      const botaoDeletarUser = document.getElementById("buttonConfirmarSim");

      botaoDeletarUser.addEventListener("click", async () => {
        const userId = localStorage.getItem("userId");
        const token = localStorage.getItem("token");
        const res = await fetch(`http://localhost:3001/users/${userId}`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        if (res.ok) {
          const modalDeletarFundo =
            document.querySelector(".modalDeletarFundo");
          const modalConfirmacao = document.getElementById("confirmacaoModal");
          modalConfirmacao.remove();
          modalDeletarFundo.remove();
          exibirModal("Conta deletada com sucesso!", "sucesso");
          localStorage.removeItem("token");
          localStorage.removeItem("Islogged");
          localStorage.removeItem("userId");
          setTimeout(() => {
            window.location.href = "/";
          }, 2000);
        } else {
          exibirModal("Erro ao deletar conta!", "erro");
        }
      });
    }
  });
}
deletarConta();
const inputFoto = document.getElementById("inputFotoPerfil");
const imgPerfil = document.getElementById("fotoPerfil");
const userId = localStorage.getItem("userId");
const fotoSalva = localStorage.getItem(`fotoPerfil_${userId}`);
if (fotoSalva) {
  imgPerfil.src = fotoSalva;
} else {
  imgPerfil.src = "../imagens/ph--user-fill.svg";
}

inputFoto?.addEventListener("change", (e) => {
  const file = e.target.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = function (evt) {
    imgPerfil.src = evt.target.result;
    localStorage.setItem(`fotoPerfil_${userId}`, evt.target.result);
  };
  reader.readAsDataURL(file);
});
