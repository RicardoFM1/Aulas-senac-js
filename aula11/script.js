async function pegarPokemons() {
    const pokemons = await fetch("https://pokeapi.co/api/v2/pokemon/?offset=20&limit=20", {
        headers: {
            'Accept': "application/json"
        }
    });

    const pokemonRes = await pokemons.json();
    const listaPokemon = pokemonRes.results;
    const ul = document.querySelector("ul");

    for (const item of listaPokemon) {
        const data = await fetch(item.url);     
        const dados = await data.json();

        ul.insertAdjacentHTML("beforeend", `
            <li id="${item.name}">
                <p class="nomePoke">${item.name}</p>
                <img src="${dados.sprites.front_shiny}">
                <button class="info">Mais informações</button> 
            </li>
        `);

        const buttonInfo = document.getElementById(item.name);
        const button = buttonInfo.querySelector(".info");

        button.addEventListener("click", async () => {
             
            if (document.querySelector("#modal")) {
                modal.remove();
            } else {
                
                const habilidades = await fetch(dados.abilities[0].ability.url)
                const habilidades2 = await fetch(dados.abilities[1].ability.url)
                const Locais = await fetch(dados.location_area_encounters)
                console.log(habilidades)
                console.log(habilidades2)
                console.log(Locais)
                const habilidadesJson = await habilidades.json()
                const habilidades2Json = await habilidades2.json()
                const localJson = await Locais.json()
                console.log(habilidadesJson.effect_entries[0].effect)
                console.log(habilidades2Json.effect_entries[0].effect)
                

                document.body.insertAdjacentHTML("beforeend", `
                    <div id="modal"> 
                    <div class="informacoesPoke">
                        <h1>${item.name}</h1>
                        <p><strong><em>Habilidade:</em></strong> ${dados.abilities[0].ability.name}</p>
                        <p><strong><em>Efeito:</em></strong> ${habilidadesJson.effect_entries[0].effect}</p>
                        <p><strong><em>Efeito rápido:</em></strong> ${habilidadesJson.effect_entries[0].short_effect}</p>
                        <p><strong><em>Habilidade:</em></strong> ${dados.abilities[1].ability.name}</p>
                        <p><strong><em>Efeito:</em></strong> ${habilidades2Json.effect_entries[0].effect}</p>
                        <p><strong><em>Efeito rápido:</em></strong> ${habilidades2Json.effect_entries[0].short_effect}</p>
                        <p><strong><em>Experiência base:</em></strong> ${dados.base_experience}</p>
                        <p><strong><em>índice do jogo:</em></strong> ${dados.game_indices[0].game_index}</p>
                        <p><strong><em>Onde encontrar:</em></strong> ${localJson[0].location_area.name}, <strong><em>chance de encontrar:</em></strong> ${localJson[0].version_details[0].encounter_details[0].chance}%,
                        <strong><em>Nível máximo:</em></strong> ${localJson[0].version_details[0].encounter_details[0].max_level},  <strong><em>método:</em></strong> ${localJson[0].version_details[0].encounter_details[0].method.name}, 
                        <strong><em>Nível mínimo:</em></strong> ${localJson[0].version_details[0].encounter_details[0].min_level}</p>
                        <p>teste</p>
                        <p>teste</p>
                        <p>teste</p>
                        <p>teste</p>
                        <p>teste</p>
                        <p>teste</p>
                        <p>teste</p>
                        <p>teste</p>
                        <p>teste</p>
                        <p>teste</p>
                        <p>teste</p>
                        <p>teste</p>
                        <p>teste</p>
                        <p>teste</p>
                        <p>teste</p>
                        <p>teste</p>
                        <p>teste</p>
                        <p>teste</p>
                        <p>teste</p>
                        <p>teste</p>
                        <p>teste</p>
                        <p>teste</p>
                        <p>teste</p>
                        <p>teste</p>
                        <p>teste</p>
                        <p>teste</p>
                        <p>teste</p>
                    </div>
                        <div id="button_info">
                            <button class="buttonfechar">Fechar</button>
                        </div>
                    </div>
                `);

                
                const buttonFechar = document.querySelector(".buttonfechar");
                buttonFechar.addEventListener("click", () => {
                    const modal = document.querySelector("#modal");
                    if (modal) modal.remove();
                });
            }
        });
    }
}

pegarPokemons();