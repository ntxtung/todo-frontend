import {Component, Input, OnInit, ViewEncapsulation} from '@angular/core';
import {CardService} from '../../../../core/services/card.service';
import {Card} from '../../../../shared/models/card.model';
import {animate, state, style, transition, trigger} from '@angular/animations';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.sass'],
  // encapsulation: ViewEncapsulation.None,
  animations: [
    trigger('flyInOut', [
      state('in',
        style({
          transform: 'translateX(0)',
        })
      ),
      transition('void => *', [
        style({transform: 'translateX(-120%)'}),
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
export class CardComponent implements OnInit {
  @Input() card: Card;
  constructor() { }

  ngOnInit(): void {

  }
  onClick($event: MouseEvent): void {
    // console.log(this.card);
  }
}
