type NotificationType = 'info' | 'warn' | 'error';

// invisible holder for page notifications
class PageNotifications extends PageElement {   
    active: NotificationLabel[] = [];

    constructor(manager: PageManager) {
        super();
        this.element.classList.add('notifications');
        this.setParent(manager.element);
    }

    public sendNotification(type: NotificationType, text: string, ms?: number): void {
        const label: NotificationLabel = new NotificationLabel(this, type, text);
        this.active.push(label);

        setTimeout(() => {
            this.active.splice(this.active.indexOf(label));
            label.remove();
        }, ms || 4500)
    }
}

class NotificationLabel extends PageElement {
    constructor(holder: PageNotifications, type: NotificationType, text: string) {
        super('span');
        this.element.classList.add(type);
        this.element.textContent = text;
        this.setParent(holder)
    }

    public remove(): void {
        this.element.classList.add('fade');
        setTimeout(() => {
            this.element.remove();
        }, 500)
    }
}