const tabuleiro = document.getElementById("tabuleiro");
// pega a div do tabuleiro do HTML
const mostrarTentativas = document.getElementById("tentativas");
const mostarTempo = document.getElementById("tempo");

const cartas = [
// cria um array com os pares das cartas
    "🍎",
    "🍌",
    "🍇",
    "🍓",
    "🍎",
    "🍌",
    "🍇",
    "🍓"
];

cartas.sort(() => Math.random() - 0.5);  
// sort() - organiza o array / Math.random - gera números aleatórios

let primeiraCarta = null;
// guarda a primeira carta clicada
let segundaCarta = null;
// guarda a segunda carta clicada;
let bloqueio = false;
// impede o jogador de clicar enquanto o jogo verifica as cartas
let paresEncontrados = 0;
// conta quantos pares o jogador acertou
let tentativas = 0;
let tempo = 0;

setInterval(function(){

    tempo++;

    mostrarTempo.innerHTML = tempo;

}, 1000);

function criarCartas(){

    cartas.forEach(function(item){

        const carta = document.createElement("div");
// adiciona a classe do CSS na carta
        carta.classList.add("carta");

        carta.dataset.valor = item;
// guarda emoji escondido
        carta.innerHTML = "";

        carta.addEventListener("click", function(){
          if(bloqueio) return;
// se o jogo estiver “ocupado”, ele impede novos cliques
            if(carta.innerHTML !== "") return;
// impede clicar na mesma carta várias vezes.
            carta.innerHTML = carta.dataset.valor;
// a carta mostra o valor salvo nela
           if(primeiraCarta === null){

                primeiraCarta = carta;
// salva a primeira escondida
            }else{
        
                segundaCarta = carta;
// chama a função
                verificarPar();
            }
        });
        tabuleiro.appendChild(carta);
// coloca a carta dentro do tabuleiro
    });

}

function verificarPar(){
    bloqueio = true;
// o jogo fica "travado" temporariamente
    tentativas++;
// adiciona +1 a cada jogada
    mostrarTentativas.innerHTML = tentativas;
// atualiza o número da tela
    if(primeiraCarta.dataset.valor === segundaCarta.dataset.valor){
// " === " as cartas permanecem abertas / essa é a comparação
        paresEncontrados++;
   
        if(paresEncontrados === 4){

            alert("Parabéns! Você venceu 🎉");
        }    

        primeiraCarta = null;
// "null" limpa as variáveis / o jogo "esquece" as cartas antigas
        segundaCarta = null;

        bloqueio = false;

    }else{
       
        setTimeout(function(){
// cria um atraso (para o jogador conseguir ver as cartas antes delas sumirem), sem isso = as cartas fechariam instantaneamente    
            primeiraCarta.innerHTML = "";
            segundaCarta.innerHTML = "";
// as cartas "viram para baixo"
            primeiraCarta = null;
            segundaCarta = null;

            bloqueio = false;
        }, 1000);
    }
}

function reiniciarJogo(){
    location.reload();
}

criarCartas();