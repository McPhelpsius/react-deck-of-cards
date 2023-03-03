import { React, Component } from "react";
import createCard from '../factories/cardFactory';
import ErrorBoundary from './ErrorBoundary';

class Player extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: props.name,
            cards: props.cards,
            myTurn: false
        }

        this.playCard = this.playCard.bind(this);
        this.receiveCard = this.receiveCard.bind(this);
    }

    receiveCard(card) {
        this.setState({ ...this.state, cards: [...this.state.cards, card] });
    }

    clearHand() {
        this.setState({ ...this.state, cards: [] });
    }


    playCard(clickedCard) {
        // trigger next player to play a card
        if (this.props.id !== this.props.gameInstance.state.whoseTurnIndex) {
            alert('you know better');
            return false;
        }

        const cardArray = this.state.cards;
        const selectedCard = cardArray.findIndex(card => {
            return card.suit === clickedCard.props.suit && card.value === clickedCard.props.value
        });

        const playedCard = cardArray.splice(selectedCard, 1)[0];
        this.props.gameInstance.acceptCard(playedCard);

        this.setState({ ...this.state, cards: cardArray, myTurn: false });
    }

    startTurn() {
        this.setState({ ...this.state, myTurn: true });
    }

    render() {
        return (
            <ErrorBoundary>
                <div className="flex-column">
                    <h4>{this.state.name} - {this.state.myTurn}</h4>
                    <div className="hand-cards">
                        {this.state.cards.map(card => createCard({ ...card, clickHandler: this.playCard }))}
                    </div>
                </div>
            </ErrorBoundary>
        );
    }
}

export default Player;