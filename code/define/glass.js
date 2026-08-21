"use strict";
class GlassPane extends PageElement {
    constructor(tag) {
        super(tag);
        this.element.classList.add('glass');
    }
}
class DarkGlassPane extends GlassPane {
    constructor(tag) {
        super(tag);
        this.element.classList.add('dark');
    }
}
class ShadowGlassPane extends GlassPane {
    constructor(tag) {
        super(tag);
        this.element.classList.add('darker');
    }
}
