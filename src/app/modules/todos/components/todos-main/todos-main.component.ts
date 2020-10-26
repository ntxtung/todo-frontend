import { Component, OnInit} from '@angular/core';
import { CardList } from '../../../../shared/models/card-list.model';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { CdkDragDrop } from '@angular/cdk/drag-drop';
import { Card } from '../../../../shared/models/card.model';
import { CardListService } from '../../services/card-list.service';

@Component({
  selector: 'app-todos-main',
  templateUrl: './todos-main.component.html',
  styleUrls: ['./todos-main.component.sass'],
  animations: [
    trigger('flyInOut', [
      state('in',
        style({
          transform: 'translateX(0)',
          opacity: 1
        })
      ),
      transition('void => *', [
        style({
          transform: 'translateX(70%)',
          opacity: 0
        }),
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
export class TodosMainComponent implements OnInit {
  cardLists: CardList[];
  newCardList: CardList;

  isNewCardListTyping = false;

  constructor(
    private cardListService: CardListService,
  ) {
    this.cardListService.getAllCardLists()
      .subscribe(cardLists => this.cardLists = cardLists);
  }

  ngOnInit(): void {
    this.refreshAll();
  }

  initNewCardList(): void {
    this.newCardList = new CardList();
  }

  refreshAll(): void {
    this.initNewCardList();
  }

  onNewCardClicked(): void {
    this.isNewCardListTyping = true;
  }

  onNewCardListEnter(): void {
    this.newCardListSubmit();
  }

  onNewCardListEscape(): void {
    this.newCardListCancel();
  }

  newCardListSubmit(): void {
    if (this.newCardList.name.trim().length) {
      let returnedCardList = null;
      this.cardListService.createNewCardList(this.newCardList)
        .subscribe(cardList => returnedCardList = cardList);
      if (returnedCardList) {
        this.isNewCardListTyping = false;
        this.refreshAll();
      } else {
        console.error('ERROR');
      }
    }
  }

  newCardListCancel(): void {
    this.isNewCardListTyping = false;
  }

  cardListIdentify(index: number, item: CardList): any {
    return item.id;
  }

  onCardDropped($event: CdkDragDrop<CardList, Card>): void {
    const card = new Card($event.item.data);
    card.cardListId = $event.container.data.id;
    this.cardListService.transferCardItem(
      $event.previousContainer.data.id,
      $event.container.data.id,
      $event.previousIndex,
      $event.currentIndex
    );
    // let returnedCard;
    // this.cardService.updateCard(card)
    //   .subscribe(subCard => returnedCard = subCard);
  }
}
