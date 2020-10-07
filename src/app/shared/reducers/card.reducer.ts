import { Card } from '../models/card.model';
import { selectCard } from '../actions/card.actions';
import {createReducer, on} from '@ngrx/store';

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
  })
);

export function cardReducer(state, action): any {
  return _cardReducer(state, action);
}
