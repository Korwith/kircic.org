// shown at the top of the page
class PageHeader extends GlassPane {
    manager: PageManager;
    left_segment: HeaderSegmentLeft;
    right_segment: HeaderSegmentRight;

    constructor(manager: PageManager) {
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
abstract class HeaderSegment extends PageElement {
    header: PageHeader;

    constructor(header: PageHeader) {
        super();
        this.element.classList.add('segment');
        this.header = header;
        this.setParent(this.header);
    }
}

class HeaderSegmentLeft extends HeaderSegment {
    sidebar_toggle: HeaderButtonSidebar;

    constructor(header: PageHeader) {
        super(header);
        this.element.classList.add('left');
        this.sidebar_toggle = new HeaderButtonSidebar(this);
    }
}

class HeaderSegmentRight extends HeaderSegment {
    clock: HeaderClock;

    constructor(header: PageHeader) {
        super(header);
        this.element.classList.add('right');
        this.clock = new HeaderClock(this);
    }
}

// abstract button base
abstract class HeaderButton extends PageElement {
    segment: HeaderSegment;

    constructor(segment: HeaderSegment) {
        super('button');
        this.segment = segment;
        this.setParent(this.segment);
    }

    public abstract onclick(): void;
}

// toggles the sidebar
class HeaderButtonSidebar extends HeaderButton {
    constructor(segment: HeaderSegment) {
        super(segment);
        this.element.classList.add('sidebar_button');
        this.element.onclick = () => this.onclick();
    }

    public onclick(): void {
        this.segment.header.manager.shiftView();
    }
}

// shows the date and time
class HeaderClock extends PageElement {
    segment: HeaderSegment;
    date: HTMLElement;
    time: HTMLElement;

    constructor(segment: HeaderSegment) {
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
    protected updateClock(): void {
        const now: Date = new Date();
        const weekday: string = now.toLocaleDateString('en-US', { weekday: 'long' });
        const month: string = now.toLocaleDateString('en-US', { month: 'long' });
        const day: number = now.getDate();
        const year: number = now.getFullYear();
        this.date.textContent = `${weekday}, ${month} ${day}, ${year}`;

        const time: string = now.toLocaleTimeString('en-US', { hour12: true });
        this.time.textContent = time;
    }
}