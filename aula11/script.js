import { cores } from "./cores.js";
let offset = 0;
let todosPokemons = [];
let listaAberta = false;

// --- UTILITÁRIOS ---
function estaLogado() {
  return !!localStorage.getItem("Islogged");
}
function getUserId() {
  return localStorage.getItem("userId");
}
function toast(msg, tipo = "sucesso") {
  document.body.insertAdjacentHTML(
    "beforeend",
    `<div class="toast ${tipo}"><p>${msg}</p></div>`
  );
}

// --- FAVORITOS ---
async function getFavoritos() {
  const userId = getUserId();
  if (!userId) return [];
  const res = await fetch(`http://localhost:3001/pokemon/?userId=${userId}`);
  return await res.json();
}
async function toggleFavorito(item, dados, botaoAdd, img) {
  if (!estaLogado()) {
    toast("Você precisa estar logado para favoritar!", "erro");
    return;
  }
  let favoritos = await getFavoritos();
  let fav = favoritos.find((f) => f.name === item.name);
  if (fav) {
    toast("Você removeu este item dos favoritos!", "erro");
    img.src = "./imagens/Botaofav/botaofav.svg";
    await fetch(`http://localhost:3001/pokemon/${fav.id}`, {
      method: "DELETE",
    });
    botaoAdd.removeAttribute("data-fav");
  } else {
    toast("Você adicionou este item aos favoritos!");
    img.src = "./imagens/Botaofav/botaofav2.svg";
    const Pokemon = {
      name: item.name,
      img: dados.sprites.other.dream_world.front_default,
      userId: getUserId(),
      color: `${cores[dados.types[0].type.name]}`,
    };
    const res = await fetch("http://localhost:3001/pokemon", {
      body: JSON.stringify(Pokemon),
      method: "POST",
      headers: { "Content-Type": "application/json; charset=utf-8" },
    });
    const response = await res.json();
    botaoAdd.setAttribute("data-fav", response.id);
  }
}

// --- MODAL ---
async function abrirModal(item, dados) {
  const habilidades = await fetch(dados.abilities[0]?.ability?.url ?? "")
    .then((r) => r.json())
    .catch(() => null);
  const habilidades2 = await fetch(dados.abilities[1]?.ability?.url ?? "")
    .then((r) => r.json())
    .catch(() => null);
  const localJson = await fetch(dados.location_area_encounters)
    .then((r) => r.json())
    .catch(() => []);
  async function getMove(idx) {
    return dados.moves[idx]?.move?.url
      ? await fetch(dados.moves[idx].move.url)
          .then((r) => r.json())
          .catch(() => null)
      : null;
  }
  const movimentos = [];
  for (let i = 0; i < 5; i++) movimentos[i] = await getMove(i);

  document.body.insertAdjacentHTML(
    "beforeend",
    `<div id="modal">
      <div class="informacoesPoke">
        <h1>${item.name}</h1>
        <p><strong><em>Habilidade:</em></strong> ${
          dados.abilities[0]?.ability?.name ?? "Não há"
        }</p>
        <p><strong><em>Efeito:</em></strong> ${
          habilidades?.effect_entries?.[0]?.effect ?? "Não há"
        }</p>
        <p><strong><em>Efeito rápido:</em></strong> ${
          habilidades?.effect_entries?.[0]?.short_effect ?? "Não há"
        }</p>
        <p><strong><em>Habilidade:</em></strong> ${
          dados.abilities[1]?.ability?.name ?? "Não há"
        }</p>
        <p><strong><em>Efeito:</em></strong> ${
          habilidades2?.effect_entries?.[0]?.effect ?? "Não há"
        }</p>
        <p><strong><em>Efeito rápido:</em></strong> ${
          habilidades2?.effect_entries?.[0]?.short_effect ?? "Não há"
        }</p>
        <p><strong><em>Experiência base:</em></strong> ${
          dados.base_experience ?? "Não há"
        }</p>
        <p><strong><em>índice do jogo:</em></strong> ${
          dados.game_indices?.[0]?.game_index ?? "Não há"
        }</p>
        <p>
          <strong><em>Onde encontrar:</em></strong> ${
            localJson?.[0]?.location_area?.name ?? "Não há"
          },
          <strong><em>chance de encontrar:</em></strong> ${
            localJson?.[0]?.version_details?.[0]?.encounter_details?.[0]
              ?.chance ?? "Não há"
          }%,
          <strong><em>Nível máximo:</em></strong> ${
            localJson?.[0]?.version_details?.[0]?.encounter_details?.[0]
              ?.max_level ?? "Não há"
          },
          <strong><em>método:</em></strong> ${
            localJson?.[0]?.version_details?.[0]?.encounter_details?.[0]?.method
              ?.name ?? "Não há"
          },
          <strong><em>Nível mínimo:</em></strong> ${
            localJson?.[0]?.version_details?.[0]?.encounter_details?.[0]
              ?.min_level ?? "Não há"
          }
        </p>
        <p><strong><em>Movimentos:</em></strong> ${
          dados.moves
            ?.map((m) => m.move.name)
            .slice(0, 5)
            .join(", ") || "Não há"
        }</p>
        ${movimentos
          .map(
            (mov, i) => `
          <p><strong><em>Movimento ${i + 1}:</em></strong> ${
              mov?.accuracy ?? "Não há"
            }<strong><em>% de precisão,</em></strong>
          <strong><em>efeito do movimento:</em></strong> ${
            mov?.effect_entries?.[0]?.effect ?? "Não há"
          }</p>
        `
          )
          .join("")}
      </div>
      <div id="button_info"><button class="buttonfechar">Fechar</button></div>
    </div>`
  );
  document.querySelector(".buttonfechar").onclick = () => {
    document.getElementById("modal")?.remove();
  };
}

// --- RENDERIZAÇÃO ---
async function renderPokemonLi(item, dados, ul) {
  let favoritos = await getFavoritos();
  let fav = favoritos.find((f) => f.name === item.name);
  ul.insertAdjacentHTML(
    "beforeend",
    `<li id="${item.name}" style="background-color:${
      cores[dados.types[0].type.name]
    }">
      <div class="botaoFavorito">
        <button id="${item.name}fav" class="Estrela">
          <img id="${item.name}img" class="estrelaImg" src="${
      fav
        ? "./imagens/Botaofav/botaofav2.svg"
        : "./imagens/Botaofav/botaofav.svg"
    }" alt="">
        </button>
      </div>
      <p class="nomePoke">${item.name}</p>
      <img class="imgPoke" src="${
        dados.sprites.other.dream_world.front_default
      }" alt="Imagem pokémon">
      <button class="info">Mais informações</button>
    </li>`
  );
  const botaoAdd = document.getElementById(`${item.name}fav`);
  const img = document.getElementById(`${item.name}img`);
  botaoAdd.onclick = () => toggleFavorito(item, dados, botaoAdd, img);
  const buttonInfo = document.getElementById(item.name).querySelector(".info");
  buttonInfo.onclick = () => abrirModal(item, dados);
}

// --- LISTAGEM PRINCIPAL ---
async function pegarPokemons() {
  const pokemons = await fetch(
    `https://pokeapi.co/api/v2/pokemon/?offset=${offset}&limit=20`
  );
  const pokemonRes = await pokemons.json();
  const listaPokemon = pokemonRes.results;
  const ul = document.querySelector("ul");
  ul.innerHTML = "";
  for (const item of listaPokemon) {
    const data = await fetch(item.url);
    const dados = await data.json();
    await renderPokemonLi(item, dados, ul);
  }
}

// --- PAGINAÇÃO ---
const prevBtn = document.querySelector("#prev");
const btnNext = document.querySelector("#next");
const inputPesquisa = document.querySelector("input");
btnNext.onclick = () => {
  inputPesquisa.value = "";
  offset += 20;
  prevBtn.removeAttribute("disabled");
  pegarPokemons();
};
prevBtn.onclick = () => {
  inputPesquisa.value = "";
  offset -= 20;
  if (offset === 0) prevBtn.setAttribute("disabled", true);
  pegarPokemons();
};
prevBtn.setAttribute("disabled", true);

// --- PESQUISA ---
async function carregarTodosPokemons() {
  const res = await fetch("https://pokeapi.co/api/v2/pokemon?limit=1302");
  const data = await res.json();
  todosPokemons = data.results;
}
carregarTodosPokemons();

function pesquisarPokemons() {
  let pesquisaTimeout = null;
  const ulPrincipal = document.querySelector("ul"); 

  inputPesquisa.addEventListener("input", () => {
    clearTimeout(pesquisaTimeout);
    pesquisaTimeout = setTimeout(async () => {
      const termo = inputPesquisa.value.toLowerCase();
      if (termo === "") {
        ulPrincipal.innerHTML = "";
        offset = 0;
        pegarPokemons();
        return;
      }
      ulPrincipal.innerHTML = "";
      const filtrados = todosPokemons.filter((poke) =>
        poke.name.toLowerCase().includes(termo)
      );
      if (filtrados.length === 0) {
        ulPrincipal.insertAdjacentHTML(
          "beforeend",
          `<p class="msgNaoEncontrado">Pokémon não encontrado!</p>`
        );
        return;
      }
      for (const poke of filtrados.slice(0, 10)) {
        const res = await fetch(poke.url);
        const dados = await res.json();
        await renderPokemonLi(poke, dados, ulPrincipal);
      }
    }, 300);
  });
}
pesquisarPokemons();

// --- FAVORITOS NA LISTA  ---
function exibirModal(mensagem) {
  const modal = document.createElement("div");
  modal.classList.add("modal");
  modal.innerHTML = `
    <div class="toast erro">
      <p>${mensagem}</p>
    </div>
  `;
  document.body.appendChild(modal);
}

async function PegarFavoritos() {
  const userId = localStorage.getItem("userId");
  const res = await fetch(`http://localhost:3001/pokemon/?userId=${userId}`);
  const favoritos = await res.json();
  const imgBotao = document.getElementById("FavoritoImg");

  if (listaAberta) {
    const ulExistente = document.querySelector(".ListaPokemonsFavoritados");
    if (ulExistente) ulExistente.remove();
    imgBotao.src = "./imagens/downloadpoke.png";
    listaAberta = false;
    return;
  }

  if (favoritos.length === 0) {
    exibirModal("Você ainda não possui Pokémons favoritos!");
    return;
  }

  document.body.insertAdjacentHTML(
    "beforeend",
    `
    <ul class="ListaPokemonsFavoritados">
      <div class="TituloFavorito">
        <h1>Pokémons Favoritos:</h1>
      </div>
    </ul>
    `
  );
  imgBotao.src = "./imagens/tabler--pokeball-off.svg";
  listaAberta = true;

  const ul = document.querySelector(".ListaPokemonsFavoritados");

  for (const pokeFavorito of favoritos) {
    ul.insertAdjacentHTML(
      "beforeend",
      `
      <li class="PokemonsFavoritados" style="background-color: ${pokeFavorito.color}">
        <p class="nomePoke">${pokeFavorito.name}</p>
        <img class="imgPoke" src="${pokeFavorito.img}">
        <button class="removerFavoritoBtn imgRemove" style="background-color: ${pokeFavorito.color}" data-id="${pokeFavorito.id}" data-name="${pokeFavorito.name}">
          <img src="./imagens/mdi--remove.svg" alt="Remover">
        </button>
      </li>
      `
    );
  }

  document.querySelectorAll(".removerFavoritoBtn").forEach((btn) => {
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

        if (document.querySelectorAll(".removerFavoritoBtn").length === 0) {
          document.querySelector(".ListaPokemonsFavoritados").remove();
          imgBotao.src = "./imagens/downloadpoke.png";
          listaAberta = false;
          exibirModal("Você removeu todos os seus favoritos.");
        }
      }
    });
  });
}
document.querySelector(".botaoFavoritoLista").addEventListener("click", () => {
  const ul = document.querySelector(".ListaPokemonsFavoritados");
  const imgBotaoFav = document.getElementById("FavoritoImg");

  if (ul) {
    ul.remove();
    imgBotaoFav.src = "./imagens/downloadpoke.png";
    listaAberta = false;
  } else {
    PegarFavoritos();
    imgBotaoFav.src = "./imagens/tabler--pokeball-off.svg";
  }
});

// --- VERIFICAÇÃO DE LOGIN ---
function VerificarLogado() {
  const Islogged = JSON.parse(localStorage.getItem("Islogged"));
  const botaoLoginHome = document.querySelector(".botaoLoginHome");
  const botaoCadastroHome = document.querySelector(".botaoCadastroHome");
  const imgCadastro = document.getElementById("imgCadastrar");
  const Pokemons = document.querySelector(".pokemons");
  const logo = document.querySelector(".logo");
  const ListaFav = document.querySelector(".lista");
  if (!Islogged) {
    Pokemons?.remove();
    logo?.remove();
    ListaFav?.remove();
    document.body.insertAdjacentHTML(
      "beforeend",
      `<div class="toast_autenticado">
        <div id="danger">
          <img src="./imagens/fluent-emoji-flat--warning.svg" class="danger">
        </div>
        <p class="Autenticado">Usuário não autenticado, cadastre-se para poder ter acesso aos pokémons</p>
      </div>`
    );
  } else {
    botaoLoginHome?.remove();
    botaoCadastroHome?.removeAttribute("href");
    imgCadastro.src = "./imagens/grommet-icons--logout.svg";
    botaoCadastroHome?.addEventListener("click", () => {
      localStorage.removeItem("Islogged");
      localStorage.removeItem("userId");
      location.href = "/";
    });
  }
}
VerificarLogado();

// --- INICIALIZAÇÃO ---
pegarPokemons();
