import {createAction, props} from '@ngrx/store';
import {Card} from '../models/card.model';

export const selectCard = createAction('SELECT_CARD', props<Card>());
