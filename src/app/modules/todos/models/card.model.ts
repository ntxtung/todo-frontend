export interface CardInterface {
  id?: number;
  name?: string;
  description?: string;
  cardListId: number;
  dueDate?: Date;
  isChecked?: boolean;
}

export class Card implements CardInterface {
  id: number;
  name: string;
  description: string;
  cardListId: number;
  dueDate: Date;
  isChecked: boolean;

  constructor(cardObj?: CardInterface) {
    this.id = cardObj && cardObj.id || -1;
    this.name = cardObj && cardObj.name || '';
    this.cardListId = cardObj && cardObj.cardListId || -1;
    this.description = cardObj && cardObj.description || '';
    this.dueDate = cardObj && cardObj.dueDate || new Date();
    this.isChecked = cardObj && cardObj.isChecked || false;
  }
}
