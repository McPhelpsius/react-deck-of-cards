import createCard from '../factories/cardFactory.js';
import Player from './Player';
import { Component } from 'react';

class Game extends Component {
    constructor() {
        super();
        this.state = {
            whoseTurnIndex: 0,
            removed: [],
            discardPile: [],
            handCounter: 0,
            currentTrickCards: [],
            numberOfPlayers: 2,
            playerNames: ['Alan', 'Bradley'],
            players: [],
            currentTrickIndex: 0,
            tricksPlayed: [],
            deck: this.prepareDeck(),
            isFormVisible: true
        }

        this.initiate = this.initiate.bind(this);
        this.begin = this.begin.bind(this);
        this.shuffle = this.shuffle.bind(this);
        this.deal = this.deal.bind(this);
        this.getPlayerNamesFromForm = this.getPlayerNamesFromForm.bind(this);
        this.updateNumberOfPlayers = this.updateNumberOfPlayers.bind(this);
        this.updatePlayerName = this.updatePlayerName.bind(this);
        this.playATrick = this.playATrick.bind(this);

    }
    componentDidMount() {
        this.table = document.getElementById('cardTable');
        this.tablePlayedCards = this.table.querySelector('#thisHand');
    }

    prepareDeck() {
        // cardNames is available
        // this.gameSettings = this.configureDeck();
        const cardValues = [
            { name: 'Ace', value: 1 }, { name: '2', value: 2 }, { name: '3', value: 3 },
            { name: '4', value: 4 }, { name: '5', value: 5 }, { name: '6', value: 6 }, { name: '7', value: 7 },
            { name: '8', value: 8 }, { name: '9', value: 9 }, { name: '10', value: 10 },
            { name: 'Jack', value: 11 }, { name: 'Queen', value: 12 }, { name: 'King', value: 13 }];

        const suits = ['Heart', 'Spade', 'Diamond', 'Club'];
        // if (this.gameSettings.aceHigh === "true") {
        //     const ace = cardNames.shift();
        //     cardNames[cardNames.length] = ace;
        // }

        // let cardsUsed = this.gameSettings.cards;

        const cards = suits.map((suit) => {
            return cardValues.map((card) => {
                const obj = { ...card, suit };
                return obj;
            });
        }).flat();

        return cards;
    }

    // configureDeck() {

    //     let gameConfigs = {},
    //     // configDataArray = location.search.slice(1).split("&");

    //     for (var d = 0; d < configDataArray.length; d++) {
    //         let dat = configDataArray[d].split("="),
    //             datNext = [],
    //             datKey = dat[0],
    //             datData = dat[1];

    //         if (configDataArray[d + 1]) {
    //             datNext = configDataArray[d + 1].split("=");
    //         }

    //         if (!gameConfigs[datKey]) {
    //             if (datNext[0] === datKey) {
    //                 gameConfigs[datKey] = [datData];
    //             } else {
    //                 gameConfigs[datKey] = datData;
    //             }

    //         } else {

    //             gameConfigs[datKey].push(datData);
    //         }
    //     }

    //     return gameConfigs;
    // }

    initiate(event) {
        event.preventDefault();

        const playerNames = this.getPlayerNamesFromForm([...event.target.elements]);
        this.setState({ ...this.state, playerNames, isFormVisible: false });
    }

    begin() {
        this.deal();
    }

    getPlayerNamesFromForm(formElements) {
        return formElements
            .filter(element => element.type === "text")
            .map(input => input.value);
    }

    updateNumberOfPlayers(event) {
        let numberOfPlayers = parseFloat(event.target.value);
        let playerNames = this.state.playerNames;
        let players = this.state.players;

        if (numberOfPlayers > playerNames.length) {
            let p;
            for (p = 0; p < numberOfPlayers; p++) {
                playerNames[p] = playerNames[p] || '';
            }
        }
        else {
            playerNames.length = numberOfPlayers;
        }

        players.length = numberOfPlayers;

        this.setState({ ...this.state, numberOfPlayers, playerNames, players });
    }

    updatePlayerName(event) {
        const newPlayersNamesState = this.state.playerNames;
        newPlayersNamesState[event.target.attributes[0].value] = event.target.value;
        this.setState({ ...this.state, playerNames: newPlayersNamesState });
    }

    deal() {
        // this.clearHands();
        // this.enterPlayers()
        const playersCount = this.state.numberOfPlayers;

        this.shuffle();

        // deal cards to an array of arrays
        let dealtCards = [];

        let p = 0;
        for (let card = 0; card < this.state.deck.length; card++) {
            if (!dealtCards[p]) dealtCards[p] = [];

            dealtCards[p].push(this.state.deck[card]);
            p++;
            // there should be one array for each player
            if (p === playersCount) {
                p = 0;
            }
        }

        // create players 
        // dealtCards with same index as player will be the cards prop for each player
        let players = [];
        for (let player = 0; player < playersCount; player++) {
            const playerCards = dealtCards[player].map(card => { return { ...card, playerId: player } })
            players[players.length] = new Player({ id: player, name: this.state.playerNames[player], gameInstance: this, cards: playerCards });
        }
        // this.buildHands();
        // for (let x = 0; x < this.state.players.length; x++) {
        //     this.state.players[x].readyCards();
        // }
        this.setState({ ...this.state, players });
    }

    clearHands() {
        const players = [];

        for (let p = 0; p < this.state.players.length; p++) {
            const player = this.state.players[p];

            player.clearHand();

            players[players.length] = player;
        }

        this.setState({ ...this.state, players });
    }

    shuffle() {
        const deck = this.state.deck.sort(function () { return 0.5 - Math.random() });
        this.setState({ ...this.state, deck });
    }

    beginAHand() {
        this.currentTrickIndex = 0;
        this.playATrick();
    }

    finishHand() {
        // done?

        // prepare next hand
    }

    playATrick() {
        // let one player play a card at a time
        this.state.players[0].startTurn();
    }

    acceptCard(card) {
        // when card comes in
        //// add card to trick
        //// iterate to next player
        //// reset to 0 if index is the same as players.length
        if (card.playerId !== this.state.whoseTurnIndex) {
            // deny card
            return false;
        }

        let whoseTurnIndex = this.state.whoseTurnIndex;

        const currentTrickCards = [...this.state.currentTrickCards, card];

        if (currentTrickCards.length === this.state.players.length) {
            this.endTrick(currentTrickCards);
        } else {
            whoseTurnIndex++;
            this.setState({ ...this.state, currentTrickCards, whoseTurnIndex });
        }

    }

    endTrick(currentTrickCards) {
        const trickSortedByValue = currentTrickCards.sort((previous, current) => previous.value < current.value);

        const winner = this.state.players[trickSortedByValue[0].playerId].props;
        const endedTrickObject = { winner: { name: winner.name, id: winner.id }, cards: trickSortedByValue };

        this.setState({
            ...this.state,
            currentTrickCards: [],
            whoseTurnIndex: 0,
            tricksPlayed: [...this.state.tricksPlayed, endedTrickObject]
        });
    }

    trickEndCardAnimations(winner) {

        /// TODO: this isn't configured to '.trickContainer'... fix it
        let trickContainers = document.getElementById("thisHand").querySelectorAll('.trickContainer');
        let latestTrickContainer = trickContainers[trickContainers.length - 1];
        // let firstCardOffsetLeft = document.getElementById("thisHand").querySelector('.card').offsetLeft;
        let firstCardOffsetLeft = latestTrickContainer.querySelector('.card').offsetLeft;
        // let theseHTML = document.getElementById("thisHand").querySelectorAll('.card');
        // let theseHTML = latestTrickContainer.querySelectorAll('.card');
        let theseHTML = document.getElementById('#thisHand').querySelector('.trickContainer:last-child .card');
        let these = this.currentTrickCards;
        ///screwy///
        // for (let t = (theseHTML.length - this.players.length + 1); t < theseHTML.length; t++) {
        //     $(theseHTML[t]).animate({ 'margin-left': '-46px' }).delay(300).animate({ 'margin-left': '-60px' });
        // }

        let winnerTitle = document.createElement('div')
        let winnerText = document.createTextNode(winner.name);
        winnerTitle.appendChild(winnerText);
        winnerTitle.className = 'trickWinner';
        latestTrickContainer.appendChild(winnerTitle);
    }

    nextPlayer() {
        if (this.whoseTurnIndex === this.players.length - 1) {
            this.whoseTurnIndex = 0;
            this.whoWon();
        } else {
            this.whoseTurnIndex++;
            this.players[this.whoseTurnIndex].takeTurn();
        }
    }

    render() {
        // const renderPlayers = <div id="thisHand" className="flex">
        //     {this.state.players.map((player, p) => <div key={`${player.name}-${p}}`}>{player}</div>)}
        // </div>;            

        // can't trigger a player's turn, because the player object isn't in state, only props are
        // put players only in template due 

        return (
            <div id="cardTable">
                {this.state.isFormVisible ?
                    <form id="playersListForm" onSubmit={this.initiate}>
                        <input type="number" value={this.state.numberOfPlayers} onChange={this.updateNumberOfPlayers} step="1" />
                        {this.state.playerNames.map((name, index) => <input key={"player-" + index} data-key={index} value={name} type="text" onChange={this.updatePlayerName} />)}
                        <button type="submit">Submit</button>
                    </form>
                    : null
                }
                <button onClick={this.begin}>Begin</button>
                <div>{this.state.tricksPlayed.map(t => <div className="flex">{t.winner.name}{t.cards.map(card => createCard(card))}</div>)}</div>
                <div id="this-hand" className="flex">
                    {this.state.currentTrickCards.map(card => createCard(card))}
                </div>
                <div className="flex">
                    {this.state.players.map((player, p) => <div key={`${player.name}-${p}}`}><Player id={player.props.id} name={player.props.name} gameInstance={this} cards={player.props.cards} /></div>)}
                </div>

            </div>
        );
    }

}


export default Game;

