let nivel = 1;
let xp = 0;
let vidas = 5;

const nivelSpan = document.getElementById("nivel");
const xpSpan = document.getElementById("xp");
const vidasSpan = document.getElementById("vidas");
const perguntaDiv = document.getElementById("pergunta");
const mensagem = document.getElementById("mensagem");

const somAcerto = document.getElementById("som-acerto"); // <- garante que existe o elemento <audio>

let respostaCerta;

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
    } else { // divisão: mostramos um número divisível
        respostaCerta = a;
        perguntaDiv.innerHTML = `${a * b} ÷ ${b}`;
    }
}

function ganharXP() {
    // fórmula: (100 / n + n), arredondando para inteiro
    let ganho = Math.floor(100 / nivel + nivel);
    xp += ganho;

    // exemplo de limite para subir de nível: xp >= nivel * 120 (pode ajustar)
    if (xp >= nivel * 120) {
        xp = 0;
        nivel++;
    }
}

document.getElementById("enviar").onclick = () => {
    const resposta = Number(document.getElementById("resposta").value);

    if (isNaN(resposta)) {
        mensagem.textContent = "Digite um número!";
        mensagem.className = "errou";
        setTimeout(() => { mensagem.textContent = ""; mensagem.className = ""; }, 800);
        return;
    }

    if (resposta === respostaCerta) {
        // toca som de acerto — só funciona depois de interação do usuário (click), então OK
        if (somAcerto) {
            // ignora erros de play por políticas do navegador
            somAcerto.currentTime = 0;
            somAcerto.play().catch(()=>{/* autoplay bloqueado — nada a fazer */});
        }

        mensagem.textContent = "Você acertou!";
        mensagem.className = "acertou";
        ganharXP();
    } else {
        mensagem.textContent = `Você errou! Era ${respostaCerta}`;
        mensagem.className = "errou";
        vidas--;
        if (vidas <= 0) {
            alert("Game Over! Reiniciando o jogo.");
            location.reload();
            return;
        }
    }

    nivelSpan.textContent = nivel;
    xpSpan.textContent = xp;
    vidasSpan.textContent = vidas;

    document.getElementById("resposta").value = "";

    // limpar a mensagem e gerar nova pergunta depois de 700ms
    setTimeout(() => {
        mensagem.textContent = "";
        mensagem.className = "";
        novaPergunta();
    }, 700);
};

document.getElementById("desistir").onclick = () => {
    alert(`Você desistiu! Pontos finais: Nível ${nivel}, XP ${xp}, Vidas ${vidas}`);
    location.reload();
};

novaPergunta();
