//EX2 - Valendo ponto

//Utilizar uma API de buscar os estados do Brasil.

//Após selecionar o estado em um SELECT OPTION, mostrar todas as cidades daquele estado.

//Enviar o link do github.

async function getEstado(){

// funções async/await:
// simplificar o uso de forma síncrona das Promises;
// executar alguns procedimentos em um grupo de Promises;

    const nome_estados = document.getElementById("estados").value.toLowerCase();
    const url = `https://servicodados.ibge.gov.br/api/v1/localidades/estados${nome_estados}`;

//`${}` == f"{}"
// `` == formata (f)
//${} == chama a variavel

    try{
        const response = await fetch(url);
        if(!response.ok) {
            throw new Error("Estado não encontrado.");
        }
        const estados = await response.json();
        const selecionar_estados = document.getElementById("estados");

        selecionar_estados.innerHTML = '<option value="">Selecione um estado</option>'; // Limpa o select antes de adicionar novos estados

        estados.forEach(estado => {
            const option = document.createElement("option");
            option.value = estado.sigla; // Sigla do estado (por exemplo, "SP", "RJ")
            option.textContent = estado.nome; // Nome do estado (por exemplo, "São Paulo", "Rio de Janeiro")
            selecionar_estados.appendChild(option);
        });
    } catch (error){
        document.getElementById("informacoes").innerHTML = `<p>${error.message}</p>`
    }
}

//function displayEstados(cidades){
    //const estados_info = `<h2>${cidades.name.toUpperCase()}</h2>`;
    //document.getElementById("estados_info").innerHTML = estados_info;
//}

async function getCidades() {
    const nome_cidades = document.getElementById("estados").value;

    if (!nome_cidades) {
        return; // Caso nenhum estado esteja selecionado, não faz a busca
    }

    const url = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${nome_cidades}/municipios`;
    try{
        const response = await fetch(url);
        if(!response.ok) {
            throw new Error("Cidade não encontradas.");
        }
        const cidades = await response.json();
        const cidadesSelect = document.getElementById("cidades");
    
        cidadesSelect.innerHTML = '<option value="">Selecione uma cidade</option>'; // Limpa as cidades anteriores
    
        cidades.forEach(cidade => {
            const option = document.createElement("option");
            option.value = cidade.id;
            option.textContent = cidade.nome; 
            cidadesSelect.appendChild(option); 
        });
    } catch (error){
        document.getElementById("informacoes").innerHTML = `<p>${error.message}</p>`
    }
}

// Carregar os estados ao carregar a página
window.onload = getEstado;