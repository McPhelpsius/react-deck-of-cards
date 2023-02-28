import Spade from './cards/Spade';
import Heart from './cards/Heart';
import Club from './cards/Club';
import Diamond from './cards/Diamond';
import Player from './Player';

import ErrorBoundary from './ErrorBoundary';
import { Component } from 'react';

class Game extends Component {
    constructor() {
        super();
        this.state = {
            whoseTurnIndex: 0,
            removed: [],
            discardPile: [],
            handCounter: 0,
            currentHandCards: [],
            currentTrickCards: [],
            numberOfPlayers: 2,
            playerNames: ['Alan', 'Bradley'],
            players: [new Player({ name: 'Alan' }), new Player({ name: 'Bradley' })],
            trickIndex: 0,
            deck: this.prepareDeck()
        }

        this.initiate = this.initiate.bind(this);
        this.begin = this.begin.bind(this);
        this.shuffle = this.shuffle.bind(this);
        this.deal = this.deal.bind(this);
        this.enterPlayers = this.enterPlayers.bind(this);
        this.updatePlayerNumber = this.updatePlayerNumber.bind(this);
        this.updatePlayerName = this.updatePlayerName.bind(this);
    }
    componentDidMount() {
        this.table = document.getElementById('cardTable');
        this.tablePlayedCards = this.table.querySelector('#thisHand');
    }

    prepareDeck() {
        // cardNames is available
        // this.gameSettings = this.configureDeck();
        const cardNames = ['Ace', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'Jack', 'Queen', 'King'];
        const suits = ['Heart', 'Spade', 'Diamond', 'Club'];
        // if (this.gameSettings.aceHigh === "true") {
        //     const ace = cardNames.shift();
        //     cardNames[cardNames.length] = ace;
        // }

        // let cardsUsed = this.gameSettings.cards;

        const cards = suits.map((suit) => {
            return cardNames.map((name) => {
                const obj = { name, suit };
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
        // this.enterPlayers();
        // debugger;
    }

    begin() {
        this.deal();
        // this.beginAHand();
    }

    enterPlayers() {
        // this.numberOfPlayers = this.gameSettings.numberOfPlayers;
        let players = [];
        for (let player = 0; player < this.state.numberOfPlayers; player++) {
            let currentPlayer = new Player({ name: this.state.playerNames[player], gameInstance: this });
            players.push(currentPlayer);
        }

        this.setState({ ...this.state, players });
    }

    updatePlayerNumber(event) {
        let numberOfPlayers = event.target.value;
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

            // there should be one array for each player
            if (p++ === playersCount) {
                p = 0;
            }
        }

        // create players 
        // dealtCards with same index as player will be the cards prop for each player
        let players = [];
        for (let player = 0; player < playersCount; player++) {
            console.log(players, dealtCards[player]);
            players[players.length] = new Player({ name: this.state.playerNames[player], gameInstance: this, cards: dealtCards[player] });
        }
        // this.buildHands();
        // for (let x = 0; x < this.state.players.length; x++) {
        //     this.state.players[x].readyCards();
        // }
        this.setState({ ...this.state, players });
    }

    clearHands() {

        for (let p = 0; p < this.players.length; p++) {
            if (this.players[p].cards) {
                this.players[p].cards = [];
            }

            let handCardElement = document.getElementById(this.players[p].name).querySelector('.handCards');

            if (handCardElement.querySelectorAll('.cards')) {
                handCardElement.innerHTML = '';
            }
        }
    }

    shuffle() {
        const deck = this.state.deck.sort(function () { return 0.5 - Math.random() });
        this.setState({ ...this.state, deck });
    }

    buildHands() {
        for (let h = 0; h < this.state.players.length; h++) {
            let thisGuy = this.players[h];
            let handCardElement = document.getElementById(thisGuy.name).querySelector('.handCards');
            for (let c = 0; c < thisGuy.cards.length; c++) {
                handCardElement.innerHTML += thisGuy.cards[c].template();
            }
        }
    }

    beginAHand() {
        this.trickIndex = 0;
        this.playATrick();
    }

    finishHand() {
        // done?

        // prepare next hand
    }

    playATrick() {
        // let one player play a card at a time
        var trickContainer = document.createElement("div");
        trickContainer.className = "trickContainer flex";
        document.getElementById('thisHand').appendChild(trickContainer);
        this.players[0].takeTurn();
    }

    whoWon() {
        // need winning player, the high value, winning card
        let highValue = 0,
            winningCard = {},
            winningPlayer = {};

        let thisTrickDisplay = document.getElementById('thisHand').querySelectorAll('.trickContainer')[this.trickIndex];

        for (let x = 0; x < this.currentTrickCards.length; x++) {
            if (this.currentTrickCards[x].value > highValue) {
                highValue = this.currentTrickCards[x].value;
                winningCard = this.currentTrickCards[x];
                winningPlayer = this.players[x];
            }
        }
        this.trickEndCardAnimations(winningPlayer);
        // let winnerTitle = document.createElement('div').innerText = winningPlayer.name;
        // // winnerTitle.className = 'trickWinner';
        // thisTrickDisplay.innerHTML += winnerTitle;
        this.currentTrickCards = [];
        this.trickIndex++;
        this.playATrick();
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
        if (this.whoseTurnIndex == this.players.length - 1) {
            this.whoseTurnIndex = 0;
            this.whoWon();
        } else {
            this.whoseTurnIndex++;
            this.players[this.whoseTurnIndex].takeTurn();
        }
    }

    render() {
        return (<div id="cardTable">
            <form id="playersListForm" onSubmit={this.initiate}>
                <input type="number" value={this.state.numberOfPlayers} onChange={this.updatePlayerNumber} step="1" />

                {this.state.playerNames.map((name, index) => <input key={"player-" + index} data-key={index} value={name} type="text" onChange={this.updatePlayerName} />)}
                <button type="submit">Submit</button>
            </form>
            <button onClick={this.begin}>Begin</button>
            <div className="flex">

                <ErrorBoundary>
                    <div id="thisHand" className="flex">
                        {this.state.players.map((player, p) => <div key={`${player.name}-${p}}`}><Player name={player.name} /></div>)}
                    </div>
                </ErrorBoundary>
            </div>
        </div>)
    }

}


export default Game;
// the trick containers exist, place cards inside them

