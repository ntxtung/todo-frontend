import { Card } from './card.model';

export interface CardListInterface {
  id?: number;
  name?: string;
  cards?: Card[];
}

export class CardList implements CardListInterface{
  id: number;
  name: string;
  cards?: Card[];

  constructor(obj?: CardListInterface) {
      this.id = obj && obj.id || -1;
      this.name = obj && obj.name || '';
      this.cards = obj && obj.cards || [];
  }
}
