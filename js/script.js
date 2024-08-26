document.getElementById('blackjack-form').addEventListener('submit', function(e) {
    e.preventDefault();

    // Obter entradas
    const playerCardsInput = document.getElementById('player-cards').value;
    const dealerCard = parseInt(document.getElementById('dealer-card').value);
    const isPair = document.getElementById('is-pair').value;
    const canDouble = document.getElementById('can-double').value;

    // Converter cartas do jogador em um array de números
    const playerCards = playerCardsInput.split(',').map(card => parseInt(card.trim()));
    
    // Calcular a soma das cartas do jogador
    let playerSum = 0;
    let hasAce = false;
    
    for (let card of playerCards) {
        if (card === 1) {
            hasAce = true;
            playerSum += 11;
        } else {
            playerSum += card;
        }
    }

    // Ajustar a soma se houver um Ás e a soma for maior que 21
    if (playerSum > 21 && hasAce) {
        playerSum -= 10;
    }

    // Determinar a ação recomendada
    let action = '';
    let resultClass = '';

    if (isPair === 'yes') {
        if (playerCards.length === 2 && playerCards[0] === playerCards[1]) {
            if (playerCards[0] === 8 || playerCards[0] === 11) {
                action = 'Divida suas cartas.';
                resultClass = 'split';
            } else if (playerCards[0] === 10) {
                action = 'Não divida suas cartas.';
                resultClass = 'stay';
            } else {
                action = 'Considere dividir suas cartas se a estratégia básica recomendar.';
                resultClass = 'split';
            }
        } else {
            action = 'Não é um par válido para divisão.';
            resultClass = 'stay';
        }
    } else if (canDouble === 'yes') {
        if (playerSum === 11) {
            action = 'Dobre sua aposta.';
            resultClass = 'double';
        } else if (playerSum === 10 && dealerCard >= 2 && dealerCard <= 9) {
            action = 'Dobre sua aposta.';
            resultClass = 'double';
        } else if (playerSum === 9 && dealerCard >= 3 && dealerCard <= 6) {
            action = 'Dobre sua aposta.';
            resultClass = 'double';
        } else {
            action = 'Não é o momento ideal para dobrar.';
            resultClass = 'stay';
        }
    } else {
        if (playerSum < 12) {
            action = 'Peça mais cartas.';
            resultClass = 'buy';
        } else if (playerSum >= 12 && playerSum <= 16) {
            if (dealerCard >= 2 && dealerCard <= 6) {
                action = 'Fique com sua mão.';
                resultClass = 'stay';
            } else {
                action = 'Peça mais cartas.';
                resultClass = 'buy';
            }
        } else if (playerSum === 17) {
            action = 'Fique com sua mão.';
            resultClass = 'stay';
        } else {
            action = 'Ação recomendada: Ficar com sua mão.';
            resultClass = 'stay';
        }
    }

    const resultElement = document.getElementById('result');
    resultElement.textContent = `Ação Recomendada: ${action}`;
    resultElement.className = resultClass;
});
