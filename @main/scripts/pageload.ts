class RecognizeURL {
    page: Page;

    constructor() {
        let index: string = (window.location.href.split('#').pop() || 'home');
        this.page = PageIndex[index];
    }

    recognize(): void {
        if (!this.page) return;
        this.page.hideOtherPages();
        this.page.showPage();
    }
}

const Loader: RecognizeURL = new RecognizeURL();
Loader.recognize();