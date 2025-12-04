let nivel = 1;
let xp = 0;
let vidas = 5;

const nivelSpan = document.getElementById("nivel");
const xpSpan = document.getElementById("xp");
const vidasSpan = document.getElementById("vidas");
const perguntaDiv = document.getElementById("pergunta");
const mensagem = document.getElementById("mensagem");
const respostaEl = document.getElementById("resposta");
const somAcerto = document.getElementById("som-acerto");

let tempo = 40;
let timerInterval = null;

const gameOverBG = document.getElementById("gameover-bg");
const nivelFinalSpan = document.getElementById("nivel-final");
const recordeSpan = document.getElementById("recorde");

let respostaCerta = null;

// Recorde salvo
let recorde = Number(localStorage.getItem("recordMath")) || 0;

/* ---------------- TIMER ---------------- */

function atualizarTimerDisplay() {
    document.getElementById("timer").textContent = tempo;
}

function iniciarTimer() {
    clearInterval(timerInterval);
    tempo = 40;
    atualizarTimerDisplay();

    timerInterval = setInterval(() => {
        tempo--;
        atualizarTimerDisplay();
        if (tempo <= 0) {
            clearInterval(timerInterval);
            mostrarGameOver();
        }
    }, 1000);
}

function pararTimer() {
    clearInterval(timerInterval);
}

/* ---------------- PERGUNTAS ---------------- */

function novaPergunta() {
    const limite = nivel * 10;

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
        if (b === 0) return novaPergunta();
        respostaCerta = a;
        perguntaDiv.textContent = `${a * b} ÷ ${b}`;
    }

    respostaEl.value = "";
    respostaEl.focus();
    setTimeout(() => respostaEl.focus(), 20);

    iniciarTimer();
}

/* ---------------- EFEITOS ---------------- */

function efeitoAcerto() {
    somAcerto.currentTime = 0;
    somAcerto.play().catch(()=>{});

    document.body.classList.add("flash-verde");
    setTimeout(() => document.body.classList.remove("flash-verde"), 250);
}

/* ---------------- XP ---------------- */

function ganharXP() {
    const ganho = Math.floor(100 / nivel + nivel);
    xp += ganho;

    if (xp >= nivel * 120) {
        xp = 0;
        nivel++;
    }
}

function atualizarPlacar() {
    nivelSpan.textContent = nivel;
    xpSpan.textContent = xp;
    vidasSpan.textContent = vidas;
}

/* ---------------- GAME OVER ---------------- */

function mostrarGameOver() {
    pararTimer();

    // atualiza recorde
    if (nivel > recorde) {
        recorde = nivel;
        localStorage.setItem("recordMath", recorde);
    }

    nivelFinalSpan.textContent = nivel;
    recordeSpan.textContent = recorde;

    gameOverBG.classList.remove("hide");
    document.getElementById("game-container").style.pointerEvents = "none";
}

function fecharGameOver() {
    gameOverBG.classList.add("hide");
    document.getElementById("game-container").style.pointerEvents = "auto";
}

function reiniciarJogo() {
    nivel = 1;
    xp = 0;
    vidas = 5;
    tempo = 40;
    atualizarPlacar();
    fecharGameOver();
    novaPergunta();
}

/* ---------------- CHECAR RESPOSTA ---------------- */

function checarResposta() {
    const raw = respostaEl.value.trim();

    if (raw === "") {
        mensagem.textContent = "Digite um número!";
        mensagem.className = "errou";
        setTimeout(() => mensagem.textContent = "", 700);
        return;
    }

    const resposta = Number(raw);

    if (resposta === respostaCerta) {
        mensagem.textContent = "Você acertou!";
        mensagem.className = "acertou";
        efeitoAcerto();
        ganharXP();
    } else {
        mensagem.textContent = `Você errou! Era ${respostaCerta}`;
        mensagem.className = "errou";
        vidas--;
        if (vidas <= 0) {
            atualizarPlacar();
            mostrarGameOver();
            return;
        }
    }

    atualizarPlacar();

    setTimeout(() => {
        mensagem.textContent = "";
        novaPergunta();
    }, 700);
}

/* ---------------- EVENTOS ---------------- */

document.getElementById("enviar").onclick = checarResposta;

respostaEl.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
        e.preventDefault();
        checarResposta();
    }
});

document.getElementById("desistir").onclick = mostrarGameOver;

document.getElementById("restart-btn").onclick = reiniciarJogo;

/* ---------------- INÍCIO ---------------- */

atualizarPlacar();
novaPergunta();
