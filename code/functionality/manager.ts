class PageManager {
    element: HTMLElement;
    header: PageHeader;
    sidebar: PageSidebar;
    content: PageContent;
    notifications: PageNotifications;

    constructor() {
        this.element = document.body;
        this.header = new PageHeader(this);
        this.sidebar = new PageSidebar(this);
        this.content = new PageContent(this);
        this.notifications = new PageNotifications(this);
    }

    // toggles sidebar.. mobile view.. etc
    // this is mostly handled in the various css files
    public shiftView(force?: boolean): void {
        this.element.classList.toggle('shift', force);
    }

    // attempts to save the current page configuration with a given key
    // resaves previous data.. appends new key
    public saveData(key: string, data: Object) {
        try {
            const previous_data: string = window.localStorage.getItem('data') || '{}';
            let data_object: Record<string, Object> = JSON.parse(previous_data);
            data_object[key] = data;
            const new_data: string = JSON.stringify(data_object);
            window.localStorage.setItem('data', new_data);
        } catch(error: any) {
            throw new Error(error);
        }
    }

    // fetches a given key for loading
    public fetchData(key: string): Object {
        try {
            const previous_data: string = window.localStorage.getItem('data') || '{}';
            let data_object = JSON.parse(previous_data);
            return data_object[key];
        } catch(error: any) {
            throw new Error(error);
        }
    }
}