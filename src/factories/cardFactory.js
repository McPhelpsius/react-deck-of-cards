import Spade from '../classes/cards/Spade';
import Heart from '../classes/cards/Heart';
import Club from '../classes/cards/Club';
import Diamond from '../classes/cards/Diamond';
import Card from '../classes/Card';

export default function createCard(cardData) {
  const { suit } = cardData;
  switch (suit) {
    case 'Diamond':
      return Diamond(cardData);
    case 'Club':
      return Club(cardData);
    case 'Heart':
      return Heart(cardData);
    case 'Spade':
      return Spade(cardData);
    default:
      return new Card(cardData);
  }
}