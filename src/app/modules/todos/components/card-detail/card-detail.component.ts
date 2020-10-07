import {Component, Input, OnInit} from '@angular/core';
import {Card} from '../../../../shared/models/card.model';
import {Store} from '@ngrx/store';
import {Observable} from 'rxjs';
import {cardReducer, CardReducerState} from '../../../../shared/reducers/card.reducer';
import {selectCard} from '../../../../shared/actions/card.actions';

@Component({
  selector: 'app-card-detail',
  templateUrl: './card-detail.component.html',
  styleUrls: ['./card-detail.component.sass']
})
export class CardDetailComponent implements OnInit {
  card: Card;
  constructor(
    private store: Store<{cardReducer}>
  ) {
    this.store.select('cardReducer')
      .subscribe(value => {
        this.card = value.selectedCard;
        console.log('Return value: ', value);
        console.log(this.card);
      });
  }
  ngOnInit(): void {
  }

  onCancel(): void {
    console.log(this.card);
  }
}
