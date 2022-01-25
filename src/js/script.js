const ul = document.querySelector(".containerListaProdutos ul")
const ulCarrinho = document.querySelector(".ulCarrinho")

function montarListaProdutos(listaProdutos){
    ul.innerText = ""
    listaProdutos.forEach((produto) => {
        // Crie os elementos
        const {id} = produto
        console.log(id)
        const li = document.createElement("li")
        const img = document.createElement("img")
        const h3 = document.createElement("h3")
        const p = document.createElement("p")
        const span = document.createElement("span")
        const buttonAdd = document.createElement("button")
        
        // Atribua dados aos elementos
        img.src = produto.img
        img.alt = produto.nome
        h3.innerText = produto.nome
        p.innerText = produto.preco
        span.innerText = produto.secao
        buttonAdd.innerText = "Adicionar ao Carrinho"
        buttonAdd.setAttribute("data-id", id)
        span.classList.add("teste")

        // Atribua os dados do array aos elementos
        const ol = document.createElement("ol")
        for(let item in produto.componentes){
            const li2 = document.createElement("li")
            li2.innerText = produto.componentes[item]
            ol.appendChild(li2)
        }

        // Adicione os elementos a li
        li.appendChild(img)
        li.appendChild(h3)
        li.appendChild(p)
        li.appendChild(span)
        li.appendChild(ol)
        li.appendChild(buttonAdd)

        // Adicione os elementos ao html
        ul.appendChild(li)
    })
}

// Liste os produtos no carrinho após receberem o click
function montarListaCarrinho(dadosProdutos){
    dadosProdutos.forEach((produto) => {
        const {id, nome, preco, secao, img} = produto 
        const li2 = document.createElement("li")
        const img2 = document.createElement("img")
        const h3 = document.createElement("h3")
        const p = document.createElement("p")
        const span = document.createElement("span")

        img2.src = img
        img.alt = nome
        h3.innerText = nome
        p.innerText = preco
        span.innerText = secao

        li2.appendChild(img2)
        li2.appendChild(h3)
        li2.appendChild(p)
        li2.appendChild(span)

        ulCarrinho.appendChild(li2)
    })
}

// montarListaProdutos(produtos)
function filtrarPorHortifruti(){
    const listaHorti = produtos.filter((current, index, array) => {
        return current.secao === "Hortifruti"
    })
    montarListaProdutos(listaHorti)
}

const buttonHorti = document.querySelector(".estiloGeralBotoes--filtrarHortifruti")

buttonHorti.addEventListener("click", filtrarPorHortifruti)

// Mostre todos os produtos quando o botão "mostrar todos" for clicado
const filtroMostrarTodos = () => {
    const mostrarTudo = produtos.filter((current) => {
        return current
    })
    montarListaProdutos(mostrarTudo)
}

const buttonMostrarTodos = document.querySelector(".estiloGeralBotoes--mostrarTodos")
buttonMostrarTodos.addEventListener("click", filtroMostrarTodos)

// Mostre os resultados do campo de busca
const inputValue = document.querySelector(".campoBuscaPorNome")

const mostrarBusca = () => {
    const buscaInput = inputValue.value
    console.log(buscaInput.toLowerCase())
    const filter = produtos.filter((current, index, array) => {
        if(buscaInput.toLowerCase() == current.nome.toLowerCase()){
            return current.nome.toLowerCase() == buscaInput.toLowerCase()
        } else if(buscaInput.toLowerCase() == current.secao.toLocaleLowerCase()){
            return current.secao.toLocaleLowerCase() == buscaInput.toLowerCase()
        } else if(buscaInput.toLowerCase() == current.categoria.toLocaleLowerCase()){
            return current.categoria.toLocaleLowerCase() == buscaInput.toLowerCase()
        }
    })
    montarListaProdutos(filter)
}

const ButtonBuscaNome = document.querySelector(".estiloGeralBotoes--botaoBuscaPorNome")
ButtonBuscaNome.addEventListener("click", mostrarBusca)

// Calcule o preço total dos itens mostrados na tela e retorne o total
const spanPrice = document.querySelector("#precoTotal")

const calculoTotal = (objetoDados) => {
    let resultado = 0
    const filter = objetoDados.find((current, index, array) => {
        resultado += Number(current.preco)
    })
    spanPrice.innerText = resultado
}

// Adicione os produtos ao carrinho após o click

const arrayCarrinho = []
function addCarrinho(idProduto){
    ulCarrinho.innerHTML = ""
    const findProduct = produtos.find((current) => {
        return current.id == idProduto
    })
    arrayCarrinho.push(findProduct)
    montarListaCarrinho(arrayCarrinho)
    calculoTotal(arrayCarrinho)
    console.log(arrayCarrinho)
    
}

// ulCarrinho.appendChild()

function cliquei(evt){
    const click = evt.target
    if(click.tagName === "BUTTON"){
        console.log("cliquei")
        const idProduto = click.getAttribute("data-id")
        addCarrinho(idProduto)
        console.log(idProduto)
    }


}

ul.addEventListener("click", cliquei)