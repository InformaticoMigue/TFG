export interface ContainerIcons {
    total_count: number;
    icons:       Icon[];
}

export interface Icon {
    icon_id:       number;
    tags:          string[];
    published_at:  Date;
    is_premium:    boolean;
    type:          Type;
    containers:    Container[];
    raster_sizes:  RasterSize[];
    vector_sizes:  VectorSize[];
    styles:        Category[];
    categories:    Category[];
    is_icon_glyph: boolean;
    prices?:       Price[];
    is_purchased?: boolean;
}

export interface Category {
    identifier: string;
    name:       string;
}

export interface Container {
    format:       ContainerFormat;
    download_url: string;
}

export enum ContainerFormat {
    AI = "ai",
    Icns = "icns",
    Ico = "ico",
    SVG = "svg",
}

export interface Price {
    license:  License;
    currency: Currency;
    price:    number;
}

export enum Currency {
    Usd = "USD",
}

export interface License {
    license_id: number;
    name:       Name;
    url:        string;
    scope:      Scope;
}

export enum Name {
    BasicLicense = "Basic license",
}

export enum Scope {
    Basic = "basic",
}

export interface RasterSize {
    formats:     FormatElement[];
    size:        number;
    size_width:  number;
    size_height: number;
}

export interface FormatElement {
    format:       PurpleFormat;
    preview_url:  string;
    download_url: string;
}

export enum PurpleFormat {
    PNG = "png",
}

export enum Type {
    Vector = "vector",
}

export interface VectorSize {
    formats:      Container[];
    target_sizes: Array<number[]>;
    size:         number;
    size_width:   number;
    size_height:  number;
}
