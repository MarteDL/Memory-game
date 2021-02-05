/*

1. We need to create a deck with 20 cards in which each card appears twice
2. this deck needs to be shuffled at the start of the game so the cards appear randomly
3. at first all the cards need to be witch their backs to us
4. When a card is clicked the image needs to appear
5. after clicking 2 cards we need to check whether they are the same
        -> if not: turn and play again
        -> if yes: they need to stay with their img up

 */

// create a deck of 20 pokemon cards
function createDeck() {

    // array with our 10 pokemon
    let deck = [
        "images/bulbasaur.png",
        "images/caterpie.png",
        "images/charmander.png",
        "images/ekans.png",
        "images/pidgey.png",
        "images/pikachu.png",
        "images/rattata.png",
        "images/sandshrew.png",
        "images/spearow.png",
        "images/squirtle.png"
    ];

    // double our cards so there are two of each pokemon
    deck = deck.concat(deck);

    // shuffle our 20 cards so they all have a random place in the array
    function shuffle(array) {
        for (let i = array.length - 1; i > 0; i--) {
            let j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
    }

    shuffle(deck);

    //create 4 rows (card-decks in Bootstrap)
    for (let i = 0; i < 4; i++) {
        let row = document.createElement("div");
        row.id = "card-deck-" + i;
        row.classList.add("card-deck");

        document.getElementById("all-cards").appendChild(row);
    }

    // create 20 card divs with id=card[i] and src is deck[i]
    deck.forEach((pokemon, i) => {

        let card = document.createElement("div");
        card.classList.add("card", "mb-4");
        card.id = "card" + i;

        let image = document.createElement("img");
        image.classList.add("card-img-top");
        image.src = pokemon;

        card.appendChild(image);

        // put 5 card divs in each row
        switch (i) {
            case 0:
            case 1:
            case 2:
            case 3:
            case 4:
                document.getElementById("card-deck-0").appendChild(card);
                break;
            case 5:
            case 6:
            case 7:
            case 8:
            case 9:
                document.getElementById("card-deck-1").appendChild(card);
                break;
            case 10:
            case 11:
            case 12:
            case 13:
            case 14:
                document.getElementById("card-deck-2").appendChild(card);
                break;
            case 15:
            case 16:
            case 17:
            case 18:
            case 19:
                document.getElementById("card-deck-3").appendChild(card);
                break;
        }
    })
}

createDeck();

let pokedex = [];

// create array with 20 objects: one for each card
// inside each object we store the cardId and src when turned up
function createPokedex() {

    document.querySelectorAll("div.card").forEach((card, index) => {
        let cardObject = {
            cardId: card.id,
            imgSrcWhenUp: card.getElementsByTagName("img")[0].src,
            imgSrcWhenDown: "images/pokeball.png",
            cardIsUp: false,
            pairIsFound: false,
        }

        pokedex.push(cardObject);

        card.getElementsByTagName("img")[0].src = cardObject.imgSrcWhenDown;
    })
}

createPokedex();

// when you click a card turn it up so you can see the pokemon

document.querySelectorAll("div.card").forEach((div, i) => {
    div.addEventListener("click", () => {

        if(pokedex[i].cardIsUp){
            return;
        }

        let turnedUpCards = pokedex.filter(card => card.cardIsUp && !card.pairIsFound)

        if(turnedUpCards.length === 2){
            return;
        }

        turnCard();

        function turnCard() {
            pokedex[i].cardIsUp = !pokedex[i].cardIsUp;
            let img = document.getElementById("card" + i).firstChild;
            img.src = pokedex[i].imgSrcWhenUp;
        }

        // check if there is another card up and check if they are a pair

        pokedex.forEach((card, j) => {

            if (pokedex[j].cardIsUp && (pokedex[j].pairIsFound === false) && (j !== i)) {
                checkForPairs(i, j);
            }

            // a function that checks if two cards with indexes i and j are a pair
            // if no they turn back down after 1 second, if yes they stay up
            // once the pair has been found, we make them opaque and make sure they can't be clicked anymore

            function checkForPairs(i, j) {
                if (pokedex[i].imgSrcWhenUp === pokedex[j].imgSrcWhenUp) {
                    pokedex[i].pairIsFound = true;
                    pokedex[j].pairIsFound = true;

                    let image = document.createElement("img");
                    image.classList.add("pokedex-img");
                    image.src = pokedex[i].imgSrcWhenUp;

                    document.getElementById("pokedex").appendChild(image);
                    document.getElementById("card" + i).classList.add("opaque");
                    document.getElementById("card" + j).classList.add("opaque");

                } else {
                    setTimeout(function () {
                        let img = document.getElementById("card" + i).firstChild;
                        img.src = pokedex[i].imgSrcWhenDown;
                        pokedex[i].cardIsUp = false;

                        let img2 = document.getElementById("card" + j).firstChild;
                        img2.src = pokedex[j].imgSrcWhenDown;
                        pokedex[j].cardIsUp = false;
                    }, 1000);
                }
            }
        })
    })
})

