import Card from "../Card";

const Spade = (cardData) => {
  const suitSVG = <svg width="25" height="25" >
    <circle cx="17" cy="14" r="5" fill="black" />
    <circle cx="7" cy="14" r="5" fill="black" />
    <polygon points="22,12 12,0 2,12" fill="black" />
    <polygon points="18,24 12,10 6,24" fill="black" />
  </svg>;

  const smallSVG = <svg width="10" height="11" >
    <circle cx="6 " cy="7" r="2" fill="black" />
    <circle cx="2" cy="7" r="2" fill="black" />
    <polygon points="8,6 4,0 0,6" fill="black" />
    <polygon points="6,11 4,7 2,11" fill="black" />
  </svg>;

  return (
    <Card name={cardData.name}
      value={cardData.value}
      smallSVG={smallSVG}
      suitSVG={suitSVG}
      suit="Spades" />
  );
}

export default Spade;