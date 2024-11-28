let carrinho = [];
let contadorCarrinho = 0;

function adicionarAoCarrinho(nomeProduto, preco) {
    // Verifica se o carrinho já existe no localStorage
    carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];

    // Verifica se o item já existe no carrinho
    let itemExistente = carrinho.find(item => item.nome === nomeProduto);
    
    if (itemExistente) {
        itemExistente.quantidade += 1;
    } else {
        carrinho.push({ nome: nomeProduto, preco: preco, quantidade: 1 });
    }

    // Atualiza o localStorage
    localStorage.setItem('carrinho', JSON.stringify(carrinho));

    // Atualiza o contador do carrinho
    contadorCarrinho++;
    document.querySelector('.badge').innerText = contadorCarrinho;

    // Atualiza a exibição do carrinho
    atualizarCarrinho();
    alert(`${nomeProduto} foi adicionado ao carrinho!`);
}

function atualizarCarrinho() {
    const carrinhoContainer = document.getElementById('carrinho-itens');
    carrinhoContainer.innerHTML = '';

    carrinho.forEach(item => {
        const linha = document.createElement('div');
        linha.innerHTML = `
            <span>${item.nome} - R$ ${item.preco} x ${item.quantidade}</span>
            <button class="btn btn-danger btn-sm ms-2" onclick="removerItem('${item.nome}')"><i class="fa-solid fa-trash"></i></button>
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
    localStorage.setItem('carrinho', JSON.stringify(carrinho));
    atualizarCarrinho();
}

window.onload = function() {
    // Carrega o carrinho do localStorage ao iniciar a página
    carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];
    contadorCarrinho = carrinho.reduce((sum, item) => sum + item.quantidade, 0);
    document.querySelector('.badge').innerText = contadorCarrinho;

    // Atualiza a exibição do carrinho
    atualizarCarrinho();
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