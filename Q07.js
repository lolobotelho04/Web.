// Dados dos itens disponíveis para pedidos
const itensPizzas = ["Pizza de Calabresa", "Pizza de Margherita", "Pizza de Quatro Queijos"];
const itensBebidas = ["Coca-Cola", "Guaraná", "Água"];

// Função para atualizar a lista de itens com base no tipo selecionado
function atualizarListaItens() {
  const itemTypeSelect = document.getElementById("itemType");
  const itemListSelect = document.getElementById("itemList");
  const selectedType = itemTypeSelect.value;

  // Limpa a lista de itens
  itemListSelect.innerHTML = "";

  // Adiciona os itens corretos com base no tipo selecionado
  const itens = (selectedType === "pizzas") ? itensPizzas : itensBebidas;
  itens.forEach(item => {
    const option = document.createElement("option");
    option.value = item;
    option.textContent = item;
    itemListSelect.appendChild(option);
  });
}

// Função para adicionar o item selecionado ao pedido
function adicionarItem() {
  const itemListSelect = document.getElementById("itemList");
  const pizzaSizeSelect = document.getElementById("pizzaSize");
  const quantityInput = document.getElementById("quantity");
  const pedidoResumoList = document.getElementById("pedidoResumo");

  const item = itemListSelect.value;
  const size = pizzaSizeSelect.value;
  const quantity = parseInt(quantityInput.value, 10);

  const resumoItem = `${quantity}x ${size} - ${item}`;

  const listItem = document.createElement("li");
  listItem.textContent = resumoItem;

  pedidoResumoList.appendChild(listItem);
}

// Adiciona o evento de mudança no tipo de item para atualizar a lista de itens disponíveis
const itemTypeSelect = document.getElementById("itemType");
itemTypeSelect.addEventListener("change", atualizarListaItens);
atualizarListaItens(); // Chama a função uma vez para preencher a lista inicial

// Restrição para garantir que o tamanho da pizza seja selecionado apenas quando "Pizzas" estiver selecionado
const pizzaSizeSelect = document.getElementById("pizzaSize");
itemTypeSelect.addEventListener("change", function() {
  if (itemTypeSelect.value === "pizzas") {
    pizzaSizeSelect.disabled = false;
  } else {
    pizzaSizeSelect.disabled = true;
  }
});

// Evento para desabilitar o tamanho da pizza quando a página for carregada com "Bebidas" selecionado
document.addEventListener("DOMContentLoaded", function() {
  if (itemTypeSelect.value === "bebidas") {
    pizzaSizeSelect.disabled = true;
  }
});