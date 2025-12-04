let nivel = 1;
let xp = 0;
let vidas = 5;
let tempo = 40;
let intervalo;
let jogoTravado = false;

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

let recorde = localStorage.getItem("recorde") || 0;

/* ------------------- NOVA PERGUNTA -------------------- */
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

/* ------------------- TEMPO -------------------- */
function iniciarTempo() {
    clearInterval(intervalo);
    tempo = 40;
    tempoSpan.textContent = tempo;

    intervalo = setInterval(() => {
        if (jogoTravado) return;
        tempo--;
        tempoSpan.textContent = tempo;

        if (tempo <= 0) perder();
    }, 1000);
}

/* ------------------- DERROTA -------------------- */
function perder() {
    if (jogoTravado) return;

    jogoTravado = true;
    clearInterval(intervalo);

    nivelFinal.textContent = nivel;

    if (nivel > recorde) {
        recorde = nivel;
        localStorage.setItem("recorde", recorde);
    }

    recordeSpan.textContent = recorde;

    perdeuTela.style.display = "flex";
}

/* ------------------- XP / NÍVEL -------------------- */
function ganharXP() {
    xp += Math.floor(100 / nivel + nivel);

    if (xp >= nivel * 120) {
        xp = 0;
        nivel++;
    }
}

/* ------------------- ENVIAR RESPOSTA -------------------- */
function enviarResposta() {
    if (jogoTravado) return;

    const r = Number(respostaInput.value);

    if (r === respostaCerta) {
        somAcerto.currentTime = 0;
        somAcerto.play().catch(() => {});
        ganharXP();
    } else {
        vidas--;
        if (vidas <= 0) return perder();
    }

    atualizar();
    respostaInput.value = "";
    novaPergunta();
    iniciarTempo();
}

document.getElementById("enviar").onclick = enviarResposta;

/* ENTER confirma */
respostaInput.addEventListener("keydown", e => {
    if (e.key === "Enter") enviarResposta();
});

/* ------------------- DESISTIR -------------------- */
document.getElementById("desistir").onclick = perder;

/* ------------------- JOGAR NOVAMENTE -------------------- */
document.getElementById("jogar-novamente").onclick = () => {
    perdeuTela.style.display = "none";

    nivel = 1;
    xp = 0;
    vidas = 5;
    jogoTravado = false;

    atualizar();
    novaPergunta();
    iniciarTempo();
};

/* ------------------- ATUALIZAR -------------------- */
function atualizar() {
    nivelSpan.textContent = nivel;
    xpSpan.textContent = xp;
    vidasSpan.textContent = vidas;
}

/* ------------------- INÍCIO -------------------- */
atualizar();
novaPergunta();
iniciarTempo();
