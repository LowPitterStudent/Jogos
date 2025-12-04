// script.js — versão corrigida e robusta

document.addEventListener("DOMContentLoaded", () => {
    let nivel = 1;
    let xp = 0;
    let vidas = 5;

    const nivelSpan = document.getElementById("nivel");
    const xpSpan = document.getElementById("xp");
    const vidasSpan = document.getElementById("vidas");
    const perguntaDiv = document.getElementById("pergunta");
    const mensagem = document.getElementById("mensagem");
    const respostaInput = document.getElementById("resposta");
    const enviarBtn = document.getElementById("enviar");
    const desistirBtn = document.getElementById("desistir");
    const somAcerto = document.getElementById("som-acerto");

    let respostaCerta = null;

    // --- Gera nova pergunta ---
    function novaPergunta() {
        const a = Math.floor(Math.random() * (nivel + 4)) + 1;
        const b = Math.floor(Math.random() * (nivel + 4)) + 1;

        const operacoes = ["+", "-", "*", "/"];
        const op = operacoes[Math.floor(Math.random() * operacoes.length)];

        if (op === "+") {
            respostaCerta = a + b;
            perguntaDiv.innerText = `${a} + ${b}`;
        } else if (op === "-") {
            respostaCerta = a - b;
            perguntaDiv.innerText = `${a} - ${b}`;
        } else if (op === "*") {
            respostaCerta = a * b;
            perguntaDiv.innerText = `${a} × ${b}`;
        } else { // divisão: sempre mostramos valor inteiro (a*b ÷ b = a)
            respostaCerta = a;
            perguntaDiv.innerText = `${a * b} ÷ ${b}`;
        }

        // limpa e foca o input para digitar rápido
        respostaInput.value = "";
        respostaInput.focus();
    }

    // --- Efeito de acerto (som + flash) ---
    function efeitoAcerto() {
        if (somAcerto) {
            somAcerto.currentTime = 0;
            somAcerto.play().catch(() => {});
        }
        document.body.classList.add("flash-verde");
        setTimeout(() => document.body.classList.remove("flash-verde"), 350);
    }

    // --- Ganhar XP e subir nível ---
    function ganharXP() {
        const ganho = Math.floor(100 / nivel + nivel);
        xp += ganho;
        if (xp >= nivel * 120) {
            xp = 0;
            nivel++;
        }
    }

    // --- Atualiza o placar na tela ---
    function atualizarPlacar() {
        nivelSpan.textContent = nivel;
        xpSpan.textContent = xp;
        vidasSpan.textContent = vidas;
    }

    // --- Checa resposta (essa função é chamada por botão e por Enter) ---
    function checarResposta() {
        // recuperar valor do input e converter para número inteiro
        const raw = respostaInput.value.trim();
        if (raw === "") {
            mensagem.innerText = "Digite um número!";
            mensagem.className = "errou";
            setTimeout(() => { mensagem.innerText = ""; mensagem.className = ""; }, 800);
            return;
        }

        // permitir negativos, usar parseInt para inteiro
        const resposta = parseInt(raw, 10);
        if (Number.isNaN(resposta)) {
            mensagem.innerText = "Digite um número válido!";
            mensagem.className = "errou";
            setTimeout(() => { mensagem.innerText = ""; mensagem.className = ""; }, 800);
            return;
        }

        if (resposta === respostaCerta) {
            mensagem.innerText = "Você acertou!";
            mensagem.className = "acertou";
            efeitoAcerto();
            ganharXP();
        } else {
            mensagem.innerText = `Você errou! Era ${respostaCerta}`;
            mensagem.className = "errou";
            vidas--;
            if (vidas <= 0) {
                alert("Game Over! Reiniciando.");
                location.reload();
                return;
            }
        }

        atualizarPlacar();

        // limpa input e mostra próxima pergunta após pequena pausa
        setTimeout(() => {
            mensagem.innerText = "";
            mensagem.className = "";
            novaPergunta();
        }, 700);
    }

    // --- Eventos ---
    enviarBtn.addEventListener("click", checarResposta);

    // permitir enviar com ENTER (keydown é mais confiável)
    respostaInput.addEventListener("keydown", (e) => {
        if (e.key === "Enter") {
            e.preventDefault(); // previne comportamento padrão
            checarResposta();
        }
    });

    desistirBtn.addEventListener("click", () => {
        alert(`Você desistiu! Nível ${nivel}, XP ${xp}, Vidas ${vidas}`);
        location.reload();
    });

    // iniciar
    atualizarPlacar();
    novaPergunta();
});
