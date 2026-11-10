/*
 *   Copyright (c) 2026 Thaddeus MW.
 *   
 */

type HexColor = `#${string}`;
type RGBColor = `rgb(${number}, ${number}, ${number})`;
type RGBAColor = `rgba(${number}, ${number}, ${number}, ${number})`;
type HighlightedUserColor = 'pink' | 'purple'

interface Database {
    [name: string]: UserEntry;
}

interface UserEntry {
    card: ProfileCardEntry;
    social: ProfileSocialDatabase;
    images: PhotoDatabase;
    videos?: VideoDatabase;
}

interface ProfileCardEntry {
    bio: string;
    icon: string;
    site?: ProfileWebsiteEntry;
}

interface ProfileSocialDatabase {
    [service: string]: string;
}

interface ProfileWebsiteEntry {
    url: string;
    icon: string;
    name: string;
    blurb: string;
    gradient: string[];
}

interface PhotoDatabase {
    [date: string]: PhotoEntry;
}

interface CustomIconConfig {
    calender?: {icon: string, size?: string},
    footer?: {icon: string, size?: string},
}

// a photo id listed bare, or given extra attributes (matches snap.red)
type PhotoIDEntry = string | number | Record<string | number, PhotoAttributes>;

interface PhotoAttributes {
    coords?: [number, number];
}

interface PhotoEntry {
    name: string;
    id: PhotoIDEntry[];
    people?: string[];
    featured?: number;
    camera?: {name: string, mp?: number};
    caption?: string;
    gps?: Record<string | number, [number, number]>
    hover_color?: HexColor;
    custom_icons?: CustomIconConfig;
}

// handles inner photo data
class PhotoIDManager {
    // returns every photo id in the entry, in display order
    static list(entry: PhotoEntry): (string | number)[] {
        const ids: (string | number)[] = [];
        for (const item of entry.id) {
            if (typeof item === 'object') ids.push(...Object.keys(item));
            else ids.push(item);
        }
        return ids;
    }

    // returns the first photo id in the entry
    static first(entry: PhotoEntry): string | number {
        return PhotoIDManager.list(entry)[0];
    }
}

interface VideoDatabase {
    [date: string]: VideoEntry;
}

interface VideoEntry {
    name: string;
    thumbnail: string;
    link: string;
}

interface SidebarStructure {
    [year: string]: {
        [month: string]: {
            [date: string]: PhotoEntry;
        }
    }
}

interface HighlightedUserList {
    [key: string]: HighlightedUserColor;
}