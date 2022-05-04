function makeDeck(): string[]
{

    let deck: string[] = [];
    let colors = ["h", "d", "c", "s"];
    let cards = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "T", "J", "Q", "K"];

    for (let card of cards)
    {
        for (let color of colors)
        {
            deck.push(card+color);
        };
    };

    // Shuffle the deck
    for (let i = deck.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        const temp = deck[i];
        deck[i] = deck[j];
        deck[j] = temp;
    }

    return deck;
}

export default makeDeck;