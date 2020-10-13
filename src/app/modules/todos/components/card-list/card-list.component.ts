import {Component, Input, OnInit, ViewEncapsulation} from '@angular/core';
import {CardList} from '../../../../shared/models/card-list.model';
import {CardService} from '../../../../core/services/card.service';
import {Card} from '../../../../shared/models/card.model';
import {CardListService} from '../../../../core/services/card-list.service';
import {selectCard} from '../../../../shared/actions/card.actions';
import {Store} from '@ngrx/store';
import {ReducerState} from '../../../../shared/reducers/reducer';

@Component({
  selector: 'app-card-list',
  templateUrl: './card-list.component.html',
  styleUrls: ['./card-list.component.sass'],
  // encapsulation: ViewEncapsulation.None
})
export class CardListComponent implements OnInit {
  @Input() cardList: CardList;
  clonedCardList: CardList;
  savedTitle: string;
  cards: Card[];
  newCard: Card;

  isTitleEdit = false;
  isNewCardTyping = false;

  constructor(
    private cardService: CardService,
    private cardListService: CardListService,
    private store: Store<ReducerState>
  ) { }

  ngOnInit(): void {
    this.cardService.getCardsByListId(this.cardList.id)
      .subscribe(cards => this.cards = cards);
    // this.store.select('cardReducer')
    //   .subscribe(cardStore => {
    //     this.cards = [...cardStore.cards.filter(
    //       card => card.cardListId === this.cardList.id
    //     )];
    //   });
    this.clonedCardList = {...this.cardList};
    this.refreshList();
  }

  refreshList(): void {
    this.initNewCardObject();
  }

  initNewCardObject(): void {
    this.newCard = new Card(this.cardList.id);
  }

  onTitleClicked($event: MouseEvent): void {
    this.savedTitle = this.cardList.name;
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
    console.log('cardList: ', this.clonedCardList);
    this.cardListService.updateCardList(this.clonedCardList)
                          .subscribe(cardList => returnedCardList = cardList);
    console.log(returnedCardList);
  }

  titleEditCancel(): void {
    this.isTitleEdit = false;
    this.cardList.name = this.savedTitle;
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

  newCardCancel(): void {
    this.isNewCardTyping = false;
    // this.initNewCardObject();
  }

  onCardSelected(card: Card): void {
    this.store.dispatch(selectCard(card));
  }

}
