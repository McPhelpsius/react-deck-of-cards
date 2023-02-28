import Card from "../Card";

const Heart = (props) => {
  const suitSVG = <svg width="25" height="30" >
    <circle cx="14" cy="7" r="5" fill="red" />
    <circle cx="6" cy="7" r="5" fill="red" />
    <polygon points="10,4 18,10 10,18 2,10" fill="red" />
  </svg>;
  const smallSVG = <svg width="12" height="12">
    <circle cx="8" cy="4" r="3" fill="red" />
    <circle cx="3" cy="4" r="3" fill="red" />
    <polygon points="6,4 11,5 6,11 0,5" fill="red" />
  </svg>;

  return (<Card value={props.value} name={props.name} smallSVG={smallSVG} suitSVG={suitSVG} suit="Hearts" />)
}

export default Heart;