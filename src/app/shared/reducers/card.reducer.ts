import { Card } from '../models/card.model';
import {selectCard, addNewCard, updateCard, deleteCard} from '../actions/card.actions';
import {createReducer, on} from '@ngrx/store';
import {deleteCardList} from '../actions/card-list.actions';

export interface CardReducerState {
  selectedCard: Card;
  cards: Card[];
}

export const initialState: CardReducerState = {
  selectedCard: null,
  cards: []
};


// tslint:disable-next-line:variable-name
const _cardReducer = createReducer(
  initialState,
  on(selectCard, (state, payload) => {
    return {...state, selectedCard: payload};
  }),
  on(addNewCard, (state, payload) => {
    return {
      ...state,
      cards: [...state.cards, payload]
    };
  }),
  on(updateCard, (state, payload) => {
    const cards = [...state.cards];
    const cardIndex = cards.findIndex((
      card => card.id === payload.id
    ));
    cards[cardIndex] = payload;
    return {
      ...state,
      cards
    };
  }),
  on(deleteCard, (state, payload) => {
    const cards = [...state.cards];
    const afterDelete = cards.filter(
      card => card.id !== payload.id
    );
    return {
      ... state,
      cards: afterDelete
    };
  }),
  on(deleteCardList, (state, payload) => {
    const cards = [...state.cards];
    const afterDelete = cards.filter(
      card => card.cardListId !== payload.id
    );
    return {
      ... state,
      cards: afterDelete
    };
  })
);

export function cardReducer(state, action): any {
  return _cardReducer(state, action);
}
