/**
 * Declaração de elementos do HTML para acesso pelo JS.
 */
const cardElement = document.getElementById("card");
const cardTituloElement = document.getElementById("card-titulo");
const cardTituloTextElement = document.getElementById("card-titulo-text");
const alternativasListaElement = document.getElementById("alternativas-lista");
const respostaContainerElement = document.getElementById("resposta-container");
const mensagemElement = document.getElementById("mensagem");
const pontosJogador1Element = document.getElementById("pontos-jogador-1");
const pontosJogador2Element = document.getElementById("pontos-jogador-2");
const cardelemento = document.getElementById("vencedor-card");



function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

/**
 * Lista contendo as perguntas do sistema, suas alternativas e quais estão corretas.
 */

const perguntas = [
  {
    titulo:
      "O que é um algoritmo?",
    alternativas: [
      {
        id: 1,
        titulo: "Um tipo de dado",
        correta: false,
      },
      {
        id: 2,
        titulo: "Uma linguagem de programação",
        correta: false,
      },
      {
        id: 3,
        titulo: "Um conjunto de instruções para resolver um problema",
        correta: true,
      },
      {
        id: 4,
        titulo: "Uma rede social",
        correta: false,
      },
    ],
  },
  {
    titulo:
      "O que é uma estrutura condicional?",
    alternativas: [
      {
        id: 1,
        titulo:
          "Uma variável",
        correta: false,
      },
      {
        id: 2,
        titulo: "Uma repetição de código",
        correta: false,
      },
      {
        id: 3,
        titulo: "Um bloco de código que executa com base em uma condição",
        correta: true,
      },
      {
        id: 4,
        titulo: "Uma função matemática",
        correta: false,
      },
    ],
  },
  {
    titulo:
      "Qual a função do operador != em lógica de programação?",
    alternativas: [
      {
        id: 1,
        titulo:
          "Verifica se dois valores são iguais",
        correta: false,
      },
      {
        id: 2,
        titulo: "Verifica se dois valores são diferentes",
        correta: true,
      },
      {
        id: 3,
        titulo: "Atribui um valor a uma variável",
        correta: false,
      },
      {
        id: 4,
        titulo: "Compara dois valores usando multiplicação",
        correta: false,
      },
    ],
  },
];

shuffleArray(perguntas); // Embaralhe o array de perguntas após defini-lo

let indicePerguntaAtual = 0; // Índice da pergunta exibida atualmente
let perguntaAtual = perguntas[indicePerguntaAtual]; // Dados da pergunta atual

let pontosObtidos = 0;

function verificarFimDoJogo() {
 
  const rankingCard = document.getElementById("ranking-card");
  const rankingList = document.getElementById("ranking-list");
  const cardVencedor = document.getElementById("card-vencedor");


  cardElement.classList.add("oculto-ao-finalizar");
  cardTituloTextElement.classList.add("oculto-ao-finalizar");
  

  const vencedorItem = document.createElement("h3");
  vencedorItem.textContent = `Você conquistou ${pontosObtidos} pontos de ${perguntas.length}.`;
  rankingList.appendChild(vencedorItem);
  cardVencedor.style.display = "block";
  rankingCard.style.display = "block"; // Exibe o card de ranking de vencedor
  cardElement.style.display = "block"; // Oculta o card de perguntas

  // Desabilita o jogo para que o usuário não continue interagindo
  const alternativasRadio = document.querySelectorAll(
    'input[name="alternativa"]'
  );
  alternativasRadio.forEach((input) => {
    input.disabled = true;
  });

  const proximaPerguntaBotao = document.querySelector(".botao-responder");
  proximaPerguntaBotao.disabled = true;
}

function avancarPergunta() {
  // Limpa os elementos HTML para criar outros com a próxima pergunta
  alternativasListaElement.innerHTML = "";
  respostaContainerElement.innerHTML = "";
  document.querySelectorAll(".alternativa").forEach((alternativa) => {
    alternativa.classList.remove("desativado");
  });

  indicePerguntaAtual++; // Incrementa o índice da pergunta atual
  
  if (indicePerguntaAtual + 1 > perguntas.length) {
   

    verificarFimDoJogo();
  }

  perguntaAtual = perguntas[indicePerguntaAtual]; // Atualiza a pergunta atual
  renderizaCard(); // Re-renderiza o card com a nova pergunta
}

/**
 * Diferencia visualmente as alternativas incorretas da correta.
 */
function exibeAlternativasResultado() {
 // Bloquear cliques adicionais


   Array.from(alternativasListaElement.children).forEach(
    (alternativaElement, indice) => {
      const inputElement = alternativaElement.children[0];
    
      inputElement.disabled = true;

      alternativaElement.classList.remove("alternativa-base");

      const alternativaAtual = perguntaAtual.alternativas[indice];
     
      if (inputElement.checked && alternativaAtual.correta) {
        alternativaElement.classList.add("alternativa-correta");
       
        pontosObtidos++;
      } else if (inputElement.checked && !alternativaAtual.correta) {
        
        alternativaElement.classList.add("alternativa-incorreta");
      }
    }
  ); 
}

/**
 * Verifica uma alternativa, identificando se é correta ou incorreta.
 */
function verificaAlternativa(alternativa) {
  // Desabilitar todas as alternativas
  document.querySelectorAll(".alternativa").forEach((alternativa) => {
    alternativa.classList.add("desativado");
  });

  if (alternativa.correta) {
    
    alternativa.element.classList.add("alternativa-correta");
    pontosObtidos++;
  } else {
    alternativa.element.classList.add("alternativa-incorreta");
    const alternativaCorretaAtual = perguntaAtual.alternativas.find(
      (item) => item.correta
    );
    if (alternativaCorretaAtual && alternativaCorretaAtual.element) {
      alternativaCorretaAtual.element.classList.add("alternativa-correta");
    }
  }

  // Criação do botão "Avançar"
  const proximaPerguntaContainer = document.createElement("div");
  const proximaPerguntaBotao = document.createElement("button");

  proximaPerguntaBotao.textContent = "Avançar";
  proximaPerguntaBotao.classList.add("botao-responder");
  proximaPerguntaBotao.addEventListener("click", avancarPergunta);

  proximaPerguntaContainer.appendChild(proximaPerguntaBotao);
  respostaContainerElement.appendChild(proximaPerguntaContainer);
}

/**
 * Renderiza automaticamente a pergunta atual e todas as suas alternativas no card.
 */
function renderizaCard() {
  const perguntaTitulo = ` ${indicePerguntaAtual + 1}`;

  cardTituloElement.textContent = perguntaTitulo;
  cardTituloTextElement.textContent = `${perguntaAtual.titulo}`;
  const letrasAlternativas = ["(A)", "(B)", "(C)", "(D)"];

  /**
   * Loop para navegar na lista de alternativas da pergunta atual, criando um HTML dinâmico para cada uma.
   */

  perguntaAtual.alternativas.forEach((alternativa, indice) => {
    const listElement = document.createElement("li");
    alternativa.element = listElement;

    const labelElement = document.createElement("label");

    listElement.classList.add("alternativa", "alternativa-base");

    labelElement.classList = "alternativa-texto";
    labelElement.textContent = `${letrasAlternativas[indice]} ${alternativa.titulo}`;

    // Ao clicar em uma alternativa...
    listElement.addEventListener("click", () => {
      exibeAlternativasResultado();
      verificaAlternativa(alternativa);
    });

    alternativasListaElement.appendChild(listElement);
    listElement.appendChild(labelElement);
  });
}

// Inicialização
renderizaCard();
