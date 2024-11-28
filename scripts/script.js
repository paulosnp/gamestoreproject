// carrinho.js

// Variável para armazenar os itens do carrinho
let carrinho = [];

// Função para adicionar um produto ao carrinho
function adicionarAoCarrinho(nome, preco) {
    // Verifica se o produto já está no carrinho
    const produtoExistente = carrinho.find(produto => produto.nome === nome);
    
    if (produtoExistente) {
        // Se o produto já existir, não adiciona novamente
        alert(`${nome} já está no carrinho.`);
    } else {
        // Adiciona o produto ao carrinho
        carrinho.push({ nome: nome, preco: preco });

        // Atualiza a quantidade de itens no carrinho
        atualizarQuantidadeCarrinho();

        // Salva o carrinho no localStorage
        localStorage.setItem('carrinho', JSON.stringify(carrinho));
    }
}

// Função para atualizar a quantidade de itens no carrinho na navbar
function atualizarQuantidadeCarrinho() {
    const quantidadeCarrinho = carrinho.length;
    const badgeCarrinho = document.querySelector('.badge');

    if (badgeCarrinho) {
        badgeCarrinho.textContent = quantidadeCarrinho;
    }
}

// Função para carregar o carrinho do localStorage ao abrir o carrinho.html
window.onload = function() {
    const carrinhoSalvo = JSON.parse(localStorage.getItem('carrinho')) || [];
    carrinho = carrinhoSalvo;
    atualizarQuantidadeCarrinho();
    exibirCarrinho();
};

// Função para exibir os produtos no carrinho
function exibirCarrinho() {
    const carrinhoContainer = document.querySelector('.carrinho-container .row .col-md-8');
    carrinhoContainer.innerHTML = ''; // Limpa o conteúdo atual

    carrinho.forEach(produto => {
        const produtoCard = `
            <div class="card mb-3" id="produto-${produto.nome}">
                <div class="card-body">
                    <h5 class="card-title">${produto.nome}</h5>
                    <p class="card-text"><strong>Preço: R$ ${produto.preco.toFixed(2)}</strong></p>
                    <button class="btn btn-danger" onclick="removerProduto('${produto.nome}')">Remover</button>
                </div>
            </div>
        `;
        carrinhoContainer.innerHTML += produtoCard;
    });

    // Atualiza o total
    atualizarTotal();
}

// Função para atualizar o total do carrinho
function atualizarTotal() {
    const total = carrinho.reduce((acc, produto) => acc + produto.preco, 0);
    document.getElementById('carrinho-total').textContent = `Total: R$ ${total.toFixed(2)}`;
}

// Função para remover um produto do carrinho
function removerProduto(nome) {
    // Filtra o carrinho para remover apenas o item com o nome correspondente
    carrinho = carrinho.filter(produto => produto.nome !== nome);
    
    // Atualiza o localStorage
    localStorage.setItem('carrinho', JSON.stringify(carrinho)); 
    
    // Atualiza a quantidade na navbar
    atualizarQuantidadeCarrinho(); 
    
    // Atualiza a exibição do carrinho
    exibirCarrinho(); 
}

// Lista de Desejos
document.getElementById("listaDeDesejos").addEventListener("click", function() {
    var icon = document.getElementById("icon");
    
    // Verifica se o ícone atual é o coração preenchido
    if (icon.classList.contains("fa-solid", "fa-heart")) {
        icon.classList.remove("fa-solid", "fa-heart");
        icon.classList.add("fa-heart"); // Muda para o ícone vazio
    } else {
        icon.classList.remove("fa-heart");
        icon.classList.add("fa-solid", "fa-heart"); // Muda para o ícone preenchido
    }
});