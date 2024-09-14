const { test, expect } = require('@playwright/test');
const NewsPage = require('../pages/freshNewsPage');

test('should retrieve list of news and verify sorting by date', async ({ page }) => {
    const newsPage = new NewsPage(page);
    await newsPage.gotoNewsPage();

    await newsPage.saveAllNewsToArray(100);
    const listOfNews = newsPage.allNews

    const sortedListOfNews = [...listOfNews].sort((a, b) => b.time - a.time);
    expect(listOfNews).toEqual(sortedListOfNews);

    console.log('List of sorted News:', sortedListOfNews);

});
