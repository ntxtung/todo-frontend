import {browser, by, element, protractor} from 'protractor';
import {CardList} from '../../src/app/modules/todos/models/card-list.model';
import {Card} from '../../src/app/modules/todos/models/card.model';

export class AppPage {
  navigateTo(): Promise<unknown> {
    return browser.get(browser.baseUrl) as Promise<unknown>;
  }

  async getPageTitle(): Promise<string> {
    return browser.getTitle();
  }

  async createCardList(cardList: CardList): Promise <void> {
    await element(by.id('create-card-list-button')).click();
    await element(by.id('create-card-list-input')).sendKeys(cardList.name);
    await browser.actions().sendKeys(protractor.Key.ENTER).perform();
  }

  async createCardInListById(card: Card, listId: number): Promise<void> {
    await element(by.id('createCardText' + listId)).click();
    await element(by.id('createCardInput' + listId)).sendKeys(card.name);
    await browser.actions().sendKeys(protractor.Key.ENTER).perform();
  }

  async deleteCardById(card: Card): Promise<void> {
    await element(by.id(`card+${card.id}`)).click();
  }

  getTitleText(): Promise<string> {
    return element(by.css('app-root .content span')).getText() as Promise<string>;
  }
}
