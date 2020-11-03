import { createReducer, on } from '@ngrx/store';
import { CardList } from '../models/card-list.model';
import { addNewCardList, deleteCardList, transferCardItem, updateCardList } from '../actions/card-list.actions';
import { addNewCard, deleteCard, updateCard } from '../actions/card.actions';
import { Card } from '../models/card.model';

export interface CardListReducerState {
  cardLists: CardList[];
}

export const initialState: CardListReducerState = {
  cardLists: []
};
// TODO: I need refactor here
// tslint:disable-next-line:variable-name
const _cardListReducer = createReducer(
  initialState,
  on(addNewCardList, (state, payload) => {
    const cl = new CardList(payload);
    const cardLists = [...state.cardLists];
    cl.id = cardLists.length ? cardLists[cardLists.length - 1].id + 1 : 1;
    return {
      ...state,
      cardLists: [...state.cardLists, new CardList(payload)]
    };
  }),
  on(updateCardList, (state, payload) => {
    const newCardLists = [...state.cardLists];
    const cardIndex = newCardLists.findIndex((
      cardList => cardList.id === payload.id
    ));
    newCardLists[cardIndex] = new CardList(payload);
    return {
      ...state,
      cardLists: newCardLists
    };
  }),
  on(deleteCardList, (state, payload) => {
    const cardLists = [...state.cardLists];
    const afterDelete = cardLists.filter(
      cardList => cardList.id !== payload.id
    );
    return {
      ...state,
      cardLists: afterDelete
    };
  }),
  // Card Relationship
  on(addNewCard, (state, payload) => {
    const newCardLists = [...state.cardLists];
    const cardListIndex = newCardLists.findIndex((
      cardList => cardList.id === payload.cardListId
    ));
    newCardLists[cardListIndex] = {
      ...newCardLists[cardListIndex],
      cards: [...newCardLists[cardListIndex].cards, new Card(payload)]
    };
    return {
      ...state,
      cardLists: newCardLists
    };
  }),
  on(updateCard, (state, payload) => {
    const newCardLists = [...state.cardLists];
    const cardListIndex = newCardLists.findIndex((
      cardList => cardList.id === payload.cardListId
    ));
    newCardLists[cardListIndex] = {
      ...newCardLists[cardListIndex],
      cards: newCardLists[cardListIndex].cards.map(card => card.id === payload.id ? new Card(payload) : card)
    };
    return {
      ...state,
      cardLists: newCardLists
    };
  }),
  on(deleteCard, (state, payload) => {
    const newCardLists = [...state.cardLists];
    const cardListIndex = state.cardLists.findIndex((
      cardList => cardList.id === payload.cardListId
    ));
    newCardLists[cardListIndex] = {
      ...newCardLists[cardListIndex],
      cards: newCardLists[cardListIndex].cards.filter(c => c.id !== payload.id)
    };
    return {
      ...state,
      cardLists: newCardLists
    };
  }),
  // Complex action
  on(transferCardItem, (state, payload) => {
    const {previousListId, newListId, previousIndex, newIndex} = payload;
    const cardLists: CardList[] = [...state.cardLists];

    if (previousListId !== newListId) {
      const previousCardListIndex = cardLists.findIndex((cl => cl.id === previousListId));
      const previousCardList = {...cardLists[previousCardListIndex]};

      const currentCardListIndex = cardLists.findIndex((cl => cl.id === newListId));
      const currentCardList = {...cardLists[currentCardListIndex]};

      let newPreviousCardListCards: Card[];
      let newCurrentCardListCards: Card[];

      newPreviousCardListCards = [...previousCardList.cards];
      const movedCard = {...newPreviousCardListCards.splice(previousIndex, 1)[0]};
      movedCard.cardListId = newListId;

      newCurrentCardListCards = [...currentCardList.cards];
      newCurrentCardListCards.splice(newIndex, 0, movedCard);

      cardLists[previousCardListIndex] = {
        ...cardLists[previousCardListIndex],
        cards: newPreviousCardListCards
      };
      cardLists[currentCardListIndex] = {
        ...cardLists[currentCardListIndex],
        cards: newCurrentCardListCards
      };
    } else {
      const currentCardListIndex = cardLists.findIndex((cl => cl.id === newListId));
      const currentCardList = {...cardLists[currentCardListIndex]};

      const newCurrentCardListCards: Card[] = [...currentCardList.cards];

      const movedCard: Card = {...newCurrentCardListCards.splice(previousIndex, 1)[0]};
      newCurrentCardListCards.splice(newIndex, 0, movedCard);

      cardLists[currentCardListIndex] = {
        ...cardLists[currentCardListIndex],
        cards: newCurrentCardListCards
      };
    }
    return {
      ...state,
      cardLists
    };
  })
);

export function cardListReducer(state, action): any {
  return _cardListReducer(state, action);
}
