import { Component } from "react";
// import gsap from "gsap";

class Card extends Component {
    constructor(props) {
        super(props);

        this.state = {
            icon: this.createIcon(props.name),
            dealt: false,
            playerId: null,
            clickHandler: props.clickHandler
        };

        this.handleClick = this.handleClick.bind(this);
    }

    
    createIcon(name) {
        return Number.isNaN(parseInt(name)) ? name.split('')[0] : name;
    }

    handleClick(event) {
        const card = event.target;
        // if (!this.state.dealt) {
        //     const tl = gsap.timeline();
        //     tl.to(card, { rotationY: 180, rotationZ: 180, duration: 0.3 });
        // }
        // else if (!this.state.played) {
        //     const tl = gsap.timeline();
        //     tl.to(card, { y: 150 });
        // }
        // else {
        //     gsap.to(card, { y: 0, rotationY: 0, rotationZ: 0, duration: 0.3 });
        //     console.log('hererere')
        //     this.setState({ ...this.state, dealt: !this.state.dealt, played: !this.state.played });
        // }
        console.log(this.props.suit, this.props.value);
        this.state.clickHandler(this);
    }

    render() {
        return <div onClick={this.handleClick} className="card flex-column">
            <h3 className="top-right-icon card-icon flex">
                <div className="cardNumber">{this.state.icon}</div>
                {this.props.smallSVG}
            </h3>
            <h2>{this.state.icon}</h2>
            <h3 className="bottom-left-icon card-icon flex">
                <div className="cardNumber">{this.state.icon}</div>
                {this.props.smallSVG}
            </h3>
        </div>;
    }

    trickEndAnimation(previousSiblingOffset) {
        return previousSiblingOffset + 28;
    }
}

export default Card;

// onclick remove from parent and moving to state of game
