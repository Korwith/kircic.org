"use strict";
// abstract base for rows of icons 
// primarily used for the homepage
class IconRow extends PageElement {
    constructor(parent, tag) {
        super(tag);
        this.element.classList.add('icon_row');
        this.setParent(parent);
    }
    // adds a list of icons
    addIconList(list) {
        for (const info of list)
            this.addIcon(info);
    }
}
// dedicated icon row
class LargeIconRow extends IconRow {
    constructor(parent) {
        super(parent, 'div');
        this.element.classList.add('block');
    }
    addIcon(entry) {
        new LargeIcon(this, entry);
    }
}
// text with icons in it
class SpanIconRow extends IconRow {
    constructor(parent) {
        super(parent, 'span');
        this.element.classList.add('inline');
    }
    setText(text) {
        this.element.textContent = text;
    }
    addIcon(entry) {
        new InlineIcon(this, entry);
    }
}
// individual icons
// abstract base
class Icon extends PageElement {
    constructor(parent, entry, tag) {
        super(tag || 'i');
        this.element.style.setProperty('--icon-url', `url('${entry.icon}')`);
        this.element.style.setProperty('--icon-size', entry.size || null);
        this.setParent(parent);
    }
}
// found inside span elements
class InlineIcon extends Icon {
    constructor(parent, entry) {
        super(parent, entry);
    }
}
// adds glass styling, primary icons
class LargeIcon extends Icon {
    constructor(parent, entry) {
        super(parent, entry);
        this.element.classList.add('glass', 'gradient');
    }
}
// link icon
class SocialLinkIcon extends Icon {
    constructor(parent, social_entry) {
        super(parent, social_entry.image, 'a');
        this.element.classList.add('social');
        this.element.style.setProperty('--gradient', `linear-gradient(${social_entry.gradient.direction}, ${social_entry.gradient.colors.join(', ')})`);
        this.element.setAttribute('href', social_entry.link);
    }
}
