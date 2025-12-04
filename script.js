let acertos = 0;
let erros = 0;
let pulos = 0;
let pontos = 0;

let numero1, numero2, respostaCorreta;

function gerarConta() {
    numero1 = Math.floor(Math.random() * 10) + 1;
    numero2 = Math.floor(Math.random() * 10) + 1;

    respostaCorreta = numero1 + numero2;

    document.getElementById("conta").innerText =
        `${numero1} + ${numero2} = ?`;

    document.getElementById("mensagem").innerText = "";
    document.getElementById("resposta").value = "";
}

function verificar() {
    let respostaUsuario = parseInt(document.getElementById("resposta").value);

    if (isNaN(respostaUsuario)) {
        document.getElementById("mensagem").innerText =
            "Digite um número!";
        return;
    }

    if (respostaUsuario === respostaCorreta) {
        acertos++;
        pontos += 5;
        document.getElementById("mensagem").innerText =
            "✔ Acertou!";
    } else {
        erros++;
        document.getElementById("mensagem").innerText =
            `❌ Errou! A resposta era ${respostaCorreta}`;
    }

    atualizarPlacar();
    gerarConta();
}

function pular() {
    pulos++;
    document.getElementById("mensagem").innerText =
        `↪ Você pulou! A resposta era ${respostaCorreta}`;

    atualizarPlacar();
    gerarConta();
}

function atualizarPlacar() {
    document.getElementById("acertos").innerText = acertos;
    document.getElementById("erros").innerText = erros;
    document.getElementById("pulos").innerText = pulos;
    document.getElementById("pontos").innerText = pontos;
}

gerarConta();
