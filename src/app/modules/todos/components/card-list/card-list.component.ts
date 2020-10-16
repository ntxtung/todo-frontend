import {Component, Input, OnInit} from '@angular/core';
import {CardList} from '../../../../shared/models/card-list.model';
import {CardService} from '../../../../core/services/card.service';
import {Card} from '../../../../shared/models/card.model';
import {CardListService} from '../../../../core/services/card-list.service';
import {selectCard} from '../../../../shared/actions/card.actions';
import {Store} from '@ngrx/store';
import {ReducerState} from '../../../../shared/reducers/reducer';
import {animate, state, style, transition, trigger} from '@angular/animations';

@Component({
  selector: 'app-card-list',
  templateUrl: './card-list.component.html',
  styleUrls: ['./card-list.component.sass'],
  animations: [
    trigger('flyInOut', [
      state('in',
        style({
          transform: 'translateX(0)',
        })
      ),
      transition('void => *', [
        style({ transform: 'translateX(-120%)' }),
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
export class CardListComponent implements OnInit {
  @Input() cardList: CardList;
  clonedCardList: CardList;
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
    this.cardService.getObservableCardsByListId(this.cardList.id)
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
    // this.newCard = new Card(this.cardList.id);
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
    console.log('cardList: ', this.clonedCardList);
    this.cardListService.updateCardList(this.clonedCardList)
                          .subscribe(cardList => returnedCardList = cardList);
    console.log(returnedCardList);
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
