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

// ------------------------------------------------------
// 🔊 Função de acerto (som + flash verde)
// ------------------------------------------------------
function acertouEfeito() {
    // toca o som
    if (somAcerto) {
        somAcerto.currentTime = 0;
        somAcerto.play().catch(()=>{});
    }

    // flash verde na tela
    document.body.classList.add("flash-verde");
    setTimeout(() => {
        document.body.classList.remove("flash-verde");
    }, 400);
}

// ------------------------------------------------------
// Gera nova pergunta
// ------------------------------------------------------
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
        perguntaDiv.innerHTML = `${a} × ${b}`

