type notification = "success" | "error" | "warning" | "info" | "stock";

class NotificationHolder {
    element: HTMLElement;

    constructor() {
        this.element = document.createElement('div');
        this.element.classList.add('notification_holder');
        document.body.appendChild(this.element);
    }

    notify(text: string, color: notification|null|undefined) {
        new NotificationNode(this, text, color || 'stock');
    }
}

class NotificationNode {
    element: HTMLElement;

    constructor(parent: NotificationHolder, text: string, color: notification) {
        this.element = document.createElement('div');
        this.element.classList.add('notification');
        this.element.classList.add(color);
        this.element.textContent = text;
        parent.element.appendChild(this.element);

        setTimeout(() => {
            this.element.classList.add('fade');
            setTimeout(() => {
                this.element.remove();
            }, 500)
        }, 4500)
    }
}

const MainNotificationHolder: NotificationHolder = new NotificationHolder();