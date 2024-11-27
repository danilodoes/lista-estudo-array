document.addEventListener('DOMContentLoaded', () => {

  //Vou separar as variáveis considerando seu uso no HTML, visando buscar melhor manutenção
  //Variáveis gerais de controle JS
  let list = [];

  //Acesso às telas modal (confirme + erro)
  const modalUpperScreen = document.querySelector('section.upperScreen');

  //Tela modal "CONFIRME"
  const btnYES = document.querySelector('button.btnYES');
  const btnNO = document.querySelector('button.btnNO');
  const alertClearList = document.querySelector('div.alertClearList');

  //Tela modal "ERRO"
  const btnOK = document.querySelector('button.btnOK');
  const alertEmptyFields = document.querySelector('div.alertEmptyFields');

  //Tela principal
  const amount = document.querySelector('input.amount');
  const item = document.querySelector('input.item');
  const btnAdd = document.querySelector('button.btnAdd');
  const btnClear = document.querySelector('button.btnClear');
  const containerList = document.getElementById('containerList');
  const mainContainerList = document.getElementById('mainContainerList');

  //Criar as linhas das lista
  function createCard(id, amount, item) {

    //Cria uma linha para abrigar as 4 divs
    const divCard = document.createElement('div');
    divCard.classList.add('card');
    divCard.id = "card-" + id;

    //Cria a primeira div (id)
    const divId = document.createElement('div');
    divId.classList.add('borderItem');
    divId.textContent = id;

    //Cria a segunda div (quantidade)
    const divAmount = document.createElement('div');
    divAmount.classList.add('borderItem');
    divAmount.textContent = amount;

    //Cria a terceira div(item)
    const divItem = document.createElement('div');
    divItem.classList.add('borderItem');
    divItem.textContent = item;

    //Cria a quarta div e o botão (campo para exclusão)
    const divDelete = document.createElement('div');
    divDelete.classList.add('borderItem');

    //Adicionando o botão para deletar cada linha
    const btnDel = document.createElement('button');
    btnDel.classList.add('btnDel');
    btnDel.textContent = "X";
    btnDel.onclick = () => deleteItem(id);

    //Adiciona as 4 divs dentro da div card (pra formar uma linha)
    divCard.appendChild(divId);
    divCard.appendChild(divAmount);
    divCard.appendChild(divItem);
    divCard.appendChild(divDelete);
    divDelete.appendChild(btnDel);

    //Adiciona uma linha na lista. (Coloca o código HTML que o js criou no documento, então ele aparece na tela)
    containerList.appendChild(divCard);

  };
  function deleteItem(index) {
    clearScreen();
    list.splice(index, 1);
    createLinesOnTable();
  };


  //Limpar a lista da TELA
  function clearScreen() {
    if (list.length > 0) {
      while (containerList.firstChild) {
        containerList.removeChild(containerList.firstChild)
      };
    };
  };


  //Apagar todos os dados do array
  function clearList() {
    list.length = 0;
  };

  //Limpar os campos
  function clearFields() {
    amount.value = '';
    item.value = '';
  }

  //Formatar a saída dos itens para forçar sempre a primeira letra maiúscula e as outras minúsculas.
  function formatItens(firstLetter, othersLetters) {
    return firstLetter.charAt(0).toUpperCase() + othersLetters.slice(1).toLowerCase();
  }

  //Controladores do Modal
  function toggleModal(blur, visibility, displayClearList, displayEmptyFields) {
    mainContainerList.style.filter = blur;
    modalUpperScreen.style.visibility = visibility;
    alertClearList.style.display = displayClearList;
    alertEmptyFields.style.display = displayEmptyFields;
  };

  //Cria as linhas da tabela através do array list
  function createLinesOnTable() {
    list.map((elemento, index) => {
      createCard(index, elemento.amount, elemento.item);
    });
  }

  //Aguarda o click no botão "Adicionar" para atualizar a lista
  btnAdd.onclick = () => {

    //Valida se os campos estão preenchidos para adicionar
    if (!amount.value == '' && !item.value == '') {
      clearScreen();
      list.push({
        'amount': amount.value,
        'item': formatItens(item.value, item.value),
        'del': 'X',
      });

      createLinesOnTable();
      clearFields();

    } else {
      toggleModal('blur(20px)', 'visible', 'none', 'flex');

      btnOK.onclick = () => {
        toggleModal('none', 'hidden', 'none', 'none');
      };
    };
  };

  //Limpar Lista (tanto em tela quanto array)
  btnClear.onclick = () => {

    if (!list.length == 0) {
      toggleModal('blur(20px)', 'visible', 'flex', 'none');

      btnYES.onclick = () => {
        clearScreen();
        clearList();
        toggleModal('none', 'hidden', 'none', 'none');
      };

      btnNO.onclick = () => {
        toggleModal('none', 'hidden', 'none', 'none');
      };

    } else {
      alert("Não existe uma lista a ser limpa");
    };
  };

}); //FECHAMENTO DO 'DOMContentLoaded'