let nivel = 1;
let xp = 0;
let vidas = 5;
let tempo = 40;
let intervalo;

const nivelSpan = document.getElementById("nivel");
const xpSpan = document.getElementById("xp");
const vidasSpan = document.getElementById("vidas");
const tempoSpan = document.getElementById("tempo");
const perguntaDiv = document.getElementById("pergunta");
const respostaInput = document.getElementById("resposta");
const mensagem = document.getElementById("mensagem");

const perdeuTela = document.getElementById("perdeu-tela");
const nivelFinal = document.getElementById("nivel-final");
const recordeSpan = document.getElementById("recorde");
const somAcerto = document.getElementById("som-acerto");

let respostaCerta;

// ----- RECORD -----
let recorde = localStorage.getItem("recorde") || 0;

// ----- NOVA PERGUNTA -----
function novaPergunta() {
    let max = nivel * 10;

    const a = Math.floor(Math.random() * max) + 1;
    const b = Math.floor(Math.random() * max) + 1;

    const ops = ["+", "-", "*", "/"];
    const op = ops[Math.floor(Math.random() * ops.length)];

    if (op === "+") {
        respostaCerta = a + b;
        perguntaDiv.textContent = `${a} + ${b}`;
    } else if (op === "-") {
        respostaCerta = a - b;
        perguntaDiv.textContent = `${a} - ${b}`;
    } else if (op === "*") {
        respostaCerta = a * b;
        perguntaDiv.textContent = `${a} × ${b}`;
    } else {
        respostaCerta = a;
        perguntaDiv.textContent = `${a * b} ÷ ${b}`;
    }

    respostaInput.focus();
}

// ----- CONTADOR -----
function iniciarTempo() {
    clearInterval(intervalo);
    tempo = 40;
    tempoSpan.textContent = tempo;

    intervalo = setInterval(() => {
        tempo--;
        tempoSpan.textContent = tempo;

        if (tempo <= 0) {
            perder();
        }
    }, 1000);
}

// ----- FUNÇÃO PERDER -----
function perder() {
    clearInterval(intervalo);

    nivelFinal.textContent = nivel;

    if (nivel > recorde) {
        recorde = nivel;
        localStorage.setItem("recorde", recorde);
    }

    recordeSpan.textContent = recorde;

    perdeuTela.style.display = "flex";
}

// ----- GANHAR XP -----
function ganharXP() {
    xp += Math.floor(100 / nivel + nivel);

    if (xp >= nivel * 120) {
        xp = 0;
        nivel++;
    }
}

// ----- ENVIAR RESPOSTA -----
document.getElementById("enviar").onclick = enviarResposta;

function enviarResposta() {
    const r = Number(respostaInput.value);

    if (r === respostaCerta) {
        somAcerto.play().catch(() => {});
        ganharXP();
    } else {
        vidas--;
        if (vidas <= 0) perder();
    }

    atualizarStatus();
    respostaInput.value = "";
    novaPergunta();
    iniciarTempo();
}

// ENTER para confirmar
respostaInput.addEventListener("keypress", e => {
    if (e.key === "Enter") enviarResposta();
});

// ----- BOTÃO DESISTIR -----
document.getElementById("desistir").onclick = perder;

// ----- JOGAR NOVAMENTE -----
document.getElementById("jogar-novamente").onclick = () => {
    perdeuTela.style.display = "none";
    nivel = 1;
    xp = 0;
    vidas = 5;
    atualizarStatus();
    novaPergunta();
    iniciarTempo();
};

// ----- ATUALIZAR TELA -----
function atualizarStatus() {
    nivelSpan.textContent = nivel;
    xpSpan.textContent = xp;
    vidasSpan.textContent = vidas;
}

// ----- INÍCIO -----
atualizarStatus();
novaPergunta();
iniciarTempo();
