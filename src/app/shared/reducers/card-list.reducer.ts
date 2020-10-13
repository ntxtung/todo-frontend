import {createReducer, on} from '@ngrx/store';
import {CardList} from '../models/card-list.model';
import {addNewCardList, deleteCardList, updateCardList} from '../actions/card-list.actions';

export interface CardListReducerState {
  cardLists: CardList[];
}

export const initialState: CardListReducerState = {
  cardLists: []
};


// tslint:disable-next-line:variable-name
const _cardListReducer = createReducer(
  initialState,
  on(addNewCardList, (state, payload) => {
    return {
      ...state,
      cardLists: [...state.cardLists, payload]
    };
  }),
  on(updateCardList, (state, payload) => {
    const newCardLists = [...state.cardLists];
    const cardIndex = newCardLists.findIndex((
      cardList => cardList.id === payload.id
    ));
    newCardLists[cardIndex] = payload;
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
  })
);

export function cardListReducer(state, action): any {
  return _cardListReducer(state, action);
}
