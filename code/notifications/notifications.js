"use strict";
// invisible holder for page notifications
class PageNotifications extends PageElement {
    active = [];
    constructor(manager) {
        super();
        this.element.classList.add('notifications');
        this.setParent(manager.element);
    }
    sendNotification(type, text, ms) {
        const label = new NotificationLabel(this, type, text);
        this.active.push(label);
        setTimeout(() => {
            this.active.splice(this.active.indexOf(label));
            label.remove();
        }, ms || 4500);
    }
}
class NotificationLabel extends PageElement {
    constructor(holder, type, text) {
        super('span');
        this.element.classList.add(type);
        this.element.textContent = text;
        this.setParent(holder);
    }
    remove() {
        this.element.classList.add('fade');
        setTimeout(() => {
            this.element.remove();
        }, 500);
    }
}
