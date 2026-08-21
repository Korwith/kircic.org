"use strict";
// shown at the top of the page
class PageHeader extends GlassPane {
    manager;
    left_segment;
    right_segment;
    constructor(manager) {
        super();
        this.manager = manager;
        this.element.classList.add('header');
        this.left_segment = new HeaderSegmentLeft(this);
        this.right_segment = new HeaderSegmentRight(this);
        this.setParent(manager.element);
    }
}
// subholders inside of the header
// abstract base
class HeaderSegment extends PageElement {
    header;
    constructor(header) {
        super();
        this.element.classList.add('segment');
        this.header = header;
        this.setParent(this.header);
    }
}
class HeaderSegmentLeft extends HeaderSegment {
    sidebar_toggle;
    constructor(header) {
        super(header);
        this.element.classList.add('left');
        this.sidebar_toggle = new HeaderButtonSidebar(this);
    }
}
class HeaderSegmentRight extends HeaderSegment {
    clock;
    constructor(header) {
        super(header);
        this.element.classList.add('right');
        this.clock = new HeaderClock(this);
    }
}
// abstract button base
class HeaderButton extends PageElement {
    segment;
    constructor(segment) {
        super('button');
        this.segment = segment;
        this.setParent(this.segment);
    }
}
// toggles the sidebar
class HeaderButtonSidebar extends HeaderButton {
    constructor(segment) {
        super(segment);
        this.element.classList.add('sidebar_button');
        this.element.onclick = () => this.onclick();
    }
    onclick() {
        this.segment.header.manager.shiftView();
    }
}
// shows the date and time
class HeaderClock extends PageElement {
    segment;
    date;
    time;
    constructor(segment) {
        super();
        this.segment = segment;
        this.date = document.createElement('time');
        this.time = document.createElement('time');
        this.date.classList.add('date');
        this.time.classList.add('time');
        this.element.classList.add('clock');
        this.element.appendChild(this.date);
        this.element.appendChild(this.time);
        this.setParent(this.segment);
        this.updateClock();
        setInterval(() => this.updateClock(), 1000);
    }
    // displays the current date and time
    // runs every second
    updateClock() {
        const now = new Date();
        const weekday = now.toLocaleDateString('en-US', { weekday: 'long' });
        const month = now.toLocaleDateString('en-US', { month: 'long' });
        const day = now.getDate();
        const year = now.getFullYear();
        this.date.textContent = `${weekday}, ${month} ${day}, ${year}`;
        const time = now.toLocaleTimeString('en-US', { hour12: true });
        this.time.textContent = time;
    }
}
