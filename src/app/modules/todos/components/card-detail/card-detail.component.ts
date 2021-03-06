import { Component, OnInit } from '@angular/core';
import { Card } from '../../models/card.model';
import { Store } from '@ngrx/store';
import { ReducerState } from '../../reducers/reducer';
import { CardService } from '../../services/card.service';

@Component({
  selector: 'app-card-detail',
  templateUrl: './card-detail.component.html',
  styleUrls: ['./card-detail.component.scss']
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
    // console.log(this.card);
    this.isTitleEdit = false;
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
