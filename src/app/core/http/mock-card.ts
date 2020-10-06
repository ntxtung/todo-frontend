import { CardList } from '../../shared/models/card-list';
import {Card} from '../../shared/models/card';
export const CARD_LISTS: Card[] =
[
  {
    id: 1,
    name: 'Write abstract',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec lobortis enim sit amet',
    dueDate: new Date(2020, 10, 10, 0, 0, 0),
    cardListId: 1
  },
  {
    id: 2,
    name: 'Write acknowledgment',
    description: 'Lorem ipsum dolor sit amet',
    dueDate: new Date(2020, 10, 10, 0, 0, 0),
    cardListId: 1
  },
  {
    id: 3,
    name: 'Write introduction',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    dueDate: new Date(2020, 10, 10, 0, 0, 0),
    cardListId: 1
  },
  {
    id: 4,
    name: 'Write something else',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec lobortis',
    dueDate: new Date(2020, 10, 10, 0, 0, 0),
    cardListId: 1
  },
];
