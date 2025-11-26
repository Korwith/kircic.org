type CSS = Record<string, string>;

class CSSManagement {
    private style: HTMLStyleElement;
    private counter = 0;
    private elementToId = new WeakMap<HTMLElement, string>();

    constructor() {
        this.style = document.createElement('style');
        document.head.appendChild(this.style);
    }

    private get sheet(): CSSStyleSheet {
        return this.style.sheet!;
    }

    private getId(element: HTMLElement): string {
        let id = this.elementToId.get(element);
        if (!id) {
            id = `css-${++this.counter}`;
            this.elementToId.set(element, id);
            element.dataset.cssId = id;
        }
        return id;
    }

    private insertRule(selector: string, css: CSS, media?: string) {
        const declarations = Object.entries(css)
            .map(([k, v]) => `${k.replace(/[A-Z]/g, m => '-' + m.toLowerCase())}: ${v}`)
            .join('; ');

        const rule = `${selector} { ${declarations}; }`;

        if (media) {
            const mediaRule = Array.from(this.sheet.cssRules).find((r) =>
                r instanceof CSSMediaRule && r.conditionText === media
            ) as CSSMediaRule | undefined;

            if (mediaRule) {
                mediaRule.insertRule(rule, mediaRule.cssRules.length);
            } else {
                this.sheet.insertRule(`@media ${media} { ${rule} }`, this.sheet.cssRules.length);
            }
        } else {
            this.sheet.insertRule(rule, this.sheet.cssRules.length);
        }
    }

    addDesktopEntry(element: HTMLElement, css: CSS, parentSelector?: string): void {
        const id = this.getId(element);
        let selector = `[data-css-id="${id}"]`;
        if (parentSelector) {
            selector = `${parentSelector} ${selector}`;
        }
        this.insertRule(selector, css);
    }

    addMobileEntry(element: HTMLElement, css: CSS, parentSelector?: string): void {
        const id = this.getId(element);
        let selector = `[data-css-id="${id}"]`;
        if (parentSelector) {
            selector = `${parentSelector} ${selector}`;
        }
        this.insertRule(selector, css, '(max-width: 767px)');
    }

    removeElement(element: HTMLElement): void {
        const id = this.elementToId.get(element);
        if (id) {
            delete element.dataset.cssId;
            this.elementToId.delete(element);
        }
    }
}

const CSS_FullSize: CSS = { width: '100%', height: '100%', top: '0', left: '0' };
const CSS_FullWidthFitHeight: CSS = { width: '100%', height: 'fit-content' };
const CSS_InlinePane: CSS = {gap: '10px', display: 'flex', 'flex-direction': 'column'};