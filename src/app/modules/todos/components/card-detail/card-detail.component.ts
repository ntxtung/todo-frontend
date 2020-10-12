import {Component, Input, OnInit, AfterViewInit, ElementRef, ViewChild} from '@angular/core';
import {Card} from '../../../../shared/models/card.model';
import {Store} from '@ngrx/store';
import {Observable} from 'rxjs';
import {cardReducer, CardReducerState} from '../../../../shared/reducers/card.reducer';
import {selectCard} from '../../../../shared/actions/card.actions';
import {ReducerState} from '../../../../shared/reducers/reducer';
import {CardService} from '../../../../core/http/card.service';
import * as $ from 'jquery';

@Component({
  selector: 'app-card-detail',
  templateUrl: './card-detail.component.html',
  styleUrls: ['./card-detail.component.sass']
})
export class CardDetailComponent implements OnInit {
  card: Card;
  newCard: Card;
  isTitleEdit: boolean;

  constructor(
    private store: Store<ReducerState>,
    private cardService: CardService
  ) {
  }
  ngOnInit(): void {
    this.store.select('cardReducer')
      .subscribe(value => {
        this.card = value.selectedCard;
        this.newCard = {...this.card};
      });
  }

  cancelEditing(): void {
    this.isTitleEdit = false;
  }

  onTitleClicked($event: MouseEvent): void {
    this.isTitleEdit = true;
  }

  onCancel(): void {
    console.log(this.card);
  }

  onBlur(): void {
    this.cancelEditing();
  }

  onTitleEnter(): void {
    this.cancelEditing();
  }

  onTitleEscape(): void {
    this.cancelEditing();
  }

  onDelete(): void {
    console.log('Deleted');
    let returnCard;
    this.cardService.removeCard(this.card)
      .subscribe(card => returnCard = card);
    if (returnCard) {
      this.hideModal();
    }
  }

  onSave(): void {
    let returnCard;
    this.cardService.updateCard(this.newCard)
      .subscribe(card => returnCard = card);
    if (returnCard) {
      this.hideModal();
    }
  }

  hideModal(): void {
    // Dont care this
    document.getElementById('modal-cancel').click();
  }

}
