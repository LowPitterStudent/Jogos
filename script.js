// Elementos
const nivelEl = document.getElementById("nivel");
const xpEl = document.getElementById("xp");
const vidasEl = document.getElementById("vidas");
const perguntaEl = document.getElementById("pergunta");
const respostaEl = document.getElementById("resposta");
const mensagemEl = document.getElementById("mensagem");
const enviarEl = document.getElementById("enviar");
const desistirEl = document.getElementById("desistir");
const somAcerto = document.getElementById("som-acerto");

let nivel = 1;
let xp = 0;
let vidas = 5;
let respostaCorreta = 0;
let recorde = localStorage.getItem("recordeMath") || 0;

// ⏳ CRONÔMETRO
let tempo = 40;
let intervaloTempo;

// 🟥 TELA DE PERDEU
const perdeuTela = document.createElement("div");
perdeuTela.id = "perdeu-tela";
perdeuTela.style.position = "fixed";
perdeuTela.style.top = "0";
perdeuTela.style.left = "0";
perdeuTela.style.width = "100%";
perdeuTela.style.height = "100%";
perdeuTela.style.background = "rgba(0,0,0,0.8)";
perdeuTela.style.display = "none";
perdeuTela.style.justifyContent = "center";
perdeuTela.style.alignItems = "center";
perdeuTela.style.zIndex = "999";

perdeuTela.innerHTML = `
    <div style="background:#222; padding:30px; border-radius:15px; text-align:center; width:300px; color:white;">
        <h2>Você perdeu!</h2>
        <p id="texto-pontuacao"></p>
        <button id="btn-reiniciar" style="
            margin-top: 15px;
            padding: 10px 20px;
            background: white;
            color: black;
            border-radius: 10px;
            cursor: pointer;
            font-size: 16px;">
            Jogar novamente
        </button>
    </div>
`;
document.body.appendChild(perdeuTela);

// FUNÇÃO → Gerar nova conta
function gerarConta() {
    let max = nivel * 10;
    let n1 = Math.floor(Math.random() * max);
    let n2 = Math.floor(Math.random() * max);
    respostaCorreta = n1 + n2;

    perguntaEl.textContent = `${n1} + ${n2} = ?`;

    respostaEl.value = "";
    respostaEl.focus();

    // reseta o tempo da rodada
    tempo = 40;
}

// FUNÇÃO → Atualizar info
function atualizarStatus() {
    nivelEl.textContent = nivel;
    xpEl.textContent = xp;
    vidasEl.textContent = vidas;
}

// FUNÇÃO → Perdeu jogo
function perdeuJogo() {
    clearInterval(intervaloTempo);

    // atualiza recorde
    if (nivel > recorde) {
        recorde = nivel;
        localStorage.setItem("recordeMath", recorde);
    }

    document.getElementById("texto-pontuacao").textContent =
        `Pontuação: Nível ${nivel} | Recorde: ${recorde}`;

    perdeuTela.style.display = "flex";
}

// FUNÇÃO → Verificar resposta
function verificar() {
    let resposta = Number(respostaEl.value);

    if (resposta === respostaCorreta) {
        mensagemEl.textContent = "Acertou!";
        mensagemEl.style.color = "lime";
        somAcerto.play();

        xp += 10;

        if (xp >= 50) {
            xp = 0;
            nivel++;
        }
    } else {
        mensagemEl.textContent = "Errou!";
        mensagemEl.style.color = "red";
        vidas--;

        if (vidas <= 0) {
            perdeuJogo();
            return;
        }
    }

    atualizarStatus();
    gerarConta();
}

// BOTÃO ENVIAR
enviarEl.onclick = verificar;

// ENTER também envia
respostaEl.addEventListener("keydown", (e) => {
    if (e.key === "Enter") verificar();
});

// DESISTIR
desistirEl.onclick = perdeuJogo;

// CRONÔMETRO
function iniciarTempo() {
    intervaloTempo = setInterval(() => {
        tempo--;

        // Mostrando no título da aba (legal!)
        document.title = `⏳ ${tempo}s - Jogo`;

        if (tempo <= 0) {
            perdeuJogo();
        }
    }, 1000);
}

// BOTÃO → Jogar novamente
document.getElementById("btn-reiniciar").onclick = () => {
    perdeuTela.style.display = "none";

    nivel = 1;
    vidas = 5;
    xp = 0;

    atualizarStatus();
    gerarConta();

    tempo = 40;
    iniciarTempo();
};

// INICIAR JOGO
atualizarStatus();
gerarConta();
iniciarTempo();
