"use strict";
class CSSManagement {
    style;
    counter = 0;
    elementToId = new WeakMap();
    constructor() {
        this.style = document.createElement('style');
        document.head.appendChild(this.style);
    }
    get sheet() {
        return this.style.sheet;
    }
    getId(element) {
        let id = this.elementToId.get(element);
        if (!id) {
            id = `css-${++this.counter}`;
            this.elementToId.set(element, id);
            element.dataset.cssId = id;
        }
        return id;
    }
    insertRule(selector, css, media) {
        const declarations = Object.entries(css)
            .map(([k, v]) => `${k.replace(/[A-Z]/g, m => '-' + m.toLowerCase())}: ${v}`)
            .join('; ');
        const rule = `${selector} { ${declarations}; }`;
        if (media) {
            const mediaRule = Array.from(this.sheet.cssRules).find((r) => r instanceof CSSMediaRule && r.conditionText === media);
            if (mediaRule) {
                mediaRule.insertRule(rule, mediaRule.cssRules.length);
            }
            else {
                this.sheet.insertRule(`@media ${media} { ${rule} }`, this.sheet.cssRules.length);
            }
        }
        else {
            this.sheet.insertRule(rule, this.sheet.cssRules.length);
        }
    }
    addDesktopEntry(element, css, parentSelector) {
        const id = this.getId(element);
        let selector = `[data-css-id="${id}"]`;
        if (parentSelector) {
            selector = `${parentSelector} ${selector}`;
        }
        this.insertRule(selector, css);
    }
    addMobileEntry(element, css, parentSelector) {
        const id = this.getId(element);
        let selector = `[data-css-id="${id}"]`;
        if (parentSelector) {
            selector = `${parentSelector} ${selector}`;
        }
        this.insertRule(selector, css, '(max-width: 767px)');
    }
    removeElement(element) {
        const id = this.elementToId.get(element);
        if (id) {
            delete element.dataset.cssId;
            this.elementToId.delete(element);
        }
    }
}
const CSS_FullSize = { width: '100%', height: '100%', top: '0', left: '0' };
const CSS_FullWidthFitHeight = { width: '100%', height: 'fit-content' };
const CSS_InlinePane = { gap: '10px', display: 'flex', 'flex-direction': 'column' };
