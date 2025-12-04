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

function novaPergunta() {
    const a = Math.floor(Math.random() * (nivel + 4)) + 1;
    const b = Math.floor(Math.random() * (nivel + 4)) + 1;

    const operacoes = ["+", "-", "*", "/"];
    const op = operacoes[Math.floor(Math.random() * operacoes.length)];

    if (op === "+") respostaCerta = a + b;
    if (op === "-") respostaCerta = a - b;
    if (op === "*") respostaCerta = a * b;
    if (op === "/") {
        respostaCerta = a;
        perguntaDiv.innerHTML = `${a * b} ÷ ${b}`;
        return;
    }

    perguntaDiv.innerHTML = `${a} ${op} ${b}`;
}

function ganharXP() {
    let ganho = Math.floor(100 / nivel + nivel);
    xp += ganho;

    if (xp >= nivel * 120) {
        xp = 0;
        nivel++;
    }
}

document.getElementById("enviar").onclick = () => {
    const resposta = Number(document.getElementById("resposta").value);

    if (resposta === respostaCerta) {
        somAcerto.play();
        mensagem.textContent = "Você acertou!";
        mensagem.className = "acertou";
        ganharXP();
    } else {
        mensagem.textContent = "Você errou!";
        mensagem.className = "errou";
        vidas--;

        if (vidas === 0) {
            alert("Game Over!");
            location.reload();
        }
    }

    nivelSpan.textContent = nivel;
    xpSpan.textContent = xp;
    vidasSpan.textContent = vidas;

    document.getElementById("resposta").value = "";

    setTimeout(() => {
        mensagem.textContent = "";
        mensagem.className = "";
    }, 600);

    novaPergunta();
};

document.getElementById("desistir").onclick = () => {
    alert("Você desistiu!");
    location.reload();
};

novaPergunta();
