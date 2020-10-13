import {CardReducerState} from './card.reducer';
import {CardListReducerState} from './card-list.reducer';

export interface ReducerState {
  cardReducer: CardReducerState;
  cardListReducer: CardListReducerState;
}
