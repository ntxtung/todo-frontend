import {Component, Input, OnDestroy, OnInit, ViewEncapsulation} from '@angular/core';
import {CardList} from '../../../../shared/models/card-list.model';
import {CardService} from '../../../../core/services/card.service';
import {Card} from '../../../../shared/models/card.model';
import {CardListService} from '../../../../core/services/card-list.service';
import {selectCard} from '../../../../shared/actions/card.actions';
import {Store} from '@ngrx/store';
import {ReducerState} from '../../../../shared/reducers/reducer';
import {animate, state, style, transition, trigger} from '@angular/animations';
import {Observable, Subscription} from 'rxjs';

@Component({
  selector: 'app-card-list',
  templateUrl: './card-list.component.html',
  styleUrls: ['./card-list.component.sass'],
  // encapsulation: ViewEncapsulation.None,
})
export class CardListComponent implements OnInit, OnDestroy {
  @Input() cardList: CardList;
  clonedCardList: CardList;
  cards: Card[];
  newCard: Card;

  isTitleEdit = false;
  isNewCardTyping = false;

  cardSubscription: Subscription;

  constructor(
    private cardService: CardService,
    private cardListService: CardListService,
    private store: Store<ReducerState>
  ) {
  }

  ngOnInit(): void {
    this.cardSubscription = this.cardService.getObservableCardsByListId(this.cardList.id)
      .subscribe(cards => this.cards = cards);

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

  onCardSelected(card: Card): void {
    this.store.dispatch(selectCard(card));
  }

  cardIdentify(index: number, item: Card): any {
    return item.id;
  }
}
