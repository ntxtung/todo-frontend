import {Component, Input, OnInit} from '@angular/core';
import {CardList} from '../../../../shared/models/card-list';

@Component({
  // tslint:disable-next-line:component-selector
  selector: '[app-card-list]',
  templateUrl: './card-list.component.html',
  styleUrls: ['./card-list.component.sass']
})
export class CardListComponent implements OnInit {
  @Input() cardList: CardList;
  constructor() { }

  ngOnInit(): void {
  }

}
