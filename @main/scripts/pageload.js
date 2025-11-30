"use strict";
class RecognizeURL {
    page;
    constructor() {
        let index = (window.location.href.split('#').pop() || 'home');
        this.page = PageIndex[index];
    }
    recognize() {
        if (!this.page)
            return;
        this.page.hideOtherPages();
        this.page.showPage();
    }
}
const Loader = new RecognizeURL();
Loader.recognize();
