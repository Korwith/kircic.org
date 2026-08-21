abstract class GlassPane extends PageElement {
    constructor(tag?: string) {
        super(tag);
        this.element.classList.add('glass');
    }
}

abstract class DarkGlassPane extends GlassPane {
    constructor(tag?: string) {
        super(tag);
        this.element.classList.add('dark');
    }
}

abstract class ShadowGlassPane extends GlassPane {
    constructor(tag?: string) {
        super(tag);
        this.element.classList.add('darker');
    }
}