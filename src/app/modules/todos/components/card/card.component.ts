import { Component, Input, OnInit } from '@angular/core';
import { Card } from '../../models/card.model';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { selectCard } from '../../actions/card.actions';
import { Store } from '@ngrx/store';
import { ReducerState } from '../../reducers/reducer';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
  animations: [
    trigger('flyInOut', [
      state('in',
        style({
          transform: 'translateX(0)',
        })
      ),
      transition('void => *', [
        style({transform: 'translateX(-120%)'}),
        animate(200)
      ]),
      transition('* => void', [
        animate(200, style({
          transform: 'translateX(120%)',
          opacity: 0
        }))
      ])
    ])
  ]
})
export class CardComponent implements OnInit {
  @Input() card: Card;

  constructor(
    private store: Store<ReducerState>
  ) {
  }

  ngOnInit(): void {

  }

  onCardSelected(): void {
    this.store.dispatch(selectCard(this.card));
  }
}
