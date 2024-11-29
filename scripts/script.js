let carrinho = [];

function adicionarAoCarrinho(nome, preco) {
    const produtoExistente = carrinho.find(produto => produto.nome === nome);
    
    if (produtoExistente) {
        alert(`${nome} já está no carrinho.`);
    } else {
        carrinho.push({ nome: nome, preco: preco });
        atualizarQuantidadeCarrinho();
        localStorage.setItem('carrinho', JSON.stringify(carrinho));
    }
}

function atualizarQuantidadeCarrinho() {
    const quantidadeCarrinho = carrinho.length;
    const badgeCarrinho = document.querySelector('.badge');

    if (badgeCarrinho) {
        badgeCarrinho.textContent = quantidadeCarrinho;
    }
}

window.onload = function() {
    const carrinhoSalvo = JSON.parse(localStorage.getItem('carrinho')) || [];
    carrinho = carrinhoSalvo;
    atualizarQuantidadeCarrinho();
    exibirCarrinho();
};

function exibirCarrinho() {
    const carrinhoContainer = document.querySelector('.carrinho-container .row .col-md-8');
    carrinhoContainer.innerHTML = ''; 

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

    atualizarTotal();
}

function atualizarTotal() {
    const total = carrinho.reduce((acc, produto) => acc + produto.preco, 0);
    document.getElementById('carrinho-total').textContent = `Total: R$ ${total.toFixed(2)}`;
}

function removerProduto(nome) {
    carrinho = carrinho.filter(produto => produto.nome !== nome);
    
    localStorage.setItem('carrinho', JSON.stringify(carrinho)); 
    
    atualizarQuantidadeCarrinho(); 
    
    exibirCarrinho(); 
}

document.getElementById("listaDeDesejos").addEventListener("click", function() {
    var icon = document.getElementById("icon");
    
    if (icon.classList.contains("fa-solid", "fa-heart")) {
        icon.classList.remove("fa-solid", "fa-heart");
        icon.classList.add("fa-heart");
    } else {
        icon.classList.remove("fa-heart");
        icon.classList.add("fa-solid", "fa-heart");
    }
});