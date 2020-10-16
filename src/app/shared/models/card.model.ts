export interface CardInterface {
  id?: number;
  name?: string;
  description?: string;
  cardListId: number;
  dueDate?: Date;
  isChecked?: boolean;
}

export class Card {
  id: number;
  name: string;
  description: string;
  cardListId: number;
  dueDate: Date;
  isChecked: boolean;

  constructor(cardObj?: CardInterface) {
    this.name = cardObj && cardObj.name || '';
    this.cardListId = cardObj && cardObj.cardListId || -1;
    this.description = cardObj && cardObj.description || '';
    this.dueDate = cardObj && cardObj.dueDate || new Date();
    this.isChecked = cardObj && cardObj.isChecked || false;
  }
}
