let deck = [];
let playerHand = [];
let dealerHand = [];

function startGame() {
  deck = createDeck();
  playerHand = [];
  dealerHand = [];

  document.getElementById("player-cards").innerHTML = "";
  document.getElementById("dealer-cards").innerHTML = "";
  document.getElementById("message").textContent = "Seu turno!";
  document.getElementById("draw-btn").disabled = false;
  document.getElementById("stop-btn").disabled = false;

  // Duas cartas para cada
  playerHand.push(drawFromDeck());
  playerHand.push(drawFromDeck());
  dealerHand.push(drawFromDeck());
  dealerHand.push(drawFromDeck());

  updateUI();
  checkWinner();
}

function createDeck() {
  const deck = [];
  const values = [2, 3, 4, 5, 6, 7, 8, 9, 10, "J", "Q", "K", "A"];
  const suits = ["♦", "♥", "♠", "♣"];

  for (let suit of suits) {
    for (let value of values) {
      deck.push({ value, suit });
    }
  }

  return shuffle(deck);
}

function shuffle(deck) {
  for (let i = deck.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [deck[i], deck[j]] = [deck[j], deck[i]];
  }
  return deck;
}

function drawFromDeck() {
  return deck.pop();
}

function drawCard() {
  playerHand.push(drawFromDeck());
  updateUI();
  checkWinner();
}

function stopGame() {
  document.getElementById("draw-btn").disabled = true;
  document.getElementById("stop-btn").disabled = true;
  dealerTurn();
}

function dealerTurn() {
  updateUI();
  let dealerTotal = calculateTotal(dealerHand);
  const playerTotal = calculateTotal(playerHand);

  const interval = setInterval(() => {
    dealerTotal = calculateTotal(dealerHand);
    if (dealerTotal < 17 && dealerTotal < playerTotal) {
      dealerHand.push(drawFromDeck());
      updateUI();
    } else {
      clearInterval(interval);
      determineWinner();
    }
  }, 1000);
}

function calculateTotal(hand) {
  let total = 0;
  let aces = 0;

  for (let card of hand) {
    if (typeof card.value === "number") {
      total += card.value;
    } else if (card.value === "A") {
      total += 11;
      aces++;
    } else {
      total += 10;
    }
  }

  while (total > 21 && aces > 0) {
    total -= 10;
    aces--;
  }

  return total;
}

function updateUI() {
  renderHand("player-cards", playerHand);
  renderHand("dealer-cards", dealerHand);
  document.getElementById("player-total").textContent = calculateTotal(playerHand);
  document.getElementById("dealer-total").textContent = calculateTotal(dealerHand);
}

function renderHand(elementId, hand) {
  const container = document.getElementById(elementId);
  container.innerHTML = "";
  for (let card of hand) {
    const div = document.createElement("div");
    div.className = "card";
    div.textContent = `${card.value}${card.suit}`;
    container.appendChild(div);
  }
}

function checkWinner() {
  const total = calculateTotal(playerHand);
  if (total > 21) {
    document.getElementById("message").textContent = "Você perdeu! Passou de 21.";
    endGame();
  } else if (total === 21) {
    document.getElementById("message").textContent = "Blackjack! Você fez 21!";
    stopGame();
  }
}

function determineWinner() {
  const playerTotal = calculateTotal(playerHand);
  const dealerTotal = calculateTotal(dealerHand);

  let message = "";

  if (dealerTotal > 21) {
    message = "A máquina passou de 21. Você venceu!";
  } else if (dealerTotal === playerTotal) {
    message = "Empate!";
  } else if (playerTotal > dealerTotal) {
    message = "Você venceu!";
  } else {
    message = "A máquina venceu!";
  }

  document.getElementById("message").textContent = message;
  endGame();
}

function endGame() {
  document.getElementById("draw-btn").disabled = true;
  document.getElementById("stop-btn").disabled = true;
}
