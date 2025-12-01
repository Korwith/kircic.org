"use strict";
class RecognizeURL {
    page;
    constructor() {
        let index = (window.location.href.split('#').pop() || 'home');
        this.page = ManagePages.getPage(index);
        this.recognize();
    }
    recognize() {
        if (!this.page)
            return;
        this.page.showPage();
    }
}
const Loader = new RecognizeURL();
