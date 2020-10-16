import {Component} from '@angular/core';
import {Title} from '@angular/platform-browser';
import {environment} from '../environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent {
  title = environment.title;

  public constructor(
    private titleService: Title
  ) {
    this.titleService.setTitle(this.title);
  }
}
