export interface CardListInterface {
  id: number;
  name: string;
}

export class CardList {
  id: number;
  name: string;

  constructor(obj?: CardListInterface) {
    this.name = obj && obj.name || '';
  }
}
