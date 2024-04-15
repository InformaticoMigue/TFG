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