let nivel = 1;
let xp = 0;
let vidas = 5;

const nivelSpan = document.getElementById("nivel");
const xpSpan = document.getElementById("xp");
const vidasSpan = document.getElementById("vidas");
const perguntaDiv = document.getElementById("pergunta");
const mensagem = document.getElementById("mensagem");
const somAcerto = document.getElementById("som-acerto");

let respostaCerta;

// --- EXIBE UMA NOVA PERGUNTA ---
function novaPergunta() {
    const a = Math.floor(Math.random() * (nivel + 4)) + 1;
    const b = Math.floor(Math.random() * (nivel + 4)) + 1;

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

    // >>> Focar o input automaticamente <<<
    document.getElementById("resposta").focus();
}

// --- ANIMAÇÃO + SOM DE ACERTO ---
function efeitoAcerto() {
    somAcerto.currentTime = 0;
    somAcerto.play().catch(() => {});

    document.body.classList.add("flash-verde");

    setTimeout(() => {
        document.body.classList.remove("flash-verde");
    }, 350);
}

// --- XP / LEVEL ---
function ganharXP() {
    let ganho = Math.floor(100 / nivel + nivel);
    xp += ganho;

    if (xp >= nivel * 120) {
        xp = 0;
        nivel++;
    }
}

// --- BOTÃO ENVIAR ---
document.getElementById("enviar").onclick = () => {
    const resposta = Number(document.getElementById("resposta").value);

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

    document.getElementById("resposta").value = "";

    setTimeout(() => {
        mensagem.textContent = "";
        mensagem.className = "";
        novaPergunta();
    }, 700);
};

// --- Permitir envio com ENTER ---
document.getElementById("resposta").addEventListener("keypress", function(e) {
    if (e.key === "Enter") {
        document.getElementById("enviar").click();
    }
});

// --- BOTÃO DESISTIR ---
document.getElementById("desistir").onclick = () => {
    alert(`Você desistiu! Nível ${nivel}, XP ${xp}, Vidas ${vidas}`);
    location.reload();
};

// Iniciar jogo
novaPergunta();
