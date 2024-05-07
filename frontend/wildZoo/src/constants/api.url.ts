export class ApiUrl {
    public static GET_ALL_CLASSES = `http://localhost:8080/classes` 
    public static GET_ALL_SPECIES = `http://localhost:8080/species` 
    public static GET_ALL_ANIMALS = `http://localhost:8080/animals` 
    public static GET_ANIMAL_BY_ID(id: number) {
        return `http://localhost:8080/animals/${id}`;
    }
    public static GET_ALL_PACKAGES = `http://localhost:8080/packages`
    public static GET_ALL_CONTINENTS = `http://localhost:8080/continents`
    public static GET_ALL_EVENTS = `http://localhost:8080/events`
    public static GET_EVENT_BY_ID(id: number) {
        return `http://localhost:8080/events/${id}`;
    }
    public static GET_ALL_ADOPTIONS = `http://localhost:8080/adoptions`
    public static GET_ADOPTION_AVAILABLE_BY_ID(id: number) {
        return `http://localhost:8080/adoptions/available/${id}`;
    }
    public static GET_ALL_USERS = `http://localhost:8080/users`
    public static GET_ALL_SERVICES = `http://localhost:8080/services`
    
}