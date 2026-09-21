const botao = document.getElementById("nobru");

botao.addEventListener("click", function () {
    const checkboxes = document.querySelectorAll(".paulao");


    let texto = "MANGÁS ALUGADOS\n";
    texto += "========================\n\n";

    let algumSelecionado = false;

    checkboxes.forEach(function (checkbox) {

        if (checkbox.checked) {
            algumSelecionado = true;

            const linha = checkbox.closest("tr");

            const codigo = linha.cells[0].textContent.trim();
            const produto = linha.cells[1].textContent.trim();
            const quantidade = linha.cells[2].textContent.trim();
            const caracteristicas = linha.cells[4].textContent.trim();

            texto += `Código: ${codigo}\n`;
            texto += `Produto: ${produto}\n`;
            texto += `Quantidade: ${quantidade}\n`;
            texto += `Características: ${caracteristicas}\n`;
            texto += "------------------------\n";
        }
    });

    if (!algumSelecionado) {
        alert("Marque pelo menos um mangá para alugar!");
        return;
    }

    const arquivo = new Blob([texto], {
        type: "text/plain;charset=utf-8"
    });

    const link = document.createElement("a");

    link.href = URL.createObjectURL(arquivo);
    link.download = "mangas_alugados.txt";

    link.click();

    URL.revokeObjectURL(link.href);
});
