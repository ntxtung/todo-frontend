import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { CardList } from '../../models/card-list.model';
import { Card } from '../../models/card.model';
import { Subscription } from 'rxjs';
import { CardService } from '../../services/card.service';
import { CardListService } from '../../services/card-list.service';

@Component({
  selector: 'app-card-list',
  templateUrl: './card-list.component.html',
  styleUrls: ['./card-list.component.scss'],
})
export class CardListComponent implements OnInit, OnDestroy {
  @Input() cardList: CardList;
  clonedCardList: CardList;
  newCard: Card;

  isTitleEdit = false;
  isNewCardTyping = false;

  cardSubscription: Subscription;

  constructor(
    private cardService: CardService,
    private cardListService: CardListService
  ) {
  }

  ngOnInit(): void {
    this.clonedCardList = {...this.cardList};
    this.refreshList();
  }

  ngOnDestroy(): void {
    this.cardSubscription.unsubscribe();
  }

  refreshList(): void {
    this.initNewCardObject();
  }

  initNewCardObject(): void {
    this.newCard = new Card({
      cardListId: this.cardList.id
    });
  }

  onTitleClicked(): void {
    this.isTitleEdit = true;
  }

  onTitleBlur(): void {
    // this.titleEditCancel();
  }

  onTitleFocus(): void {
    // console.log('on focus');
  }

  onTitleEnter(): void {
    this.titleSubmit();
  }

  onTitleEscape(): void {
    this.titleEditCancel();
  }

  titleSubmit(): void {
    this.isTitleEdit = false;
    let returnedCardList = null;
    // console.log('cardList: ', this.clonedCardList);
    this.cardListService.updateCardList(this.clonedCardList)
      .subscribe(cardList => returnedCardList = cardList);
    // console.log(returnedCardList);
  }

  titleEditCancel(): void {
    this.isTitleEdit = false;
  }

  onNewCardClicked(): void {
    this.isNewCardTyping = true;
  }

  onNewCardEnter(): void {
    this.newCardSubmit();
  }

  onNewCardEscape(): void {
    this.newCardCancel();
  }

  newCardSubmit(): void {
    if (this.newCard.name.trim().length) {
      let returnCard;
      this.cardService.createCard(this.newCard)
        .subscribe(card => returnCard = card);

      if (returnCard) {
        this.isNewCardTyping = false;
        this.refreshList();
      } else {
        console.log('Error');
      }
    }
  }

  onDeleteCardList(): void {
    let returnedCardList;
    this.cardListService.removeCardList(this.cardList)
      .subscribe(cardList => returnedCardList = cardList);
  }

  newCardCancel(): void {
    this.isNewCardTyping = false;
    // this.initNewCardObject();
  }

  cardIdentify(index: number, item: Card): any {
    return item.id;
  }
}
