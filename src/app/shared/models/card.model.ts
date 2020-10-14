export interface CardInterface {
  id: number;
  name: string;
  description: string;
  cardListId: number;
  dueDate: Date;
}
export class Card {
  id: number;
  name: string;
  description: string;
  cardListId: number;
  dueDate: Date;

  constructor(cardListId: number) {
    this.name = '';
    this.cardListId = cardListId;
    // this.name = obj && obj.name || '';
    // this.cardListId = obj && obj.cardListId || -1;
    // this.description = obj && obj.description || '';
  }
}
