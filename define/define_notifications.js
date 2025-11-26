"use strict";
class NotificationHolder {
    element;
    constructor() {
        this.element = document.createElement('div');
        this.element.classList.add('notification_holder');
        document.body.appendChild(this.element);
    }
    notify(text, color) {
        new NotificationNode(this, text, color || 'stock');
    }
}
class NotificationNode {
    element;
    constructor(parent, text, color) {
        this.element = document.createElement('div');
        this.element.classList.add('notification');
        this.element.classList.add(color);
        this.element.textContent = text;
        parent.element.appendChild(this.element);
        setTimeout(() => {
            this.element.classList.add('fade');
            setTimeout(() => {
                this.element.remove();
            }, 500);
        }, 4500);
    }
}
const MainNotificationHolder = new NotificationHolder();
