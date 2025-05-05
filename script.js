let deck = [];
let playerHand = [];

function startGame() {
  deck = createDeck();
  playerHand = [];
  document.getElementById("message").textContent = "Jogo iniciado! Boa sorte!";
  document.getElementById("player-cards").innerHTML = "";
  document.getElementById("player-total").textContent = "0";
  drawCard();
  drawCard();
}

function createDeck() {
  const cards = [];
  const values = [2, 3, 4, 5, 6, 7, 8, 9, 10, "J", "Q", "K", "A"];
  const suits = ["♦", "♥", "♠", "♣"];

  for (let suit of suits) {
    for (let value of values) {
      cards.push({ value, suit });
    }
  }

  return shuffle(cards);
}

function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

function drawCard() {
  if (deck.length === 0) return;

  const card = deck.pop();
  playerHand.push(card);
  showCard(card);
  updateTotal();
}

function showCard(card) {
  const cardDiv = document.createElement("div");
  cardDiv.className = "card";
  cardDiv.textContent = `${card.value}${card.suit}`;
  document.getElementById("player-cards").appendChild(cardDiv);
}

function updateTotal() {
  let total = 0;
  let aces = 0;

  for (let card of playerHand) {
    if (typeof card.value === "number") {
      total += card.value;
    } else if (card.value === "A") {
      total += 11;
      aces += 1;
    } else {
      total += 10;
    }
  }

  // Ajustar Ás de 11 para 1 se passar de 21
  while (total > 21 && aces > 0) {
    total -= 10;
    aces--;
  }

  document.getElementById("player-total").textContent = total;

  if (total > 21) {
    document.getElementById("message").textContent = "Você perdeu! Passou de 21.";
  } else if (total === 21) {
    document.getElementById("message").textContent = "Parabéns! Você fez 21!";
  }
}

function stopGame() {
  const total = parseInt(document.getElementById("player-total").textContent);
  if (total < 21) {
    document.getElementById("message").textContent = `Você parou com ${total} pontos.`;
  }
}
