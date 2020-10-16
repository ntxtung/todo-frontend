import {Component, Input, OnInit, ViewEncapsulation} from '@angular/core';
import {CardService} from '../../../../core/services/card.service';
import {Card} from '../../../../shared/models/card.model';
import {animate, state, style, transition, trigger} from '@angular/animations';
import {selectCard} from '../../../../shared/actions/card.actions';
import {CardListService} from '../../../../core/services/card-list.service';
import {Store} from '@ngrx/store';
import {ReducerState} from '../../../../shared/reducers/reducer';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.sass'],
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
  ) { }

  ngOnInit(): void {

  }

  onCardSelected(): void {
    this.store.dispatch(selectCard(this.card));
  }
}
