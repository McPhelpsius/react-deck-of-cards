import Card from "../Card";

const Diamond = (cardData) => {
    const smallSVG = <svg width="10" height="12" >
        <polygon points="5,0 10,6 5,12 0,6" fill="red" />
    </svg>;
    const suitSVG = <svg width="20" height="25" >
        <polygon points="10,0 20,12.5 10,25 0,12.5" fill="red" />
    </svg>;

    return (
        <Card name={cardData.name} value={cardData.value} smallSVG={smallSVG}
        suitSVG={suitSVG} suit={cardData.suit} clickHandler={cardData.clickHandler} />
    );
}

export default Diamond;