document.addEventListener("DOMContentLoaded", () => {
    const cards = document.querySelectorAll(".quality-card");
    const mainForm = document.getElementById("mainForm");
    const tipPercentageInput = document.getElementById("tipPercentage");
    let selectedTipPercentage = 0;

    // Função de scroll suave com callback
    const smoothScroll = (callback) => {
        mainForm.scrollIntoView({ behavior: "smooth" });
        if (callback && typeof callback === "function") {
            callback();
        }
    };

    // Função para definir o percentual de gorjeta
    const setTipPercentage = (percentage, message) => {
        selectedTipPercentage = percentage;
        tipPercentageInput.value = `${percentage}% (${message})`;
    };

    // Função de callback para definir a gorjeta após o scroll
    const afterScrollCallback = (percentage, message) => () => {
        setTipPercentage(percentage, message);
    };

    // Evento de clique nos cards
    cards.forEach(card => {
        card.addEventListener("click", (event) => {
            mainForm.classList.remove("d-none");

            if (card.id === "otimo") {
                smoothScroll(afterScrollCallback(10, "Ótimo Atendimento"));
            } else if (card.id === "bom") {
                smoothScroll(afterScrollCallback(5, "Bom Atendimento"));
            } else if (card.id === "regular") {
                smoothScroll(afterScrollCallback(0, "Atendimento Regular"));
            }
        });
    });

    // Arrow function para calcular o valor total e o valor por pessoa
    const calculateBill = (totalBill, numPeople, tipPercentage) => {
        const tipAmount = totalBill * (tipPercentage / 100);
        const totalWithTip = totalBill + tipAmount;
        const amountPerPerson = totalWithTip / numPeople;
        return { totalWithTip, amountPerPerson };
    };

    // Submissão do formulário
    const billForm = document.getElementById("billForm");
    billForm.addEventListener("submit", (event) => {
        event.preventDefault();

        const totalBill = parseFloat(document.getElementById("totalBill").value);
        const numPeople = parseInt(document.getElementById("numPeople").value);

        // Verifica se o número de pessoas é válido
        if (numPeople <= 0) {
            alert("O número de pessoas deve ser maior que 0.");
            return;
        }

        const { totalWithTip, amountPerPerson } = calculateBill(totalBill, numPeople, selectedTipPercentage);

        document.getElementById("totalWithTip").innerText = totalWithTip.toFixed(2);
        document.getElementById("amountPerPerson").innerText = amountPerPerson.toFixed(2);

        document.getElementById("result").style.display = "block";  // Certifique-se de mostrar o resultado
    });
});
