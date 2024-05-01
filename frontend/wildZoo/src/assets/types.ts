export type GalleryAnimalsOptions = {
    animals: GalleryAnimal[];
    increaseAnimal: boolean;
    hoverAnimal: boolean;
    rowHeight: string | number;
    numberCols:number;
}

export type CardData = {
    state: "default" | "flipped" | "matched";
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
    specie:      Specie;
}

export type Aclass = {
    id:   number;
    name: string;
    animals: Animal[];
}

export type Continent = {
    id:          number;
    name:        string;
    description: string;
    animals: Animal[];
}

export type Event = {
    id:          number;
    name:        string;
    date:        Date;
    initialHour: number;
    finishHour:  number;
    description: string;
    animals: Animal[]
}

export type Tile = {
    id: number;
    urlImage: string;
    cols: number;
    rows: number;
}

export type Package = {
    id:              number;
    name:            string;
    description:     string;
    typeTour:        TypeTour;
    packageType:     PackageType;
    packageServices: PackageService[];
}

export type PackageService = {
    id:      number;
    name:    string;
    include: boolean;
}

export type PackageType = {
    id:               number;
    min_size:         number;
    max_size:         number;
    price_per_person: number;
}

export type TypeTour = {
    id:   number;
    name: string;
}

export type User = {
    id:             number;
    email:          string;
    password:       string;
    name:           string;
    firstSurname:   string;
    lastSurname:    string;
    creditCardList: CreditCardList[];
    tickets:        Ticket[];
    adoptions:      Adoption[];
    packageSales:   any[];
}

export type Adoption = {
    id:             number;
    date:           Date;
    adoptionAnimal: AdoptionAnimal;
    animal:         Animal;
}

export type AdoptionAnimal = {
    id:    number;
    price: number;
}

export type CreditCardList = {
    id:             number;
    number:         number;
    expirationDate: string;
    cvv:            number;
}

export type Ticket = {
    id:         number;
    date:       Date;
    typeTicket: TypeTicket;
}

export type TypeTicket = {
    id:    number;
    name:  string;
    price: number;
}


export type Service = {
    id:    number;
    name:  string;
    description: string;
}

export type ApiResponse<T> = {
    data: T[];
}

export type SpecieResponse = ApiResponse<Specie[]>;
export type AnimalResponse = ApiResponse<Animal[]>;
export type AclassResponse = ApiResponse<Aclass[]>;
export type ContinentResponse = ApiResponse<Continent[]>;
export type PackageResponse = ApiResponse<Package[]>;
export type EventResponse = ApiResponse<Event[]>;
export type UserResponse = ApiResponse<User[]>;
export type ServiceResponse = ApiResponse<Service[]>;
