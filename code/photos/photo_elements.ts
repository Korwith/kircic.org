// emulates my css styles on snap.red
// a row dedicated to photo elements leading the user to snap.red
class PhotoRow extends PageElementScroll {
    segment: PhotosSegment;
    frames: PhotoFrame[] = [];
    show: number = 5;

    constructor(segment: PhotosSegment) {
        super('x');
        this.segment = segment;
        this.element.classList.add('photo_row');
        this.setParent(segment);
        this.attemptImagePreloads();
        this.createImageElements();
        window.onresize = () => this.handleImageVisibility();
    }

    // adds elements to the pane
    protected createImageElements(): void {
        const date_list: string[] = this.createDateList();

        for (const date of date_list) {
            const frame: PhotoFrame = new PhotoFrame(this, date);
            this.frames.push(frame);
        }
        requestAnimationFrame(() => this.handleImageVisibility());
    }

    // handles visible image elements
    protected handleImageVisibility(): void {
        const bounds: DOMRect = this.element.getBoundingClientRect();
        const count: number = Math.floor(bounds.width / 210);

        for (const i in this.frames) {
            const frame: PhotoFrame = this.frames[i];
            frame.toggle(parseInt(i) < count || parseInt(i) < this.show);
        }
        this.element.classList.toggle('overflowing', this.element.scrollWidth - 1 > Math.ceil(bounds.width));
    }

    // handling data
    // parses through data.ts fetched from snap.red
    protected fetchImages(featured?: boolean): PhotoDatabase {
        // incase Data does not exist
        // most likely the user doesn't have an internet connection
        let photos: PhotoDatabase | undefined;
        try {
            photos = Data['Thaddeus'].images;
        } catch (error: unknown) {
            photos = Data_Backup;
            //this.segment.hide();
        }

        const user_photos: PhotoDatabase = photos;
        const featured_database: PhotoDatabase = {};
        const non_featured_database: PhotoDatabase = {};

        for (const date in user_photos) {
            const entry: PhotoEntry = user_photos[date];
            if (entry.featured) featured_database[date] = entry;
            else non_featured_database[date] = entry;
        }

        switch (featured) {
            case true: return featured_database;
            case false: return non_featured_database;
            default: return user_photos;
        }
    }

    // takes a date and returns the associated image entry
    public findImageByDate(date: string): PhotoEntry | null {
        const photos: PhotoDatabase = this.fetchImages();
        return photos[date];
    }

    // creates list of entries which are displayed on the website
    protected createDateList(): string[] {
        const featured_database: PhotoDatabase = this.fetchImages(true);
        const non_featured_database: PhotoDatabase = this.fetchImages(false);

        const featured_dates: string[] = Object.keys(featured_database);
        const non_featured_dates: string[] = Object.keys(non_featured_database);

        // i may change how many featured photos show and how many chronological show
        const list = [...featured_dates, ...non_featured_dates].slice(0, 10);

        return list;
    }

    // checks an iamge id to see if it matches one already saved
    public isImageSaved(id: number | string): boolean {
        const saved: Array<string> = [];
        for (const date in Data_Backup) {
            const entry: PhotoEntry = Data_Backup[date];
            saved.push(entry.id[0].toString());
        }
        return saved.includes(id.toString());
    }

    // attempts to preload images shown on photos page
    private attemptImagePreloads(): void {
        let photos: PhotoDatabase | undefined;

        try {
            photos = Data_Backup;
        } catch(error: unknown) {
            console.info('Fallback snap.red image loading appears to have failed (no big deal)');
        }

        for (const date in photos) {
            const entry: PhotoEntry = photos[date];
            const img: HTMLImageElement = new Image();
            img.src = `../code/photos/fallback/IMG_${entry.id[0]}.jpg`;
        }
    }
}

abstract class MediaFrame extends PageElement {
    row: PhotoRow;
    date: string;

    image: HTMLElement;
    date_label: HTMLElement;
    caption: HTMLElement;

    constructor(row: PhotoRow, date: string) {
        super('a');
        this.row = row;
        this.date = date;
        this.element.classList.add('media_frame');

        this.image = document.createElement('img');
        this.date_label = document.createElement('span');
        this.caption = document.createElement('span');

        this.date_label.classList.add('date');
        this.caption.classList.add('caption');

        this.element.appendChild(this.image);
        this.element.appendChild(this.date_label);
        this.element.appendChild(this.caption);

        this.setParent(row);
    }

    // toggles visibility
    public toggle(force?: boolean) {
        this.element.classList.toggle('hide', !force);
    }

    // populates the media frame
    protected abstract loadFrame(): void;
}

// image element emulating snap.red style
class PhotoFrame extends MediaFrame {
    constructor(row: PhotoRow, date: string) {
        super(row, date);
        this.element.classList.add('photo');
        this.loadFrame();
    }

    // populates the media frame
    protected loadFrame(): void {
        const entry: PhotoEntry | null = this.row.findImageByDate(this.date);
        this.element.setAttribute('href', `https://snap.red/#user=Thaddeus&date=${this.date.replaceAll('/', '')}`);
        this.element.setAttribute('date', this.date);
        this.image.setAttribute('loading', 'lazy');
        this.date_label.textContent = this.date;

        if (!entry) throw new Error('Entry does not exist, cannot apply image');
        this.element.setAttribute('name', entry.name);
        this.caption.textContent = entry.name;
        this.element.classList.toggle('featured', entry.featured != undefined);
        this.image.setAttribute('src', this.fetchHref(entry.id[0]));
    }

    // gets href based on the id
    private fetchHref(number: number | string) {
        const local: boolean = this.row.isImageSaved(number);
        return local
        ? `../code/photos/fallback/IMG_${number}.jpg`
        : `https://snap.red/media/Thaddeus/IMG_${number}.jpg`
    }
}