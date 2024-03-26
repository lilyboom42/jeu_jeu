const cards = [
    'image1.jpg', 'image1.jpg',
    'image2.jpg', 'image2.jpg',
    'image3.jpg', 'image3.jpg',
    'image4.jpg', 'image4.jpg',
  ];
  
  let moves = 0;
  let pairsFound = 0;
  let firstCard = null;
  let secondCard = null;
  
  function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  }
  
  function createGrid() {
    const gridContainer = document.getElementById('gridContainer');
    gridContainer.innerHTML = '';
    for (let i = 0; i < cards.length; i++) {
      const card = document.createElement('div');
      card.classList.add('card');
      card.dataset.index = i;
      card.addEventListener('click', handleCardClick);
      const img = document.createElement('img');
      img.src = 'back.jpg';
      card.appendChild(img);
      gridContainer.appendChild(card);
    }
  }
  
  function handleCardClick(event) {
    const clickedCard = event.target.closest('.card');
    if (!clickedCard || clickedCard.classList.contains('active')) return;
  
    const index = parseInt(clickedCard.dataset.index);
    const image = cards[index];
  
    if (firstCard === null) {
      firstCard = { card: clickedCard, image: image };
      showCard(firstCard);
    } else if (secondCard === null) {
      secondCard = { card: clickedCard, image: image };
      showCard(secondCard);
      moves++;
      document.getElementById('moves').textContent = 'Nombre de mouvements : ' + moves;
      if (firstCard.image === secondCard.image) {
        pairsFound++;
        if (pairsFound === cards.length / 2) {
          endGame();
        }
        firstCard = null;
        secondCard = null;
      } else {
        setTimeout(hideCards, 1000);
      }
    }
  }
  
  function showCard(card) {
    card.card.classList.add('active');
    card.card.querySelector('img').src = card.image;
  }
  
  function hideCards() {
    firstCard.card.classList.remove('active');
    secondCard.card.classList.remove('active');
    firstCard.card.querySelector('img').src = 'back.jpg';
    secondCard.card.querySelector('img').src = 'back.jpg';
    firstCard = null;
    secondCard = null;
  }
  
  function endGame() {
    const message = document.getElementById('message');
    message.textContent = `Félicitations ! Vous avez trouvé toutes les paires en ${moves} mouvements.`;
  }
  
  function startGame() {
    moves = 0;
    pairsFound = 0;
    firstCard = null;
    secondCard = null;
    document.getElementById('moves').textContent = 'Nombre de mouvements : 0';
    document.getElementById('message').textContent = '';
    shuffle(cards);
    createGrid();
  }
  
  startGame();
  