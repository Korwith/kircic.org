type SettingsEventData = { data: string | boolean | null };
type SettingType = 'switch' | 'color' | 'image';
type ValidSetting = 'Page Color' | 'Hide Bookmarks' | 'Save Last Search' | 'Open New Tab' | 'More Saved Searches' | 'Background'

const DefaultSettings: Record<ValidSetting, string | boolean> = {
    'Page Color': '#0c3365',
    'Background': '/icon/blurred.svg',
    'Hide Bookmarks': false,
    'Save Last Search': true,
    'Open New Tab': false,
    'More Saved Searches': false,
}

class SettingsEntry {
    save: StorageHandler;
    event_detail: SettingsEventData;

    element: HTMLElement;
    name: string;

    constructor(parent: HTMLElement, name: ValidSetting) {
        this.save = new StorageHandler('settings');
        this.save.initializeKeys(DefaultSettings);
        this.event_detail = { data: null };

        this.name = name;
        this.element = this.#makeElement();
        this.element.textContent = name;
        parent.appendChild(this.element);
    }

    dispatchChange(): void {
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
}

class ColorSettingsEntry extends SettingsEntry {
    color: HTMLElement;

    constructor(parent: HTMLElement, name: ValidSetting) {
        super(parent, name);
        this.color = this.#makeColor();
    }

    #makeColor(): HTMLElement {
        let previous_save: unknown = this.save.getItem(this.name);
        let picker = document.createElement('div');
        picker.classList.add('darkglass', 'settings_color_picker');

        let input: HTMLInputElement = document.createElement('input');
        input.type = 'color';

        let setColor = () => {
            this.event_detail.data = input.value;
            this.dispatchChange();
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

class SwitchSettingsEntry extends SettingsEntry {
    switch: HTMLElement;

    constructor(parent: HTMLElement, name: ValidSetting) {
        super(parent, name);
        this.switch = this.#makeSwitch();
    }

    #makeSwitch(): HTMLElement {
        let previous_save: unknown = this.save.getItem(this.name);
        let toggle = document.createElement('div');
        toggle.classList.add('darkglass', 'settings_switch');
        toggle.classList.toggle('active', previous_save ? true : false);
        toggle.onclick = () => {
            let status: boolean = toggle.classList.toggle('active');
            this.event_detail.data = status;
            this.dispatchChange();
            this.save.setItem(this.name, status);
        }
        this.element.appendChild(toggle);

        let dot = document.createElement('div');
        dot.classList.add('darkglass');
        dot.classList.add('settings_dot');
        toggle.appendChild(dot);
        return toggle;
    }
}

class ImageSettingsEntry extends SettingsEntry {
    images: HTMLElement[];

    constructor(parent: HTMLElement, name: ValidSetting) {
        super(parent, name);
        this.images = [];
    }
}