class RecognizeURL {
    page: Page | null;

    constructor() {
        let index: string = (window.location.href.split('#').pop() || 'home');
        this.page = ManagePages.getPage(index as PageName);
        this.recognize();
    }

    recognize(): void {
        if (!this.page) return;
        this.page.showPage();
    }
}

const Loader: RecognizeURL = new RecognizeURL();