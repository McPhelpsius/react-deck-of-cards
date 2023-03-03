import { Component } from "react";
import gsap from "gsap";

class Card extends Component {
    constructor(props) {
        super(props);

        this.handleClick = this.handleClick.bind(this);
    }

    createIcon(name) {
        return Number.isNaN(parseInt(name)) ? name.split('')[0] : name;
    }

    handleClick(event) {
        // const card = event.target.classList.contains('card') ?
        //     event.target :
        //     event.target.closest('.card');

        // // if (!this.state.dealt) {
        // //     const tl = gsap.timeline();
        // //     tl.to(card, { rotationY: 180, rotationZ: 180, duration: 0.3 });
        // // }
        // // else if (!this.state.played) {
        // //     const tl = gsap.timeline();
        // //     tl.to(card, { y: 150 });
        // // }
        // // else {
        // //     gsap.to(card, { y: 0, rotationY: 0, rotationZ: 0, duration: 0.3 });
        // //     console.log('hererere')
        // //     this.setState({ ...this.state, dealt: !this.state.dealt, played: !this.state.played });
        // // }

        this.props.clickHandler(this);
    }

    render() {
        const icon = this.createIcon(this.props.name);
        return (
            <div onClick={this.handleClick} className="card flex-column">
                <h3 className="top-right-icon card-icon flex">
                    <div className="cardNumber">{icon}</div>
                    {this.props.smallSVG}
                </h3>
                <h2>{icon}</h2>
                <h3 className="bottom-left-icon card-icon flex">
                    <div className="cardNumber">{icon}</div>
                    {this.props.smallSVG}
                </h3>
            </div>
        );
    }
}

export default Card;

// onclick remove from parent and moving to state of game
