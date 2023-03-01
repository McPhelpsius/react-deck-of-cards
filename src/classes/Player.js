import { React, Component } from "react";
import createCard from '../factories/cardFactory';

class Player extends Component {
    constructor(props) {
        super();
        this.state = {
            id: props.playerId,
            gameInstance: props.gameInstance,
            name: props.name,
            cards: props.cards,
            myTurn: true
        }
        
        this.playCard = this.playCard.bind(this);
    }

    componentDidMount() {
        this.setState({ ...this.state, mounted: true })
        this.receiveCard = this.receiveCard.bind(this);
    }

    receiveCard(card) {
        if (!this.state.mounted) {
            this.state.cards[this.state.cards.length] = card;
        } else {
            this.setState({ ...this.state, cards: [...this.state.cards, card] })
        }
    }

    clearHand() {
        this.setState({ ...this.state, cards: [] });
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

    playCard(clickedCard) {
        // click on card
        // splice card from this.state.cards to remove from array and return
        // trigger next player to play a card
        // let currentTrickContainer = document.getElementById('thisHand').querySelectorAll('.trickContainer')[this.gameInstance.trickIndex];
        // currentTrickContainer.appendChild(thisHandCard);
        
        const cardArray = this.state.cards;
        const selectedCard = cardArray.findIndex(card => {
            return card.suit === clickedCard.props.suit && card.value === clickedCard.props.value
        });

        console.log(selectedCard);
        const playedCard = cardArray.splice(selectedCard, 1)[0];

        this.setState({...this.state, cards: cardArray});

        this.state.gameInstance.acceptCard(playedCard);
        return playedCard;
    }

    takeTurn() {
        this.myTurn = true;
    }
    render() {
        return (
            <div className="flex-column">
                <h4>{this.state.name}</h4>
                <div className="hand-cards">
                {this.state.cards.map(card => createCard({...card, clickHandler: this.playCard}))}
                </div>
            </div>);
        // {this.state.cards.map((card, c) => <Card key={c} name={card.name} suit={card.suit} />)}
    }
}

export default Player;