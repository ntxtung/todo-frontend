import {createAction, props} from '@ngrx/store';
import {CardList} from '../models/card-list.model';

export const addNewCardList = createAction('ADD_NEW_CARD_LIST', props<CardList>());
export const updateCardList = createAction('UPDATE_CARD_LIST', props<CardList>());
export const deleteCardList = createAction('DELETE_CARD_LIST', props<CardList>());
export const transferCardItem =
  createAction(
    'TRANSFER_CARD_ITEM',
    props<{
      previousListId: number,
      newListId: number,
      previousIndex: number,
      newIndex: number
    }>()
  );


