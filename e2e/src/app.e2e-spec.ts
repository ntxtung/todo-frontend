import {AppPage} from './app.po';
import {browser, logging} from 'protractor';
import {environment} from '../../src/environments/environment';
import {CardList} from '../../src/app/shared/models/card-list.model';
import {Card} from '../../src/app/shared/models/card.model';
import {LoremIpsum} from 'lorem-ipsum';

const lorem = new LoremIpsum({
  sentencesPerParagraph: {
    max: 8,
    min: 4
  },
  wordsPerSentence: {
    max: 16,
    min: 4
  }
});

describe('Todos', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
  });

  it(`should display title ${environment.title}`, () => {
    page.navigateTo();
    expect(page.getPageTitle()).toEqual(environment.title, `the title does not match environment config`);
  });

  afterEach(async () => {
    // Assert that there are no errors emitted from the browser
    const logs = await browser.manage().logs().get(logging.Type.BROWSER);
    expect(logs).not.toContain(jasmine.objectContaining({
      level: logging.Level.SEVERE,
    } as logging.Entry));
  });
});

describe('Todos - CardList & Card', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
  });

  it(`should able to create cardList and card`, async () => {
    const loremPool = [];
    let loremItem = 0;
    for (let i = 1; i <= 15; i++) {
      loremPool.push(lorem.generateSentences(1));
    }

    for (let i = 1; i <= 3; i++) {
      const cardList = new CardList({
        name: `List ${i}`,
        id: i
      });
      await page.createCardList(cardList);
      for (let j = 1; j <= 5; j++) {
        const card = new Card({
          cardListId: i
        });
        card.name = loremPool[loremItem++];
        await page.createCardInListById(card, i);
        browser.sleep(100);
      }
    }
  });

  afterEach(async () => {
    // browser.sleep(999999);
    // Assert that there are no errors emitted from the browser
    const logs = await browser.manage().logs().get(logging.Type.BROWSER);
    expect(logs).not.toContain(jasmine.objectContaining({
      level: logging.Level.SEVERE,
    } as logging.Entry));
  });
});
