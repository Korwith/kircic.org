/*
 *   Copyright (c) 2026 Thaddeus MW.
 *   
 */

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
            const index: number = this.active.indexOf(label);
            if (index !== -1) this.active.splice(index, 1);
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

// registers the page cache (service worker) and warns the user
// when the page was loaded from cache or the connection drops
class OfflineNotifier {
    notifications: PageNotifications;
    notified: boolean = false;

    constructor(notifications: PageNotifications) {
        this.notifications = notifications;

        window.addEventListener('offline', () => this.notifyOffline('Connection lost. Using cached pages.'));
        window.addEventListener('online', () => {
            if (!this.notified) return;
            this.notified = false;
            this.notifications.sendNotification('info', 'Back online.');
        });

        if (!navigator.onLine) this.notifyOffline();
        this.registerCache();
    }

    private notifyOffline(text: string = 'You are offline. Showing a cached version of this page.'): void {
        if (this.notified) return;
        this.notified = true;
        this.notifications.sendNotification('warn', text, 7000);
    }

    private async registerCache(): Promise<void> {
        if (!('serviceWorker' in navigator)) return;

        // the worker reports whether it answered this page's request from cache
        navigator.serviceWorker.addEventListener('message', (event: MessageEvent) => {
            if (event.data?.type === 'offline-status' && event.data.offline) this.notifyOffline();
        });
        navigator.serviceWorker.controller?.postMessage({ type: 'offline-status' });

        try {
            await navigator.serviceWorker.register('/sw.js');
        } catch (error) {
            console.warn('Page cache unavailable:', error);
        }
    }
}
