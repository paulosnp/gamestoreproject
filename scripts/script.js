let carrinho = [];

function adicionarAoCarrinho(produto, preco) {
    let itemExistente = carrinho.find(item => item.nome === produto);
    
    if (itemExistente) {
        itemExistente.quantidade += 1;
    } else {
        carrinho.push({ nome: produto, preco: preco, quantidade: 1 });
    }

    atualizarCarrinho();
}

function atualizarCarrinho() {
    const carrinhoContainer = document.getElementById('carrinho-itens');
    carrinhoContainer.innerHTML = '';

    carrinho.forEach(item => {
        const linha = document.createElement('div');
        linha.innerHTML = `
            <span>${item.nome} - R$ ${item.preco} x ${item.quantidade}</span>
            <button class="btn btn-danger btn-sm ms-2" onclick="removerItem('${item.nome}')">Remover</button>
        `;
        carrinhoContainer.appendChild(linha);
    });

    atualizarTotal();
}

function atualizarTotal() {
    const total = carrinho.reduce((sum, item) => sum + (item.preco * item.quantidade), 0);
    document.getElementById('carrinho-total').innerText = `Total: R$ ${total.toFixed(2)}`;
}

function removerItem(nome) {
    carrinho = carrinho.filter(item => item.nome !== nome);
    atualizarCarrinho();
}




//Lista de Desejos

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