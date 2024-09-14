class FreshNewsPage {
    constructor(page) {
        this.page = page;
        this.newsOnPage = this.page.locator('.athing');
        this.moreNewsButton = this.page.locator('.morelink');
        this.currentAmountOfNews = 0;
        this.maxAmountOfNews = 100;
        this.allNews = [];
    }

    async gotoNewsPage() {
        await this.page.goto('/newest');
        await this.page.waitForLoadState('networkidle', { timeout: 30000 });
    }

    async gotoNextPage() {
        // await this.moreNewsButton.waitFor({ state: 'visible', timeout: 30000 });
        await this.moreNewsButton.click();
        await this.page.waitForLoadState('networkidle', { timeout: 30000 });
    }

    async saveNewsToArray() {
        const countNewsOnPage = await this.newsOnPage.count();
        for (let i = 0; i < countNewsOnPage; i++) {
            const currentItem = this.newsOnPage.nth(i);
            const id = await  currentItem.getAttribute('id');
            const rank = parseInt(await this.page.locator(`[id="${id}"] .rank`).innerText(), 10);
            const dateOfCreation = await  this.page.locator(`[id="${id}"] + tr .age`).getAttribute('title');
            if (id) {
                this.allNews.push({ id, rank, time: new Date(dateOfCreation) });
                this.currentAmountOfNews += 1;
            }
            if (this.currentAmountOfNews === this.maxAmountOfNews) {
                return;
            }
        }
    }

    async saveAllNewsToArray (maxAmountOfNews) {
        let currentPage = 1;
        while (true) {
            await this.saveNewsToArray();
            console.log(`Page ${currentPage++} has been processed.`);
            if (this.currentAmountOfNews === maxAmountOfNews) break;
            await this.gotoNextPage();

        }
    }
}

module.exports = FreshNewsPage;

