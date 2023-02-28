import Card from "../Card";

const Club = (props) => {
    const smallSVG = <svg width="12" height="11">
        <circle cx="9" cy="6" r="3" fill="black" />
        <circle cx="3" cy="6" r="3" fill="black" />
        <circle cx="6" cy="3" r="3" fill="black" />
        <polygon points="6,6 9,11 3,11" fill="black" />
    </svg>;

    const suitSVG = <svg width="25" height="25">
        <circle cx="18" cy="13" r="5" fill="black" />
        <circle cx="6" cy="13" r="5" fill="black" />
        <circle cx="12" cy="6" r="5" fill="black" />
        <polygon points="17,22 12,9 7,22" fill="black" />
    </svg>;

    return (<Card name={props.name}
        value={props.value}
        smallSVG={smallSVG}
        suitSVG={suitSVG}
        suit="Club" />);
}

export default Club;