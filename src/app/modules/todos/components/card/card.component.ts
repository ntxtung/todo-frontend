import {Component, Input, OnInit, ViewEncapsulation} from '@angular/core';
import {CardService} from '../../../../core/services/card.service';
import {Card} from '../../../../shared/models/card.model';

@Component({
  // tslint:disable-next-line:component-selector
  selector: '[app-card]',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.sass'],
  encapsulation: ViewEncapsulation.None
})
export class CardComponent implements OnInit {
  @Input() card: Card;
  constructor() { }

  ngOnInit(): void {

  }
  onClick($event: MouseEvent): void {
    console.log(this.card);
  }
}
