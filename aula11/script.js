async function pegarPokemons() {
    const pokemons = await fetch("https://pokeapi.co/api/v2/pokemon/", {
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
                console.log(habilidades)
                const habilidadesJson = await habilidades.json()
                console.log(habilidadesJson.effect_entries[0].effect)

                document.body.insertAdjacentHTML("beforeend", `
                    <div id="modal"> 
                        <p class="nomePokeInfo">${item.name}</p>
                        <p class="habilidadePoke"><strong><em>Habilidade:</em></strong> ${dados.abilities[0].ability.name}</p>
                        <p class="habilidadeEfeito"><strong><em>Efeito:</em></strong> ${habilidadesJson.effect_entries[0].effect}</p>
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
                        <p>teste</p>
                        <p>teste</p>
                        <p>teste</p>
                        <p>teste</p>
                        <p>teste</p>
                        <p>teste</p>
                        <p>teste</p>
                        


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