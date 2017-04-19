import { MinerPage } from './app.po';

describe('miner App', () => {
  let page: MinerPage;

  beforeEach(() => {
    page = new MinerPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
