export class Card {
  id: number;
  name: string;
  description: string;
  dueDate: Date;
  cardListId: number;

  constructor(cardListId: number) {
    this.cardListId = cardListId;
  }
}
