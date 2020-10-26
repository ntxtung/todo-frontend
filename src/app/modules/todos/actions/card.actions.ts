import { createAction, props } from '@ngrx/store';
import { Card } from '../models/card.model';

export const addNewCard = createAction('[TODOS] Add new Card', props<Card>());
export const selectCard = createAction('[TODOS] Select Card', props<Card>());
export const updateCard = createAction('[TODOS] Update Card', props<Card>());
export const deleteCard = createAction('[TODOS] Delete Card', props<Card>());
