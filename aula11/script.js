let offset = 0;
let favoritos = [];
async function pegarPokemons() {
  const pokemons = await fetch("https://pokeapi.co/api/v2/pokemon/", {
    headers: {
      Accept: "application/json",
    },
  });

  const pokemonRes = await pokemons.json();
  const listaPokemon = pokemonRes.results;
  const ul = document.querySelector("ul");

  for (const item of listaPokemon) {
    // listaPokemon.forEach((item)=>{

    setTimeout(async () => {
      const data = await fetch(item.url);
      const dados = await data.json();

      ul.insertAdjacentHTML(
        "beforeend",
        `
            <li id="${item.name}">
            <div class="botaoFavorito">
            <button id="${item.name}fav" class="Estrela">★</button>
            </div>
                <p class="nomePoke">${item.name}</p>
                <img src="${dados.sprites.front_default}" alt="Imagem pokémon">
                <button class="info">Mais informações</button> 
            </li>
            
        `
      );
      async function PokemonAdd() {
        const UserId = localStorage.getItem("userId");
        const botaoAdd = document.getElementById(`${item.name}fav`);
        botaoAdd.addEventListener("click", async () => {
          console.log(item.name);
          const Pokemon = {
            // --- quando clicar no botao de favoritar, colocar na api "pokemon" o pokemon que favoritou,
            // depois disso, pegar do api as informações e colocar dentro do lista que é criada quando abre o botao de favoritos

            name: item.name,
            img: dados.sprites.front_default,
            userId: UserId,
          };
          const Favoritos = await fetch("http://localhost:3001/pokemon", {
            body: JSON.stringify(Pokemon),
            method: "POST",
            headers: {
              "Content-Type": "application/json; charset=utf-8",
            },
          });

          console.log(Favoritos);

          console.log(Pokemon);
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
                          dados.abilities[0].ability.name
                        }
                        </p>

                        <p>
                        <strong><em>Efeito:</em></strong> 
                        ${habilidadesJson.effect_entries[0].effect}
                        </p>

                        <p>
                        <strong><em>Efeito rápido:</em></strong> 
                        ${habilidadesJson.effect_entries[0].short_effect}
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
    `https://pokeapi.co/api/v2/pokemon?offset=${offset}`,
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
          <li id="${item.name}">
            <div class="botaoFavorito">
          <button id="${item.name}fav" class="Estrela">★</button>
            </div>
                <p class="nomePoke">${item.name}</p>
                <img src="${dados.sprites.front_default}" alt="Imagem pokémon">
                <button class="info">Mais informações</button> 
            </li>
            
        `
    );
    const botaoAdd = document.getElementById(`${item.name}fav`);
    botaoAdd.addEventListener("click", () => {
      console.log(item.name);
    });

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
}

function VerificarLogado() {
  const Islogged = JSON.parse(localStorage.getItem("Islogged"));
  const botaoLoginHome = document.querySelector(".botaoLoginHome");
  const botaoCadastroHome = document.querySelector(".botaoCadastroHome");
  console.log(Islogged);
  if (!Islogged) {
    document.body.insertAdjacentHTML(
      "beforeend",
      `
      <div class="toast_autenticado">
      <div id="danger">
      <img src="fluent-emoji-flat--warning.svg" class="danger">
      </div>
      <p class="Autenticado">Usuário não autenticado, cadastre-se para poder ter acesso aos pokémons</p>
      </div>
      `
    );
  } else {
    botaoLoginHome.remove();
    botaoCadastroHome.removeAttribute("href");
    botaoCadastroHome.innerHTML = "Usuario cadastrado";
  }
}
VerificarLogado();

async function pegarFavoritos() {
  const favoritos = await fetch("http://localhost:3001/pokemon");
  const favoritosRes = await favoritos.json();

  const BotaoFavs = document.querySelector(".botaoFavoritoLista");
  BotaoFavs.addEventListener("click", () => {
    const ul = document.querySelector(".ListaPokemonsFavoritados");
    BotaoFavs.innerHTML = "Pokémons Favoritados";
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
      BotaoFavs.innerHTML = "Fechar Favoritos";
      const ul = document.querySelector(".ListaPokemonsFavoritados");
      for (const PokeFavorito of favoritosRes) {
        setTimeout(async () => {
          const imagem = await fetch(PokeFavorito.img);
          const imagemRes = imagem.url;

          console.log(imagemRes);

          ul.insertAdjacentHTML(
            "beforeend",
            `
        <li class="PokemonsFavoritados">
          <button class="removerFavorito">X</button>
          <p>${PokeFavorito.name}</p>
          <img src="${PokeFavorito.img}">
        </li>
      `
          );
        }, 0);

        console.log(PokeFavorito.name);
      }
    }
  });
}

pegarFavoritos();

// ver sobre atualizar a lista de favoritos quando abrir, melhorar um pouco o css e fazer um botão de sair para deslogar
// que é preciso tirar o meu obj do localstorage chamado de islogged quando clicar no botao de sair, fazer modal de avisos
// ver pra tentar arrumar fazendo um tratamento de errado para só ter um pokemon de cada nos favoritos, da pra fazer
// que quando clique no mesmo botao de add nos favoritos, dê erro.

