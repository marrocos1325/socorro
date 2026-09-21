const form = document.getElementById("Quiz");
const botao = document.getElementById("serasa");

const respostasCorretas = {
    q1: "A",
    q2: "D",
    q3: "A",
    q4: "B",
    q5: "A"
};

botao.addEventListener("click", function (event) {
    event.preventDefault();

    let acertos = 0;
    let respondidas = 0;

    for (let pergunta in respostasCorretas) {
        const resposta = document.querySelector(
            `input[name="${pergunta}"]:checked`
        );

        if (resposta) {
            respondidas++;

            if (resposta.value === respostasCorretas[pergunta]) {
                acertos++;
            }
        }
    }

    const nome = document.querySelector('input[nome="nobru"]').value;

    if (nome.trim() === "") {
        alert("Digite seu nome antes de enviar!");
        return;
    }

    if (respondidas < 5) {
        alert("Responda todas as perguntas antes de enviar!");
        return;
    }

    const resultado = `
RESULTADO DO QUIZ
=================

Nome: ${nome}

Acertos: ${acertos}/5
Erros: ${5 - acertos}/5

Porcentagem: ${(acertos / 5) * 100}%

Obrigado por participar!
`;

    // Mostra o resultado na página
    let resultadoTela = document.getElementById("resultado");

    if (!resultadoTela) {
        resultadoTela = document.createElement("div");
        resultadoTela.id = "resultado";
        document.querySelector("main").appendChild(resultadoTela);
    }

    resultadoTela.innerHTML = `
        <h2>Resultado</h2>
        <p><strong>Nome:</strong> ${nome}</p>
        <p><strong>Você acertou ${acertos} de 5 questões!</strong></p>
        <p>Erros: ${5 - acertos}</p>
        <p>Porcentagem: ${(acertos / 5) * 100}%</p>
    `;

    // Cria o arquivo para download
    const arquivo = new Blob([resultado], {
        type: "text/plain;charset=utf-8"
    });

    const url = URL.createObjectURL(arquivo);

    const link = document.createElement("a");
    link.href = url;
    link.download = `resultado_${nome.replace(/\s+/g, "_")}.txt`;

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    URL.revokeObjectURL(url);
});