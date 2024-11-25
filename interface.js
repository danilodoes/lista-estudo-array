document.addEventListener('DOMContentLoaded', () => {
  let list = [];
  const amount = document.querySelector('input.amount');
  const item = document.querySelector('input.item');
  const btnAdd = document.querySelector('button.btnAdd');
  const btnClear = document.querySelector('button.btnClear');
  const containerList = document.getElementById('containerList');


  function createCard(id, amount, item) {

    //Cria uma linha para abrigar as 4 divs
    const divCard = document.createElement('div');
    divCard.classList.add('card');
    divCard.id = "card-" + id;

    //Cria a primeira div (id)
    const divId = document.createElement('div');
    divId.setAttribute('data-firstcol', true);
    divId.classList.add('borderItem');
    divId.textContent = id;

    //Cria a segunda div (quantidade)
    const divAmount = document.createElement('div');
    divAmount.setAttribute('data-firstcol', false);
    divAmount.classList.add('borderItem');
    divAmount.textContent = amount;

    //Cria a terceira div(item)
    const divItem = document.createElement('div');
    divItem.setAttribute('data-firstcol', false);
    divItem.classList.add('borderItem');
    divItem.textContent = item;

    //Cria a quarta div e o botão (campo para exclusão)
    const divDelete = document.createElement('div');
    divDelete.setAttribute('data-firstcol', false);
    divDelete.classList.add('borderItem');

    //Adicionando o botão para deletar cada linha
    const btnDel = document.createElement('button');
    btnDel.classList.add('btnDel');
    btnDel.textContent = "X";

    //Adiciona as 4 divs dentro da div card (pra formar uma linha)
    divCard.appendChild(divId);
    divCard.appendChild(divAmount);
    divCard.appendChild(divItem);
    divCard.appendChild(divDelete);
    divDelete.appendChild(btnDel);

    //Adiciona uma linha na lista. (Coloca o código HTML que o js criou no documento, então ele aparece na tela)
    containerList.appendChild(divCard);

  };

  //Função para tirar a lista da TELA
  function clearScreen() {
    if (list.length > 0) {
      while (containerList.firstChild) {
        containerList.removeChild(containerList.firstChild)
      };
    };
  };

  //Função para apagar todos os dados do array
  function clearList() {
    list.length = 0;
  };


  //Aguarda o click no botão "Adicionar" para atualizar a lista
  btnAdd.onclick = () => {
    clearScreen();
    list.push({
      'amount': amount.value,
      'item': item.value,
    });

    list.map((elemento, index) => {
      createCard(index, elemento.amount, elemento.item);
    });

  };

  //Função do botão Limpar
  btnClear.onclick = () => {
    if (confirm('Você confirma querer limpar toda a lista?')) {
      clearScreen();
      clearList();
    } else {
      alert('A lista será limpa apenas se você confirmar.');
    };
  };

}); //FECHAMENTO DO 'DOMContentLoaded'