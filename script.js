let nivel = 1;
let xp = 0;
let vidas = 5;

const nivelSpan = document.getElementById("nivel");
const xpSpan = document.getElementById("xp");
const vidasSpan = document.getElementById("vidas");
const perguntaDiv = document.getElementById("pergunta");
const mensagem = document.getElementById("mensagem");
const respostaInput = document.getElementById("resposta");

const somAcerto = document.getElementById("som-acerto");

let respostaCerta;

// --- EXIBE UMA NOVA PERGUNTA ---
function novaPergunta() {
    const a = Math.floor(Math.random() * (nivel + 10)) + 1;
    const b = Math.floor(Math.random() * (nivel + 10)) + 1;

    const operacoes = ["+", "-", "*", "/"];
    const op = operacoes[Math.floor(Math.random() * operacoes.length)];

    if (op === "+") {
        respostaCerta = a + b;
        perguntaDiv.innerHTML = `${a} + ${b}`;
    } else if (op === "-") {
        respostaCerta = a - b;
        perguntaDiv.innerHTML = `${a} - ${b}`;
    } else if (op === "*") {
        respostaCerta = a * b;
        perguntaDiv.innerHTML = `${a} × ${b}`;
    } else {
        respostaCerta = a;
        perguntaDiv.innerHTML = `${a * b} ÷ ${b}`;
    }

    // Sempre foca no input assim que a conta aparece
    respostaInput.focus();
}

// --- ANIMAÇÃO + SOM DE ACERTO ---
function efeitoAcerto() {
    if (somAcerto) {
        somAcerto.currentTime = 0;
        somAcerto.play().catch(() => {});
    }

    document.body.classList.add("flash-verde");

    setTimeout(() => {
        document.body.classList.remove("flash-verde");
    }, 400);
}

// --- XP / NÍVEL ---
function ganharXP() {
    let ganho = Math.floor(100 / nivel + nivel);
    xp += ganho;

    if (xp >= nivel * 120) {
        xp = 0;
        nivel++;
    }
}

// --- FUNÇÃO QUE CHECA A RESPOSTA ---
function checarResposta() {
    const resposta = Number(respostaInput.value);

    if (isNaN(resposta)) {
        mensagem.textContent = "Digite um número!";
        mensagem.className = "errou";

        setTimeout(() => {
            mensagem.textContent = "";
            mensagem.className = "";
        }, 800);
        return;
    }

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
            alert("Game Over! Reiniciando.");
            location.reload();
            return;
        }
    }

    nivelSpan.textContent = nivel;
    xpSpan.textContent = xp;
    vidasSpan.textContent = vidas;

    respostaInput.value = "";

    // Mostra nova pergunta após 700 ms + FOCAR no input
    setTimeout(() => {
        mensagem.textContent = "";
        mensagem.className = "";
        novaPergunta();

        // força foco imediatamente
        respostaInput.focus();

        // força foco novamente depois (garante no Chromebook)
        setTimeout(() => {
            respostaInput.focus();
        }, 10);

    }, 700);
}

// --- BOTÃO ENVIAR ---
document.getElementById("enviar").onclick = checarResposta;

// --- ENTER TAMBÉM ENVIA ---
respostaInput.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
        checarResposta();
    }
});

// --- BOTÃO DESISTIR ---
document.getElementById("desistir").onclick = () => {
    alert(`Você desistiu! Nível ${nivel}, XP ${xp}, Vidas ${vidas}`);
    location.reload();
};

// INÍCIO DO JOGO
novaPergunta();
respostaInput.focus();
