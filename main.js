const typeTranslations = {
  normal: "Normal",
  fighting: "Lutador",
  flying: "Voador",
  poison: "Venenoso",
  ground: "Terrestre",
  rock: "Pedra",
  bug: "Inseto",
  ghost: "Fantasma",
  steel: "Metálico",
  fire: "Fogo",
  water: "Água",
  grass: "Grama",
  electric: "Elétrico",
  psychic: "Psíquico",
  ice: "Gelo",
  dragon: "Dragão",
  dark: "Sombrio",
  fairy: "Fada",
};

const contpoke = 151
const url = 'https://pokeapi.co/api/v2/pokemon?limit='+contpoke+'' 
let cont = 0 

function gpoke(url) {
    return fetch(url)
        .then((data) => data.json()) 
}
async function dpoke(url) { 
    const epoke = await gpoke(url) 
    const results = epoke.results[cont].url 
    return fetch(results)
        .then((data) => data.json()) 
}

async function dadospoke() {
    while (cont < contpoke) {
        let ggpoke = await dpoke(url)

        function PokemonId(idpoke) {
            if (idpoke < 10) {
              return '#00'+idpoke;
            } else if (idpoke < 100) {
              return '#0'+idpoke;
            } else if (idpoke < 1000) {
                return '#'+idpoke;
            } else {
              return idpoke;
            }
          }
          
        const chamartype = ggpoke.types
        const pokemonId = ggpoke.id;
        const paddedPokemonId = PokemonId(pokemonId);
        const namepoke = ggpoke.name; 
        const idpoke = ggpoke.id;
        const hppoke = ggpoke.stats[0].base_stat+' HP'
        const atkpoke = ggpoke.stats[2].base_stat+' Atk'
        const altura = ggpoke.height
        const peso = ggpoke.weight
        const defpoke = ggpoke.stats[3].base_stat+' Def'
        const gifpoke = 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/'+idpoke+'.gif' // pegando uma foto animada dos pokemon, dentro do pokeapi

        const card = document.querySelector('.poke');
        card.innerHTML += `
        <div class="cardbox">
        <p class="idd">${paddedPokemonId}</p>
        <div class="cardbox2">
          <img src=${gifpoke}>
          <p class="nome">${namepoke}</p>
          <p class="atk">${atkpoke}</p>
          <p class="def">${defpoke}</p>
          <p class="hp">${hppoke}</p>
          <div class="cardbox3${cont}">
        <div class="pa">
        <p>${peso / 10 + ' Kg'}</p>
        <p>${altura / 10 + ' M'}</p>
        </div>
          </div>
        </div>
      </div>
        `
        
        let conttipo = 0
        while(conttipo < chamartype.length) {
          const ctype = ggpoke.types[conttipo].type.name
          const cctype = document.querySelector('.cardbox3' + cont)
          cctype.innerHTML += `
            <div class="cardbox4">
            <p class="pd" >${ctype}</p>
            </div>
            `
          conttipo++ 
        }
        cont++
    }
}
dadospoke()