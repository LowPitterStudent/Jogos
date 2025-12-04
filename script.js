let nivel = 1;
let xp = 0;
let vidas = 5;

const nivelSpan = document.getElementById("nivel");
const xpSpan = document.getElementById("xp");
const vidasSpan = document.getElementById("vidas");
const perguntaDiv = document.getElementById("pergunta");
const mensagem = document.getElementById("mensagem");
const somAcerto = document.getElementById("som-acerto");

let tempo = 40;
let timerInterval;

const gameOverBG = document.getElementById("gameover-bg");
const nivelFinalSpan = document.getElementById("nivel-final");
const recordeSpan = document.getElementById("recorde");

let respostaCerta;

let recorde = Number(localStorage.getItem("recordMath")) || 0;

function atualizarTimer() {
    document.getElementById("timer").textContent = tempo;
}

function iniciarTimer() {
    clearInterval(timerInterval);
    tempo = 40;
    atualizarTimer();

    timerInterval = setInterval(() => {
        tempo--;
        atualizarTimer();

        if (tempo <= 0) {
            clearInterval(timerInterval);
            mostrarGameOver();
        }
    }, 1000);
}

function novaPergunta() {
    let limite = nivel * 10;

    const a = Math.floor(Math.random() * (limite + 1));
    const b = Math.floor(Math.random() * (limite + 1));

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
        if (b === 0) { novaPergunta(); return; }
        respostaCerta = a;
        perguntaDiv.textContent = `${a * b} ÷ ${b}`;
    }

    document.getElementById("resposta").value = "";
    document.getElementById("resposta").focus();

    iniciarTimer();
}

function efeitoAcerto() {
    somAcerto.currentTime = 0;
    somAcerto.play().catch(() => {});

    document.body.classList.add("flash-verde");
    setTimeout(() => document.body.classList.remove("flash-verde"), 300);
}

function ganharXP() {
    let ganho = Math.floor(100 / nivel + nivel);
    xp += ganho;

    if (xp >= nivel * 120) {
        xp = 0;
        nivel++;
    }
}

function mostrarGameOver() {
    clearInterval(timerInterval);

    if (nivel > recorde) {
        recorde = nivel;
        localStorage.setItem("recordMath", recorde);
    }

    nivelFinalSpan.textContent = nivel;
    recordeSpan.textContent = recorde;

    gameOverBG.classList.remove("hide");
    document.getElementById("game-container").style.pointerEvents = "none";
}

document.getElementById("enviar").onclick = () => {
    const resposta = Number(document.getElementById("resposta").value);

    if (resposta === respostaCerta) {
        mensagem.textContent = "Você acertou!";
        mensagem.style.color = "lightgreen";

        efeitoAcerto();
        ganharXP();

    } else {
        mensagem.textContent = `Você errou! Era ${respostaCerta}`;
        mensagem.style.color = "red";

        vidas--;
        vidasSpan.textContent = vidas;

        if (vidas <= 0) {
            mostrarGameOver();
            return;
        }
    }

    xpSpan.textContent = xp;
    nivelSpan.textContent = nivel;

    setTimeout(() => {
        mensagem.textContent = "";
        novaPergunta();
    }, 700);
};

document.addEventListener("keydown", e => {
    if (e.key === "Enter") {
        document.getElementById("enviar").click();
    }
});

document.getElementById("desistir").onclick = () => mostrarGameOver();
document.getElementById("restart-btn").onclick = () => location.reload();

novaPergunta();
