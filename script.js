const BASE_URL = "https://pokeapi.co/api/v2";
//----elements----
const form = document.getElementById("search-form");
const input = document.getElementById("search-input");
const statusEl = document.getElementById("status");
const cardEl = document.getElementById("pokemon-card");
const teamEl = document.getElementById("team");
//-----functions-----

const renderPokemon = (pokemon) => {
   
    cardEl.replaceChildren(); 
    const name = document.createElement("p");
    const id = document.createElement("p");
    const sprite = document.createElement("img");
    const types = document.createElement("p");
    const height = document.createElement("p");
    const weight = document.createElement("p");
    const stats = document.createElement("p");
   
   
    sprite.src = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/${pokemon.id}.png`
    console.log(sprite); 
    sprite.width = 160;
    sprite.height = 120; 
    sprite.alt = `${pokemon.name}`; 
    const pokename = pokemon.name; 

    name.textContent = pokename.charAt(0).toUpperCase() + pokename.slice(1); 
    id.textContent = `Id: ${pokemon.id}`; 
    // types.textContent = getTypes(pokemon.types); 
    const allTypes = pokemon.types.map(u => u.type);
   
    types.textContent = `Types: ${allTypes.map(n => n.name)}`;
    
    height.textContent = `Height: ${pokemon.height / 10} Meters`;
    weight.textContent = `Weight: ${pokemon.weight / 10} Kilograms`; 
    
    const statsObj = pokemon.stats.map(u => u.stat.name + ": " + u.base_stat); 
    console.log(statsObj);
    const stringVer = statsObj; 
    stats.textContent = stringVer; 
    console.log(stats); 
    

    cardEl.appendChild(name);
    cardEl.appendChild(id); 
    cardEl.appendChild(sprite); 
    cardEl.appendChild(types); 
    cardEl.appendChild(height); 
    cardEl.appendChild(weight); 
    cardEl.appendChild(stats); 

    statusEl.textContent = ""; 

form.appendChild(statusEl); 
    
}

const errorMessage = () => {
    statusEl.replaceChildren(); 
  
    statusEl.textContent = "Failed to input valid pokemon"; 
    form.appendChild(statusEl); 
}

// const getTypes = (types) => {
//     let value = ""; 
//     for(let i = 0; i < types.length; i++){
//         value += types[i]; 
//         if(i < types.length - 1 ){
//             value += ", "
//         }
//     }
//     console.log(value); 
//     return value; 
// }

async function getPokemon(nameOrId) {
    nameOrId.preventDefault();
    const pokemon = input.value.trim();
    const response = await fetch(`${BASE_URL}/pokemon/${pokemon}`);
    
    const result = await response.json();
    console.log(result.name + result.id);
    if(response.ok ){
    renderPokemon(result);
    }
    else{
        errorMessage(); 
    }
}

//-----Listeners-----
form.addEventListener("submit", getPokemon);

//----Run at Start----
statusEl.textContent = "No Pokemon has been input"; 
statusEl.classList.add("empty"); 
form.appendChild(statusEl); 