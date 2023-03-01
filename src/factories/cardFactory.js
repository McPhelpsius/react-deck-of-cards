import Spade from '../classes/cards/Spade';
import Heart from '../classes/cards/Heart';
import Club from '../classes/cards/Club';
import Diamond from '../classes/cards/Diamond';
import Card from '../classes/Card';

export default function createCard(cardData) {
  const { value, name, suit } = cardData;
  switch (suit) {
    case 'Diamond':
      return Diamond({ value, name });
    case 'Club':
      return Club({ value, name });
    case 'Heart':
      return Heart({ value, name });
    case 'Spade':
      return Spade({ value, name });
    default:
      return new Card({ value, name });
  }
}