// abstract base for rows of icons 
// primarily used for the homepage

abstract class IconRow extends PageElement {
    constructor(parent: PageElement, tag?: string) {
        super(tag);
        this.element.classList.add('icon_row');
        this.setParent(parent);
    }

    // adds a list of icons
    public addIconList(list: IconEntry[]) {
        for (const info of list) this.addIcon(info);
    }

    // adds the individual icon
    public abstract addIcon(entry: IconEntry): void;
}

// dedicated icon row
class LargeIconRow extends IconRow {
    constructor(parent: PageElement) {
        super(parent, 'div');
        this.element.classList.add('block');
    }

    public addIcon(entry: IconEntry) {
        new LargeIcon(this, entry);
    }
}

// text with icons in it
class SpanIconRow extends IconRow {
    constructor(parent: PageElement) {
        super(parent, 'span');
        this.element.classList.add('inline');
    }

    public setText(text: string) {
        this.element.textContent = text;
    }

    public addIcon(entry: IconEntry) {
        new InlineIcon(this, entry);
    }
}

// individual icons
// abstract base
abstract class Icon extends PageElement {
    constructor(parent: PageElement, entry: IconEntry, tag?: string) {
        super(tag || 'i');
        this.element.style.setProperty('--icon-url', `url('${entry.icon}')`);
        this.element.style.setProperty('--icon-size', entry.size || null);
        this.setParent(parent);
    }
}

// found inside span elements
class InlineIcon extends Icon {
    constructor(parent: PageElement, entry: IconEntry) {
        super(parent, entry);
    }
}

// adds glass styling, primary icons
class LargeIcon extends Icon {
    constructor(parent: PageElement, entry: IconEntry) {
        super(parent, entry);
        this.element.classList.add('glass', 'gradient');
    }
}

// link icon
class SocialLinkIcon extends Icon {
    constructor(parent: PageElement, social_entry: SocialEntry) {
        super(parent, social_entry.image, 'a');
        this.element.classList.add('social');
        this.element.style.setProperty('--gradient', `linear-gradient(${social_entry.gradient.direction}, ${social_entry.gradient.colors.join(', ')})`);
        this.element.setAttribute('href', social_entry.link);
    }
}