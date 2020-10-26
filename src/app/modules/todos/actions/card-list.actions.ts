import { createAction, props } from '@ngrx/store';
import { CardList } from '../models/card-list.model';

export const addNewCardList = createAction('[TODOS] Add new CardList', props<CardList>());
export const updateCardList = createAction('[TODOS] Update CardList', props<CardList>());
export const deleteCardList = createAction('[TODOS] Delete CardList', props<CardList>());
export const transferCardItem =
  createAction(
    '[TODOS] Transfer Card item',
    props<{
      previousListId: number,
      newListId: number,
      previousIndex: number,
      newIndex: number
    }>()
  );


