
// Funcao que tras os dados do ibge
function populateUFs() {
    const ufselect = document.querySelector('.uf')
    console.log(ufselect)

    fetch('https://servicodados.ibge.gov.br/api/v1/localidades/estados')
    .then((response) => {
        return response.json()
    }).then((states) => {
        // Fazendo um for dos esatdos
        for(let state of states){
            ufselect.innerHTML += `<option value='${state.id}'> ${state.nome} </option`
        }
        
    })
}

populateUFs()

// Funcao para pegar as cidades e habilitar o campo

function getCities(event) {
    const citySelect = document.querySelector('.city')
    const stateInput = document.querySelector('.inputSate')

    const ufValue = event.target.value

    const indexSelected = event.target.selectedIndex
    stateInput.value = event.target.options[indexSelected].text
                
    const url = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${ufValue}/municipios
    `


    fetch(url)
    .then((response) => {
        return response.json()
    }).then((cities) => {
        for(let city of cities) {
            citySelect.innerHTML += `<option value='${city.id}'> ${city.nome} </option`
        }

        citySelect.disabled = false
    })
}


// Selecionando o input do select de estado
document
.querySelector('.uf')
.addEventListener('change', getCities)