export interface CardListInterface {
  id?: number;
  name?: string;
}

export class CardList implements CardListInterface{
  id: number;
  name: string;

  constructor(obj?: CardListInterface) {
      this.id = obj && obj.id || -1;
      this.name = obj && obj.name || '';
  }
}
