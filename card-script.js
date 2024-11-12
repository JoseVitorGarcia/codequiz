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
    titulo: "O que é um algoritmo?",
    alternativas: [
      {
        id: 1,
        titulo: "Um tipo de dado",
        correta: false,
      },
      {
        id: 2,
        titulo: "Um conjunto de instruções para resolver um problema",
        correta: true,
      },
      {
        id: 3,
        titulo: "Uma linguagem de programação",
        correta: false,
      },
      {
        id: 4,
        titulo: "Um filme",
        correta: false,
      },
    ],
  },
  {
    titulo:
      "Qual operador lógico retorna True apenas se ambas as condições forem verdadeiras?",
    alternativas: [
      {
        id: 1,
        titulo: "OR",
        correta: false,
      },
      {
        id: 2,
        titulo: "AND",
        correta: true,
      },
      {
        id: 3,
        titulo: "NOT",
        correta: false,
      },
      {
        id: 4,
        titulo: "XOR",
        correta: false,
      },
    ],
  },
  {
    titulo: "O que é uma estrutura condicional?",
    alternativas: [
      {
        id: 1,
        titulo: "Uma variável",
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
    titulo: "Qual desses operadores é usado para negar uma condição?",
    alternativas: [
      {
        id: 1,
        titulo: "AND",
        correta: false,
      },
      {
        id: 2,
        titulo: "OR",
        correta: false,
      },
      {
        id: 3,
        titulo: "NOT",
        correta: true,
      },
      {
        id: 4,
        titulo: "XOR",
        correta: false,
      },
    ],
  },
  {
    titulo:
      "Qual das alternativas descreve um laço while (enquanto) corretamente?",
    alternativas: [
      {
        id: 1,
        titulo: "Executa o código apenas uma vez",
        correta: false,
      },
      {
        id: 2,
        titulo: "Executa o código enquanto a condição for verdadeira",
        correta: true,
      },
      {
        id: 3,
        titulo: "Executa o código uma quantidade fixa de vezes",
        correta: false,
      },
      {
        id: 4,
        titulo: "Sempre termina após a primeira execução",
        correta: false,
      },
    ],
  },
  {
    titulo: "O que é uma variável?",
    alternativas: [
      {
        id: 1,
        titulo: "Um tipo de laço de repetição",
        correta: false,
      },
      {
        id: 2,
        titulo: "Um valor que muda durante a execução de um programa",
        correta: true,
      },
      {
        id: 3,
        titulo: "Um comando que imprime na tela",
        correta: false,
      },
      {
        id: 4,
        titulo: "Um erro no código",
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
  vencedorItem.textContent = `Jogador conquistou ${pontosObtidos} pontos de ${perguntas.length}.`;
  rankingList.appendChild(vencedorItem);
  cardVencedor.style.display = "block";

  cardElement.style.display = "block"; // Oculta o card de perguntas

  rankingCard.style.display = "flex";
  rankingCard.style.flexDirection = "column";
  rankingCard.style.alignItems = "center";
  rankingCard.style.justifyContent = "center";

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
    // Fim do jogo

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
