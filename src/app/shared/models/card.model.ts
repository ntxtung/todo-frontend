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
    this.name = cardObj.name ? cardObj.name : '';
    this.cardListId = cardObj.cardListId ? cardObj.cardListId : -1;
    this.description = cardObj.description ? cardObj.description : '';
    this.dueDate = cardObj.dueDate ? cardObj.dueDate : new Date();
    this.isChecked = cardObj.isChecked ? cardObj.isChecked : false;
  }
}
