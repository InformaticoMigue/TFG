import { MAIN_SERVER } from "./enviroments";

export class ApiUrl {
    public static GET_ALL_CLASSES = `http://${MAIN_SERVER}/classes`
    public static GET_ALL_SPECIES = `http://${MAIN_SERVER}/species`
    public static GET_ALL_ANIMALS = `http://${MAIN_SERVER}/animals`
    public static GET_ALL_USERS = `http://${MAIN_SERVER}/users`
    public static GET_ALL_PACKAGES = `http://${MAIN_SERVER}/packages`
    public static BUY_PACKAGE_POST = `http://${MAIN_SERVER}/packages/createpackagesale`
    public static GET_ALL_CONTINENTS = `http://${MAIN_SERVER}/continents`
    public static GET_ALL_EVENTS = `http://${MAIN_SERVER}/events`
    public static GET_ALL_ADOPTIONS = `http://${MAIN_SERVER}/adoptions`
    public static UPDATE_USER_POST = `http://${MAIN_SERVER}/users/update`;
    public static UPDATE_CREDIT_CARD_POST = `http://${MAIN_SERVER}/creditcard/update`
    public static GET_ALL_SERVICES = `http://${MAIN_SERVER}/services`
    public static REGISTER_USER_POST = `http://${MAIN_SERVER}/users/register`
    public static SAVE_ADOPTION_POST = `http://${MAIN_SERVER}/adoptions/save`
    
    //Methods
    public static DELETE_TICKET = (id: number) => {
        return `http://${MAIN_SERVER}/tickets/delete/${id}`;
    }
    public static GET_ANIMAL_BY_ID(id: number) {
        return `http://${MAIN_SERVER}/animals/${id}`;
    }
    public static DELETE_CREDIT_CARD(id: number) {
        return `http://${MAIN_SERVER}/creditcard/delete/${id}`;
    }
    public static DELETED_PACKAGE_SALE(id: number) {
        return `http://${MAIN_SERVER}/packages/delete/packagesale/${id}`
    }
    public static GET_PACKAGE_BY_ID(id: number) {
        return `http://${MAIN_SERVER}/packages/${id}`;
    }
    public static GET_ADOPTION_AVAILABLE_BY_ID(id: number) {
        return `http://${MAIN_SERVER}/adoptions/available/${id}`;
    }
    public static GET_USER_BY_ID(id: number) {
        return `http://${MAIN_SERVER}/users/${id}`;
    }
    public static GET_USER_BY_USERNAME(username: string) {
        return `http://${MAIN_SERVER}/users/check/${username}`;
    }
    public static GET_EVENT_BY_ID(id: number) {
        return `http://${MAIN_SERVER}/events/${id}`;
    }
    public static GET_CLASS_BY_ID(id:number){
        return `http://${MAIN_SERVER}/classes/${id}`;
    }
    public static GET_SPECIE_BY_ID(id:number) {
        return `http://${MAIN_SERVER}/species/${id}`;
    } 
}