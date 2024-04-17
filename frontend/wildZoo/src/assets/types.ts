export type GalleryAnimalsOptions = {
    animals: GalleryAnimal[];
    increaseAnimal: boolean;
    hoverAnimal: boolean;
    rowHeight: string | number;
    numberCols:number;
}

export type GalleryAnimal = {
    id?:number;
    name: string;
    class: string;
    image: string;
    cols: number;
    rows: number;
}

export type Specie = {
    id:      number;
    name:    string;
    animals: Animal[];
}

export type Animal = {
    id:          number;
    name:        string;
    age:         number;
    description: string;
    birthDate:   Date;
    weight:      number;
    continent:   Continent;
    events:      Event[];
    aclass:      Aclass;
    specie: Specie;
}

export type Aclass = {
    id:   number;
    name: Name;
    animals: Animal[];
}

export interface Continent {
    id:          number;
    name:        string;
    description: string;
    animals: Animal[];
}

export interface Event {
    id:          number;
    name:        string;
    date:        Date;
    initialHour: number;
    finishHour:  number;
    description: string;
    animals: Animal[]
}

export enum Name {
    Anfibios = "Anfibios",
    Artropodos = "Artropodos",
    Insectos = "Insectos",
    Mamíferos = "Mamíferos",
    Peces = "Peces",
    Reptiles = "Reptiles",
}