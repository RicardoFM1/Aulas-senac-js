import {cores} from "./cores.js"
let offset = 0;
async function carregarFavoritos() {
  const userId = localStorage.getItem('userId'); // Pega o ID do usuário logado
  if (!userId) return; // Se não tiver usuário logado, não faz nada
  
  try {
    const response = await fetch(`http://localhost:3001/favoritos/${userId}`);
    const favoritos = await response.json(); // Ex: [1, 2, 3] (IDs dos favoritos)

    // Atualiza os botões de favoritos
    document.querySelectorAll('.favorite-btn').forEach(btn => {
      const pokeId = btn.dataset.id; // ID do Pokémon no botão
      const img = btn.querySelector('img');

      if (favoritos.includes(Number(pokeId))) {
        img.src = './imagens/Botaofav/botaofav2.svg'; // Imagem do favorito preenchido
        btn.classList.add('favoritado');
      } else {
        img.src = './imagens/Botaofav/botaofav.svg'; // Imagem padrão
        btn.classList.remove('favoritado');
      }
    });
  } catch (error) {
    console.error('Erro ao carregar favoritos:', error);
  }
}

// Carregar favoritos quando a página for carregada
window.addEventListener('DOMContentLoaded', carregarFavoritos);
async function pegarPokemons() {
  const pokemons = await fetch("https://pokeapi.co/api/v2/pokemon/?limit=20", {
    headers: {
      Accept: "application/json",
    },
  });

  const pokemonRes = await pokemons.json();
  const listaPokemon = pokemonRes.results;
  const ul = document.querySelector("ul");

  for (const item of listaPokemon) {
    setTimeout(async () => {
      const data = await fetch(item.url);
      const dados = await data.json();

   ul.insertAdjacentHTML(
  "beforeend",
  `
    <li id=${item.name} style="background-color:${cores[dados.types[0].type.name]}">
      <div class="botaoFavorito">
        <button id="${item.name}fav" class="Estrela">
          <img id="${item.name}img" class="estrelaImg" src="./imagens/Botaofav/botaofav.svg" alt="">
        </button>
      </div>
      <p class="nomePoke">${item.name}</p>
      <img class="imgPoke" src="${dados.sprites.other.dream_world.front_default}" alt="Imagem pokémon">
      <button class="info">Mais informações</button> 
    </li>
  `
);
     function PokemonAdd() {
  const UserId = localStorage.getItem("userId");
  const botaoAdd = document.getElementById(`${item.name}fav`);
  const img = document.getElementById(`${item.name}img`);
  let eFavorito = false;

  botaoAdd.addEventListener("click", async () => {
    const idFav = botaoAdd.getAttribute("data-fav");

    if (eFavorito) {
      // Remover do favoritos
      document.body.insertAdjacentHTML(
        "beforeend",
        `<div class="toast erro">
           <p>Você removeu este item dos favoritos!</p>
         </div>`
      );
      img.src = "./imagens/Botaofav/botaofav.svg"; // Imagem padrão
      await fetch(`http://localhost:3001/pokemon/${idFav}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json; charset=utf-8",
        },
      });
      botaoAdd.removeAttribute("data-fav");
      eFavorito = !eFavorito;
      carregarFavoritos(); // Atualiza a lista de favoritos após remoção
    } else {
      // Adicionar aos favoritos
      document.body.insertAdjacentHTML(
        "beforeend",
        `<div class="toast sucesso">
           <p>Você adicionou este item aos favoritos!</p>
         </div>`
      );
      img.src = "./imagens/Botaofav/botaofav2.svg"; // Imagem preenchida

      const Pokemon = {
        name: item.name,
        img: dados.sprites.other.dream_world.front_default,
        userId: UserId,
        color: `${cores[dados.types[0].type.name]}`,
      };

      const res = await fetch("http://localhost:3001/pokemon", {
        body: JSON.stringify(Pokemon),
        method: "POST",
        headers: {
          "Content-Type": "application/json; charset=utf-8",
        },
      });
      const response = await res.json();
      botaoAdd.setAttribute("data-fav", response.id);
      eFavorito = !eFavorito;
      carregarFavoritos(); // Atualiza a lista de favoritos após adição
    }
  });
}

PokemonAdd(); 

      const buttonInfo = document.getElementById(item.name);
      const button = buttonInfo.querySelector(".info");

      button.addEventListener("click", async () => {
        if (document.querySelector("#modal")) {
          modal.remove();
        } else {
          const habilidades = await fetch(dados.abilities[0].ability.url);
          const habilidades2 = await fetch(dados.abilities[1].ability.url);
          const Locais = await fetch(dados.location_area_encounters);
          const Movimento1 = await fetch(dados.moves[0].move.url);
          const Movimento2 = await fetch(dados.moves[1].move.url);
          const Movimento3 = await fetch(dados.moves[2].move.url);
          const Movimento4 = await fetch(dados.moves[3].move.url);
          const Movimento5 = await fetch(dados.moves[4].move.url);
          console.log(habilidades);
          console.log(habilidades2);
          console.log(Locais);
          console.log(Movimento1);
          const habilidadesJson = await habilidades.json();
          const habilidades2Json = await habilidades2.json();
          const localJson = await Locais.json();
          const movimentosJson1 = await Movimento1.json();
          const movimentosJson2 = await Movimento2.json();
          const movimentosJson3 = await Movimento3.json();
          const movimentosJson4 = await Movimento4.json();
          const movimentosJson5 = await Movimento5.json();
          console.log(habilidadesJson.effect_entries[0].effect);
          console.log(habilidades2Json.effect_entries[0].effect);
          console.log(movimentosJson1);

          document.body.insertAdjacentHTML(
            "beforeend",
            `
                    <div id="modal"> 
                    <div class="informacoesPoke">
                        <h1>${item.name}</h1>
                        <p>
                        <strong><em>Habilidade:</em></strong> ${
                              dados.abilities[0]
                                ? dados.abilities[0]?.ability.name
                                : "Não há"
                            }
                        </p>

                        <p>
                        <strong><em>Efeito:</em></strong> 
                        ${habilidadesJson.effect_entries[0]? habilidadesJson.effect_entries[0].effect: "Não há"}
                        </p>

                        <p>
                        <strong><em>Efeito rápido:</em></strong> 
                        ${habilidadesJson.effect_entries[0] ? habilidadesJson.effect_entries[0].short_effect: "Não há"}
                        </p>

                        <p>
                        <strong><em>Habilidade:</em></strong> 
                        ${
                          dados.abilities[1]
                            ? dados.abilities[1].ability.name
                            : "Não há"
                        }
                        </p>

                        <p>
                        <strong><em>Efeito:</em></strong> 
                        ${
                          habilidades2Json.effect_entries[0]
                            ? habilidades2Json.effect_entries[0].effect
                            : "Não há"
                        }
                        </p>

                        <p>
                            <strong><em>Efeito rápido:</em></strong> 
                            ${
                              habilidades2Json.effect_entries[0]
                                ? habilidades2Json.effect_entries[0]
                                    .short_effect
                                : "Não há"
                            }
                        </p>

                        <p>
                            <strong><em>Experiência base:</em></strong> 
                            ${
                              dados.base_experience
                                ? dados.base_experience
                                : "Não há"
                            }
                        </p>

                        <p>
                            <strong><em>índice do jogo:</em></strong> ${
                              dados.game_indices[0]
                                ? dados.game_indices[0].game_index
                                : "Não há"
                            }
                        </p>

                        <p>
                        <strong><em>Onde encontrar:</em></strong> ${
                          localJson[0]?.location_area
                            ? localJson[0]?.location_area.name
                            : "Não há"
                        }, <strong><em>chance de encontrar:</em></strong> 
                        ${
                          localJson[0]?.version_details[0]
                            ? localJson[0]?.version_details[0]
                                .encounter_details[0].chance
                            : "Não há"
                        }%,
                        <strong><em>Nível máximo:</em></strong> 
                        ${
                          localJson[0]?.version_details[0]
                            ? localJson[0]?.version_details[0]
                                .encounter_details[0].max_level
                            : "Não há"
                        },  
                        <strong><em>método:</em></strong> ${
                          localJson[0]?.version_details[0]
                            ? localJson[0]?.version_details[0]
                                .encounter_details[0].method.name
                            : "Não há"
                        }, 
                        <strong><em>Nível mínimo:</em></strong> ${
                          localJson[0]?.version_details[0]
                            ? localJson[0]?.version_details[0]
                                .encounter_details[0].min_level
                            : "Não há"
                        }
                        </p>

                        <p><strong><em>Movimentos:</em></strong> ${
                          dados.moves[0] ? dados.moves[0].move.name : "Não há"
                        }, ${
              dados.moves[1] ? dados.moves[1].move.name : "Não há"
            }, ${dados.moves[2] ? dados.moves[2].move.name : "Não há"}, ${
              dados.moves[3] ? dados.moves[3].move.name : "Não há"
            }, ${dados.moves[4] ? dados.moves[4].move.name : "Não há"} </p>
                        <p><strong><em>Movimento 1:</em></strong> ${
                          movimentosJson1.accuracy
                        }<strong><em>% de precisão,</em></strong> <strong><em>efeito do movimento:</em></strong> ${
              movimentosJson1.effect_entries[0]
                ? movimentosJson1.effect_entries[0].effect
                : "Não há"
            }</p>
                        <p><strong><em>Movimento 2:</em></strong> ${
                          movimentosJson2.accuracy
                        }<strong><em>% de precisão,</em></strong> <strong><em>efeito do movimento:</em></strong> ${
              movimentosJson2.effect_entries[0]
                ? movimentosJson2.effect_entries[0].effect
                : "Não há"
            }</p>
                        <p><strong><em>Movimento 3:</em></strong> ${
                          movimentosJson3.accuracy
                        }<strong><em>% de precisão,</em></strong> <strong><em>efeito do movimento:</em></strong> ${
              movimentosJson3.effect_entries[0]
                ? movimentosJson3.effect_entries[0].effect
                : "Não há"
            }</p>
                        <p><strong><em>Movimento 4:</em></strong> ${
                          movimentosJson4.accuracy
                        }<strong><em>% de precisão,</em></strong> <strong><em>efeito do movimento:</em></strong> ${
              movimentosJson4.effect_entries[0]
                ? movimentosJson4.effect_entries[0].effect
                : "Não há"
            }</p>
                        <p><strong><em>Movimento 5:</em></strong> ${
                          movimentosJson5.accuracy
                        }<strong><em>% de precisão,</em></strong> <strong><em>efeito do movimento:</em></strong> ${
              movimentosJson5.effect_entries[0]
                ? movimentosJson5.effect_entries[0].effect
                : "Não há"
            }</p>
                        <p><strong><em>Método de aprendizagem do movimento 1:</em></strong> ${
                          dados.moves[0]
                            ? dados.moves[0].version_group_details[0]
                                ?.move_learn_method.name
                            : "Não há"
                        }</p>
                        <p><strong><em>Método de aprendizagem do movimento 2:</em></strong> ${
                          dados.moves[0]
                            ? dados.moves[0].version_group_details[1]
                                ?.move_learn_method.name
                            : "Não há"
                        }</p>
                        <p><strong><em>Método de aprendizagem do movimento 3:</em></strong> ${
                          dados.moves[0]
                            ? dados.moves[0].version_group_details[2]
                                ?.move_learn_method.name
                            : "Não há"
                        },</p>
                        <p><strong><em>Método de aprendizagem do movimento 4:</em></strong> ${
                          dados.moves[0]
                            ? dados.moves[0].version_group_details[3]
                                ?.move_learn_method.name
                            : "Não há"
                        },</p>
                        <p><strong><em>Método de aprendizagem do movimento 5:</em></strong> ${
                          dados.moves[0]
                            ? dados.moves[0].version_group_details[4]
                                ?.move_learn_method.name
                            : "Não há"
                        },</p>
                    </div>
                        <div id="button_info">
                            <button class="buttonfechar">Fechar</button>
                        </div>
                    </div>
                `
          );

          const buttonFechar = document.querySelector(".buttonfechar");
          buttonFechar.addEventListener("click", () => {
            const modal = document.querySelector("#modal");
            if (modal) modal.remove();
          });
        }
      });
    }, 1500);
  }

  const prevBtn = document.querySelector("#prev");

  const btnNext = document.querySelector("#next");
  btnNext.addEventListener("click", () => {
    offset = offset + 20;
    prevBtn.removeAttribute("disabled");
    nextPage();
  });
  prevBtn.addEventListener("click", () => {
    offset = offset - 20;
    if (offset === 0) {
      prevBtn.setAttribute("disabled", true);
    }
    nextPage();
  });
  prevBtn.setAttribute("disabled", true);
}
pegarPokemons();

async function nextPage() {
  const ul = document.querySelector("ul");
  ul.innerHTML = "";
  const res = await fetch(
    `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=20`,
    {
      headers: {
        "Content-type": "application/json; charset=utf-8",
      },
    }
  );
  const response = await res.json();
  console.log(response, "response");
  const listPokemon = response.results;
  for (let item of listPokemon) {
    const data = await fetch(item.url);
    const dados = await data.json();

    ul.insertAdjacentHTML(
      "beforeend",
      `
            <li id=${item.name} style="background-color:${cores[dados.types[0].type.name]}">
            <div class="botaoFavorito">
            <button id="${item.name}fav" class="Estrela"><img id="${item.name}img" class="estrelaImg" src="./imagens/Botaofav/botaofav.svg" alt=""></button>
            </div>
                <p class="nomePoke">${item.name}</p>
                <img class="imgPoke" src="${dados.sprites.other.dream_world.front_default}" alt="Imagem pokémon">
                <button class="info">Mais informações</button> 
            </li>
            
        `
    );

    function PokemonAdd() {
        const UserId = localStorage.getItem("userId");
        const botaoAdd = document.getElementById(`${item.name}fav`);
        const img = document.getElementById(`${item.name}img`);
        let eFavorito = false;
        botaoAdd.addEventListener("click", async () => {
          
  
          if (eFavorito) {
            document.body.insertAdjacentHTML(
              "beforeend",
              `
                <div class="toast erro">
                <p>Você removeu este item dos favoritos!</p>
                </div>
                `
            );
            const idFav = botaoAdd.getAttribute("data-fav")
            console.log(idFav,"fav id")
            img.src = "./imagens/Botaofav/botaofav.svg";
            await fetch(
              `http://localhost:3001/pokemon/${idFav}`,
              {
                method: "DELETE",
                headers: {
                  "Content-Type": "application/json; charset=utf-8",
                },
              }
            );
            botaoAdd.removeAttribute("data-fav")
             eFavorito = !eFavorito;
          } else {
            document.body.insertAdjacentHTML(
              "beforeend",
              `
              <div class="toast sucesso">
              <p>Você adicionou este item aos favoritos!</p>
              </div>
              `
            );
            atualizarFavoritos();
            img.src = "./imagens/Botaofav/botaofav2.svg";
            
            
            const Pokemon = {
              name: item.name,
              img: dados.sprites.other.dream_world.front_default,
              userId: UserId,
              color: `${cores[dados.types[0].type.name]}`
            };
          const res = await fetch(`http://localhost:3001/pokemon`, {
            body: JSON.stringify(Pokemon),
            method: "POST",
            headers: {
              "Content-Type": "application/json; charset=utf-8",
            },
          });
          const response = await res.json()
          console.log(response.id,"id")
          botaoAdd.setAttribute("data-fav",response.id)
          eFavorito = !eFavorito;
        }
       
        });
      }
      PokemonAdd();

    const buttonInfo = document.getElementById(item.name);
    const button = buttonInfo.querySelector(".info");

    button.addEventListener("click", async () => {
      if (document.querySelector("#modal")) {
        modal.remove();
      } else {
        const habilidades = await fetch(
          dados.abilities[1] ? dados.abilities[0]?.ability.url : "Nao há"
        );
        const habilidades2 = await fetch(
          dados.abilities[1] ? dados.abilities[1]?.ability.url : "Nao há"
        );
        const Locais = await fetch(
          dados.location_area_encounters
            ? dados.location_area_encounters
            : "Nao há"
        );
        const Movimento1 = await fetch(
          dados.moves[0] ? dados.moves[0]?.move.url : "Não há"
        );
        const Movimento2 = await fetch(
          dados.moves[1] ? dados.moves[1]?.move.url : "Não há"
        );
        const Movimento3 = await fetch(
          dados.moves[2] ? dados.moves[2]?.move.url : "Não há"
        );
        const Movimento4 = await fetch(
          dados.moves[3] ? dados.moves[3]?.move.url : "Não há"
        );
        const Movimento5 = await fetch(
          dados.moves[4] ? dados.moves[4]?.move.url : "Não há"
        );
        console.log(habilidades);
        console.log(habilidades2);
        console.log(Locais);
        console.log(Movimento1);
        const habilidadesJson = await habilidades.json();
        const habilidades2Json = await habilidades2.json();
        const localJson = await Locais.json();
        const movimentosJson1 = await Movimento1.json();
        const movimentosJson2 = await Movimento2.json();
        const movimentosJson3 = await Movimento3.json();
        const movimentosJson4 = await Movimento4.json();
        const movimentosJson5 = await Movimento5.json();
        console.log(habilidadesJson.effect_entries[0].effect);
        console.log(habilidades2Json.effect_entries[0].effect);
        console.log(movimentosJson1);

        document.body.insertAdjacentHTML(
          "beforeend",
          `
                        <div id="modal"> 
                        <div class="informacoesPoke">
                            <h1>${item.name}</h1>
                            <p>
                            <strong><em>Habilidade:</em></strong> ${
                              dados.abilities[0]
                                ? dados.abilities[0]?.ability.name
                                : "Não há"
                            }
                            </p>
    
                            <p>
                            <strong><em>Efeito:</em></strong> 
                            ${
                              habilidadesJson.effect_entries[0]
                                ? habilidadesJson.effect_entries[0].effect
                                : "Não há"
                            }
                            </p>
    
                            <p>
                            <strong><em>Efeito rápido:</em></strong> 
                            ${
                              habilidadesJson.effect_entries[0]
                                ? habilidadesJson.effect_entries[0].short_effect
                                : "Não há"
                            }
                            </p>
    
                            <p>
                            <strong><em>Habilidade:</em></strong> 
                            ${
                              dados.abilities[1]
                                ? dados.abilities[1].ability.name
                                : "Não há"
                            }
                            </p>
    
                            <p>
                            <strong><em>Efeito:</em></strong> 
                            ${
                              habilidades2Json.effect_entries[0]
                                ? habilidades2Json.effect_entries[0].effect
                                : "Não há"
                            }
                            </p>
    
                            <p>
                                <strong><em>Efeito rápido:</em></strong> 
                                ${
                                  habilidades2Json.effect_entries[0]
                                    ? habilidades2Json.effect_entries[0]
                                        .short_effect
                                    : "Não há"
                                }
                            </p>
    
                            <p>
                                <strong><em>Experiência base:</em></strong> 
                                ${
                                  dados.base_experience
                                    ? dados.base_experience
                                    : "Não há"
                                }
                            </p>
    
                            <p>
                                <strong><em>índice do jogo:</em></strong> ${
                                  dados.game_indices[0]
                                    ? dados.game_indices[0].game_index
                                    : "Não há"
                                }
                            </p>
    
                            <p>
                            <strong><em>Onde encontrar:</em></strong> ${
                              localJson[0]?.location_area
                                ? localJson[0]?.location_area.name
                                : "Não há"
                            }, <strong><em>chance de encontrar:</em></strong> 
                            ${
                              localJson[0]?.version_details[0]
                                ? localJson[0]?.version_details[0]
                                    .encounter_details[0].chance
                                : "Não há"
                            }%,
                            <strong><em>Nível máximo:</em></strong> 
                            ${
                              localJson[0]?.version_details[0]
                                ? localJson[0]?.version_details[0]
                                    .encounter_details[0].max_level
                                : "Não há"
                            },  
                            <strong><em>método:</em></strong> ${
                              localJson[0]?.version_details[0]
                                ? localJson[0]?.version_details[0]
                                    .encounter_details[0].method.name
                                : "Não há"
                            }, 
                            <strong><em>Nível mínimo:</em></strong> ${
                              localJson[0]?.version_details[0]
                                ? localJson[0]?.version_details[0]
                                    .encounter_details[0].min_level
                                : "Não há"
                            }
                            </p>
    
                            <p><strong><em>Movimentos:</em></strong> ${
                              dados.moves[0]
                                ? dados.moves[0].move.name
                                : "Não há"
                            }, ${
            dados.moves[1] ? dados.moves[1].move.name : "Não há"
          }, ${dados.moves[2] ? dados.moves[2].move.name : "Não há"}, ${
            dados.moves[3] ? dados.moves[3].move.name : "Não há"
          }, ${dados.moves[4] ? dados.moves[4].move.name : "Não há"} </p>
                            <p><strong><em>Movimento 1:</em></strong> ${
                              movimentosJson1.accuracy
                            }<strong><em>% de precisão,</em></strong> <strong><em>efeito do movimento:</em></strong> ${
            movimentosJson1.effect_entries[0]
              ? movimentosJson1.effect_entries[0].effect
              : "Não há"
          }</p>
                            <p><strong><em>Movimento 2:</em></strong> ${
                              movimentosJson2.accuracy
                            }<strong><em>% de precisão,</em></strong> <strong><em>efeito do movimento:</em></strong> ${
            movimentosJson2.effect_entries[0]
              ? movimentosJson2.effect_entries[0].effect
              : "Não há"
          }</p>
                            <p><strong><em>Movimento 3:</em></strong> ${
                              movimentosJson3.accuracy
                            }<strong><em>% de precisão,</em></strong> <strong><em>efeito do movimento:</em></strong> ${
            movimentosJson3.effect_entries[0]
              ? movimentosJson3.effect_entries[0].effect
              : "Não há"
          }</p>
                            <p><strong><em>Movimento 4:</em></strong> ${
                              movimentosJson4.accuracy
                            }<strong><em>% de precisão,</em></strong> <strong><em>efeito do movimento:</em></strong> ${
            movimentosJson4.effect_entries[0]
              ? movimentosJson4.effect_entries[0].effect
              : "Não há"
          }</p>
                            <p><strong><em>Movimento 5:</em></strong> ${
                              movimentosJson5.accuracy
                            }<strong><em>% de precisão,</em></strong> <strong><em>efeito do movimento:</em></strong> ${
            movimentosJson5.effect_entries[0]
              ? movimentosJson5.effect_entries[0].effect
              : "Não há"
          }</p>
                            <p><strong><em>Método de aprendizagem do movimento 1:</em></strong> ${
                              dados.moves[0]
                                ? dados.moves[0].version_group_details[0]
                                    ?.move_learn_method.name
                                : "Não há"
                            }</p>
                            <p><strong><em>Método de aprendizagem do movimento 2:</em></strong> ${
                              dados.moves[0]
                                ? dados.moves[0].version_group_details[1]
                                    ?.move_learn_method.name
                                : "Não há"
                            }</p>
                            <p><strong><em>Método de aprendizagem do movimento 3:</em></strong> ${
                              dados.moves[0]
                                ? dados.moves[0].version_group_details[2]
                                    ?.move_learn_method.name
                                : "Não há"
                            },</p>
                            <p><strong><em>Método de aprendizagem do movimento 4:</em></strong> ${
                              dados.moves[0]
                                ? dados.moves[0].version_group_details[3]
                                    ?.move_learn_method.name
                                : "Não há"
                            },</p>
                            <p><strong><em>Método de aprendizagem do movimento 5:</em></strong> ${
                              dados.moves[0]
                                ? dados.moves[0].version_group_details[4]
                                    ?.move_learn_method.name
                                : "Não há"
                            },</p>
                        </div>
                            <div id="button_info">
                                <button class="buttonfechar">Fechar</button>
                            </div>
                        </div>
                    `
        );

        const buttonFechar = document.querySelector(".buttonfechar");
        buttonFechar.addEventListener("click", () => {
          const modal = document.querySelector("#modal");
          if (modal) modal.remove();
        });
      }
    });
  }
  atualizarFavoritos();
}

function VerificarLogado() {
  const Islogged = JSON.parse(localStorage.getItem("Islogged"));
  const botaoLoginHome = document.querySelector(".botaoLoginHome");
  const botaoCadastroHome = document.querySelector(".botaoCadastroHome");
  const imgCadastro = document.getElementById("imgCadastrar")
  const Pokemons = document.querySelector(".pokemons")
  const logo = document.querySelector(".logo")
  const botaoCell = document.querySelector(".homeButton")
  const ListaFav = document.querySelector(".lista")
  console.log(Islogged);
  if (!Islogged) {
    Pokemons.remove() 
    botaoCell.remove()
    logo.remove()
    ListaFav.remove()
    document.body.insertAdjacentHTML(
      "beforeend",
      `
      <div class="toast_autenticado">
      <div id="danger">
      <img src="./imagens/fluent-emoji-flat--warning.svg" class="danger">
      </div>
      <p class="Autenticado">Usuário não autenticado, cadastre-se para poder ter acesso aos pokémons</p>
      </div>
      `
    );
  } else {
    botaoLoginHome.remove();
    botaoCadastroHome.removeAttribute("href");
    imgCadastro.src = "./imagens/grommet-icons--logout.svg";
    botaoCadastroHome.addEventListener("click", () => {
      localStorage.removeItem("Islogged");
      localStorage.removeItem("userId");
      location.href = "/";
    });
  }
}
VerificarLogado();

async function pegarFavoritos() {
  const userId = localStorage.getItem("userId");
  const favoritos = await fetch(
    `http://localhost:3001/pokemon/?userId=${userId}`
  );
  const favoritosRes = await favoritos.json();
  const imgBotaoFav = document.getElementById("FavoritoImg")
  const BotaoFavs = document.querySelector(".botaoFavoritoLista");
  BotaoFavs.addEventListener("click", () => {
  const ul = document.querySelector(".ListaPokemonsFavoritados");
  imgBotaoFav.src = "./imagens/downloadpoke.png"  

    if (ul) {
      ul.remove();
    } else {
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
      
      imgBotaoFav.src = "./imagens/tabler--pokeball-off.svg";
      const ul = document.querySelector(".ListaPokemonsFavoritados");

      for (const PokeFavorito of favoritosRes) {
          ul.insertAdjacentHTML(
            "beforeend",
            `
        <li class="PokemonsFavoritados" style="background-color: ${PokeFavorito.color}">
          <p class="nomePoke" id="${PokeFavorito.name}fav" >${PokeFavorito.name}</p>
          <img src="${PokeFavorito.img}">
        </li>
      `
          );
        // const botaoRemove = document.getElementById(`${PokeFavorito.name}fav`)
        // botaoRemove.addEventListener("click", async()=>{

        //   const idFav = botaoRemove.getAttribute("data-remove")
        //   console.log(idFav,"fav id")
        //   img.src = "./Botaofav/botaofav.png";
        //   await fetch(
        //     `http://localhost:3001/pokemon/${idFav}`,
        //     {
        //       method: "DELETE",
        //       headers: {
        //         "Content-Type": "application/json; charset=utf-8",
        //       },
        //     }
        //   );
        // })
            // botaoRemove.removeAttribute("data-fav")
      }
    }
    atualizarFavoritos();
  });
}
pegarFavoritos();

async function atualizarFavoritos() {
  const userId = localStorage.getItem("userId");
  const favoritos = await fetch(
    `http://localhost:3001/pokemon/?userId=${userId}`
  );
  const favoritosRes = await favoritos.json();
  const imgBotaoFav = document.getElementById("FavoritoImg")
  const BotaoFavs = document.querySelector(".botaoFavoritoLista");
  BotaoFavs.addEventListener("click", () => {
  const ul = document.querySelector(".ListaPokemonsFavoritados");
  imgBotaoFav.src = "./imagens/downloadpoke.png"  
    if (ul) {
      ul.remove();
    } else {
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
      imgBotaoFav.src = "./imagens/tabler--pokeball-off.svg"
      const ul = document.querySelector(".ListaPokemonsFavoritados");

      for (const PokeFavorito of favoritosRes) {
        ul.insertAdjacentHTML(
          "beforeend",
          `
        <li class="PokemonsFavoritados" style="background-color: ${PokeFavorito.color}">
        <button id="${PokeFavorito.name}fav" class="removerFavorito">X</button>
          <p class="nomePoke">${PokeFavorito.name}</p>
          <img class="imgFav" src="${PokeFavorito.img}">
        </li>
      `
          );
        // const img = document.querySelector("imgFav")
        // const botaoRemove = document.getElementById(`${PokeFavorito.name}fav`)
        // botaoRemove.addEventListener("click", async()=>{

        //   const idFav = botaoRemove.getAttribute("data-remove")
        //   console.log(idFav,"fav id")
        //   img.src = "./Botaofav/botaofav.svg";
        //   await fetch(
        //     `http://localhost:3001/pokemon/${idFav}`,
        //     {
        //       method: "DELETE",
        //       headers: {
        //         "Content-Type": "application/json; charset=utf-8",
        //       },
        //     }
        //   );
        // })
        //     botaoRemove.removeAttribute("data-fav")
      }
    }
  });
}



// arrumar que quando atualiza a página sai o botao de favorito (fazer uma comparação entre minha api de favoritos
// e a listagem de pokémons que estão na tela) perguntar pro chat

