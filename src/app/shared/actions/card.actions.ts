import {createAction, props} from '@ngrx/store';
import {Card} from '../models/card.model';

export const addNewCard = createAction('ADD_NEW_CARD', props<Card>());
export const selectCard = createAction('SELECT_CARD', props<Card>());
export const updateCard = createAction('UPDATE_CARD', props<Card>());
export const deleteCard = createAction('DELETE_CARD', props<Card>());
