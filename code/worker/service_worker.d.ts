/*
 *   Copyright (c) 2026 Thaddeus MW.
 *
 */

// Service worker types used by /sw.ts. The project compiles against the DOM
// library, which does not include the WebWorker ones, so the parts we use are
// declared here (none of these names exist in lib.dom).

interface ExtendableEvent extends Event {
    waitUntil(promise: Promise<unknown>): void;
}

interface FetchEvent extends ExtendableEvent {
    readonly request: Request;
    readonly resultingClientId: string;
    respondWith(response: Response | Promise<Response>): void;
}

interface Client {
    readonly id: string;
    readonly url: string;
    postMessage(message: unknown, transfer?: Transferable[]): void;
}

interface ExtendableMessageEvent extends ExtendableEvent {
    readonly data: any;
    readonly origin: string;
    readonly source: Client | ServiceWorker | MessagePort | null;
}

interface Clients {
    claim(): Promise<void>;
    get(id: string): Promise<Client | undefined>;
    matchAll(options?: { includeUncontrolled?: boolean; type?: 'window' | 'worker' | 'sharedworker' | 'all' }): Promise<Client[]>;
}

interface ServiceWorkerGlobalScopeEventMap {
    install: ExtendableEvent;
    activate: ExtendableEvent;
    fetch: FetchEvent;
    message: ExtendableMessageEvent;
}

interface ServiceWorkerGlobalScope {
    readonly clients: Clients;
    readonly location: Location;
    readonly registration: ServiceWorkerRegistration;
    skipWaiting(): Promise<void>;
    addEventListener<K extends keyof ServiceWorkerGlobalScopeEventMap>(
        type: K,
        listener: (event: ServiceWorkerGlobalScopeEventMap[K]) => void
    ): void;
}
