const BASE_URL = "https://pokeapi.co/api/v2";
//----elements----
const form = document.getElementById("search-form");
const input = document.getElementById("search-input");
const statusEl = document.getElementById("status");
const cardEl = document.getElementById("pokemon-card");
const teamEl = document.getElementById("team");
//-----functions-----

async function getPokemon(nameOrId){
    nameOrId.preventDefault(); 
    const pokemon = input.value.trim().toLower(); 
    const response = await fetch(`${BASE_URL}/pokemon/${pokemon}`);
    const result = await response.json(); 
    console.log(result.name + result.id);
}

//-----Listeners-----
form.addEventListener("submit", getPokemon); 

//----Run at Start----