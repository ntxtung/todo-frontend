import {Component, Input, OnInit, ViewEncapsulation} from '@angular/core';
import {CardList} from '../../../../shared/models/card-list.model';
import {CardService} from '../../../../core/http/card.service';
import {Card} from '../../../../shared/models/card.model';
import {CardListService} from '../../../../core/http/card-list.service';
import {selectCard} from '../../../../shared/actions/card.actions';
import {Store} from '@ngrx/store';

@Component({
  selector: 'app-card-list',
  templateUrl: './card-list.component.html',
  styleUrls: ['./card-list.component.sass'],
  // encapsulation: ViewEncapsulation.None
})
export class CardListComponent implements OnInit {
  @Input() cardList: CardList;
  savedTitle: string;
  cards: Card[];
  newCard: Card;

  isTitleEdit = false;
  isNewCardTyping = false;

  constructor(
    private cardService: CardService,
    private cardListService: CardListService,
    private store: Store<{ cardReducer: any }>
  ) { }

  ngOnInit(): void {
    this.refreshList();
  }

  refreshList(): void {
    this.fetchCards();
    this.initNewCardObject();
  }

  fetchCards(): void {
    this.cardService.getCardsByListId(this.cardList.id)
      .subscribe(cards => this.cards = cards);
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
    let newCardList = null;
    this.cardListService.updateCardListTitle(this.cardList.id, this.cardList.name)
                          .subscribe(cardList => newCardList = cardList);
    console.log(newCardList);
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

  newCardCancel(): void {
    this.isNewCardTyping = false;
    // this.initNewCardObject();
  }

  onCardSelected(card: Card): void {
    this.store.dispatch(selectCard(card));
  }

}
