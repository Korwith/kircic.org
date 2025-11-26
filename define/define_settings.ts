type SettingsEventData = {data: string|boolean|null};
type SettingType = 'switch' | 'color';

const DefaultSettings: Record<string, string | boolean> = {
    'Page Color': '#0c3365',
    'Hide Bookmarks': false,
    'Save Last Search': true,
    'Open New Tab': false,
}

class SettingsEntry {
    private save: StorageHandler;
    private event_detail: SettingsEventData = {data: null};

    element: HTMLElement;
    switch?: HTMLElement;
    color?: HTMLElement;
    name: string;

    constructor(parent: HTMLElement, name: string, type: SettingType) {
        this.save = new StorageHandler('settings');
        this.save.initializeKeys(DefaultSettings);

        this.name = name;
        this.element = this.#makeElement();
        this.element.textContent = name;
        parent.appendChild(this.element);

        if (type == 'switch') {
            this.switch = this.#makeSwitch();
        }
        if (type == 'color') {
            this.color = this.#makeColor();
        }
    }

    #dispatchChange(): void {
        let event: CustomEvent<SettingsEventData> = new CustomEvent<SettingsEventData>(this.name, {
            detail: this.event_detail,
            bubbles: true,
            cancelable: true,
        })
        document.dispatchEvent(event);
    }

    #makeElement(): HTMLElement {
        let block = document.createElement('div');
        block.classList.add('settings_entry');
        return block;
    }

    #makeSwitch(): HTMLElement {
        let previous_save: unknown = this.save.getItem(this.name);
        let toggle = document.createElement('div');
        toggle.classList.add('darkglass', 'settings_switch');
        toggle.classList.toggle('active', previous_save ? true : false);
        toggle.onclick = () => {
            let status: boolean = toggle.classList.toggle('active');
            this.event_detail.data = status;
            this.#dispatchChange();
            this.save.setItem(this.name, status);
        }
        this.element.appendChild(toggle);

        let dot = document.createElement('div');
        dot.classList.add('darkglass');
        dot.classList.add('settings_dot');
        toggle.appendChild(dot);
        return toggle;
    }

    #makeColor(): HTMLElement {
        let previous_save: unknown = this.save.getItem(this.name);
        let picker = document.createElement('div');
        picker.classList.add('darkglass', 'settings_color_picker');

        let input: HTMLInputElement = document.createElement('input');
        input.type = 'color';

        let setColor = () => {
            this.event_detail.data = input.value;
            this.#dispatchChange();
        }
        input.addEventListener('input', () => {
            setColor();
            this.save.setItem(this.name, input.value)
        })
        if (previous_save) {
            input.value = previous_save as string;
            setColor();
        }
        picker.appendChild(input);
        picker.onclick = () => input.click();

        this.element.appendChild(picker);
        return picker;
    }
}