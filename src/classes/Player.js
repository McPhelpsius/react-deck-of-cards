import { React, Component } from "react";

class Player extends Component {
    constructor(props) {
        super();
        console.log('PROPS', props)
        this.state = {
            gameInstance: props.gameInstance,
            name: props.name,
            cards: props.cards,
            myTurn: false,
            mounted: false
        }
    }

    componentDidMount() {
        this.setState({ ...this.state, mounted: true })
        this.receiveCard = this.receiveCard.bind(this);
    }

    receiveCard(card) {
        // debugger;
        if (!this.state.mounted) {
            this.state.cards[this.state.cards.length] = card;
        } else {
            this.setState({ ...this.state, cards: [...this.state.cards, card] })
        }
    }

    readyCards() {
        // for (let h = 0; h < theCards.length; h++) {

        //this is bad, this needs to happen after the cards are dealt
        // theCards[h].addEventListener("click", function () {
        //     if (that.myTurn) {
        //         let theseCards = handCards.querySelectorAll('.card');
        //         let discarded = that.playCard(theCards[h], theseCards, handCards);

        //         that.gameInstance.discardPile.push(discarded);
        //         that.gameInstance.currentTrickCards.push(discarded);
        //         console.log(that.gameInstance.discardPile);
        //         console.log(that.name + 'is done');

        //        //that.myTurn will be set to false elsewhere in a future version that allows multiple cards to be played
        //         that.myTurn = false;
        //         that.gameInstance.nextPlayer();
        //     }
        // }, false);
    }

    playCard(card, cards, cardsHTML) {
        let thisHandCard = cardsHTML.removeChild(cards.item([].indexOf.call(cards, card)));
        this.gameInstance.tablePlayedCards.appendChild(thisHandCard);
        let currentTrickContainer = document.getElementById('thisHand').querySelectorAll('.trickContainer')[this.gameInstance.trickIndex];
        currentTrickContainer.appendChild(thisHandCard);
        return this.cards.splice([].indexOf.call(cards, card), 1)[0];
    }

    takeTurn() {
        this.myTurn = true;
    }
    render() {
        return (
            <div className="handCards flex">
                <h4>{this.state.name}</h4>
                {this.state.cards}
            </div>);
        // {this.state.cards.map((card, c) => <Card key={c} name={card.name} suit={card.suit} />)}
    }
}

export default Player;