import { Component, OnInit } from '@angular/core';
import {CardListService} from '../../../../core/http/card-list.service';
import {CardList} from '../../../../shared/models/card-list';

@Component({
  selector: 'app-todos-main',
  templateUrl: './todos-main.component.html',
  styleUrls: ['./todos-main.component.sass']
})
export class TodosMainComponent implements OnInit {
  cardLists: CardList[];

  constructor(
    private cardListService: CardListService
  ) { }

  ngOnInit(): void {
    this.cardListService.getAllCardLists()
      .subscribe(cardLists => this.cardLists = cardLists);
  }

}
