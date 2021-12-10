
const ul = document.querySelector(".containerListaProdutos ul")
const spanPrice = document.getElementById("precoTotal")
const ulCarrinho = document.querySelector(".ulCarrinho")
console.log(ulCarrinho)


// Função criar template vitrine
function montarListaProdutos(produto) {
    const {id} = produto

    const li = document.createElement("li")
    const img = document.createElement("img")
    const h3Nome = document.createElement("h3Nome")
    const p = document.createElement("p")
    const spanSecao = document.createElement("spanSecao")
    const buttonAdd = document.createElement("button")
    const ol = document.createElement("ol")

    img.src = produto.img
    img.alt = produto.nome
    h3Nome.innerText = produto.nome
    p.innerText = produto.preco
    spanSecao.innerText = produto.secao

    buttonAdd.innerText = "Adicionar ao Carrinho"
    buttonAdd.classList.add("estiloGeralBotoes", "estiloGeralBotoes--addCarrinho")
    buttonAdd.setAttribute("data-id", id)
    console.log(produto.componentes)

    li.appendChild(img)
    li.appendChild(h3Nome)
    li.appendChild(p)
    li.appendChild(spanSecao)
    li.appendChild(ol)

    produto.componentes.forEach((componente) => {
        const liComponentes = document.createElement('li')
        liComponentes.innerText = componente
        ol.appendChild(liComponentes)
    })
    li.appendChild(buttonAdd)

    ul.appendChild(li) 
}

        

        

// Função criar template carrinho
function montarListaProdutosCarrinho(produto) {

    const li = document.createElement("li")
    const img = document.createElement("img")
    const h3Nome = document.createElement("h3Nome")
    const p = document.createElement("p")
    const spanSecao = document.createElement("spanSecao")

    img.src = produto.img
    img.alt = produto.nome
    h3Nome.innerText = produto.nome
    p.innerText = produto.preco
    spanSecao.innerText = produto.secao

    li.appendChild(img)
    li.appendChild(h3Nome)
    li.appendChild(p)
    li.appendChild(spanSecao)

    ulCarrinho.appendChild(li)   

}
  
// Listar produtos no carrinho
function listarProdutosCarrinho(listaProdutos){
    listaProdutos.forEach(produto => {
        montarListaProdutosCarrinho(produto)
    })
}

// Listar produtos na vitrine
function listarProdutos(listaProdutos){
    ul.innerHTML = ""
    listaProdutos.forEach(produto => {
        montarListaProdutos(produto)
    })
}
listarProdutos(produtos)

//Interceptar click
ul.addEventListener("click", interceptarClick)
function interceptarClick(event){
    const botaoClick = event.target
    if(botaoClick.tagName === "BUTTON"){
        const idProduto = botaoClick.getAttribute("data-id")
        addCarrinho(idProduto)
    }
}

// Função adicionar no carrinho
const arrayProdutos = []

function addCarrinho(idDoProduto){
    ulCarrinho.innerHTML = ""
    const produtoSelecionado = produtos.find((produto) => {
        return produto.id == idDoProduto
    })
    arrayProdutos.push(produtoSelecionado)
    listarProdutosCarrinho(arrayProdutos, montarListaProdutosCarrinho, ulCarrinho)

    valorTotal(arrayProdutos)
    console.log(arrayProdutos)
}



// Função que retorna somente o elemento buscado
function mostrarBusca(){
    let captura = document.querySelector(".campoBuscaPorNome").value

    const listaBusca = produtos.filter((produto) => {
        // Busca por categoria
        if(captura === produto.categoria.toUpperCase()){
            return produto.categoria 
        } else if(captura === produto.categoria.toLowerCase()){
            return produto.categoria 
        } else if(captura === produto.categoria){
            return produto.categoria 
        } 

        // Busca por seção
        if(captura === produto.secao.toUpperCase()){
            return produto.secao 
        } else if(captura === produto.secao.toLowerCase()){
            return produto.secao 
        } else if(captura === produto.secao){
            return produto.secao 
        } 
        
        // Busca por nome
        if(captura === produto.nome.toUpperCase()){
            return produto.nome 
        } else if(captura === produto.nome.toLowerCase()){
            return produto.nome 
        } else if(captura === produto.nome){
            return produto.nome 
        } 
    })

    listarProdutos(listaBusca)
}
const botaoBusca = document.querySelector(".estiloGeralBotoes--botaoBuscaPorNome")
botaoBusca.addEventListener("click", mostrarBusca)
    

// Função que retorna todos os elementos 
function mostrarTodos(){
    const listaTodos = produtos.filter((produto) => {
        return produto.secao === "Hortifruti", "Pão", "Leite"
    })
    listarProdutos(listaTodos)
}
const botaoTodos = document.querySelector(".estiloGeralBotoes--mostrarTodos")
botaoTodos.addEventListener("click", mostrarTodos)


// Função que retorna apenas os elementos "Hortifruti"
function filtrarPorHortifruti(){
    const listaHortifruti = produtos.filter((produto) => {
        return produto.secao === "Hortifruti"
    })

    listarProdutos(listaHortifruti)
}
const botaoMostrarHortifruti = document.querySelector(".estiloGeralBotoes--filtrarHortifruti")
botaoMostrarHortifruti.addEventListener("click", filtrarPorHortifruti)


// Função que retorna o preço total dos elementos listados
const precoTotal = document.getElementById("precoTotal")

function valorTotal(produto){
    let total = 0
    for(let i = 0; i < produto.length; i++){
        if(produto.length === 1){
            total = produto[i].preco.valueOf()
        } else{
            total += Number(produto[i].preco.valueOf())
            console.log(total)
        }
    }
    return precoTotal.innerText = total
}


