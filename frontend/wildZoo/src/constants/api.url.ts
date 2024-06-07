import { MAIN_SERVER } from "./enviroments";

export class ApiUrl {
    public static GET_ALL_CLASSES = `${MAIN_SERVER}/classes`
    public static GET_ALL_SPECIES = `${MAIN_SERVER}/species`
    public static GET_ALL_ANIMALS = `${MAIN_SERVER}/animals`
    public static GET_ALL_USERS = `${MAIN_SERVER}/users`
    public static GET_ALL_PACKAGES = `${MAIN_SERVER}/packages`
    public static BUY_PACKAGE_POST = `${MAIN_SERVER}/packages/createpackagesale`
    public static GET_ALL_CONTINENTS = `${MAIN_SERVER}/continents`
    public static GET_ALL_EVENTS = `${MAIN_SERVER}/events`
    public static GET_ALL_TYPE_TICKETS = `${MAIN_SERVER}/tickets/types`;
    public static GET_ALL_SPONSORS = `${MAIN_SERVER}/sponsored`
    public static UPDATE_USER_POST = `${MAIN_SERVER}/users/update`;
    public static UPDATE_CREDIT_CARD_POST = `${MAIN_SERVER}/creditcard/update`
    public static GET_ALL_SERVICES = `${MAIN_SERVER}/services`
    public static REGISTER_USER_POST = `${MAIN_SERVER}/users/register`
    public static SAVE_SPONSORED_POST = `${MAIN_SERVER}/sponsored/save`
    public static SEND_CONTACT_MESSAGE = `${MAIN_SERVER}/contact`
    public static BUY_TICKET_POST = `${MAIN_SERVER}/tickets/buy`
    public static RESGISTER_EVENT_POST = `${MAIN_SERVER}/events/register`
    public static GET_ALL_AVAILABLE_SPONSORED = `${MAIN_SERVER}/sponsored/available/sponsors`
    public static GET_ALL_AVAILABLE_SPONSORS_ANIMAL = `${MAIN_SERVER}/sponsored/available`

    //Methods
    public static DELETE_TICKET = (id: number) => {
        return `${MAIN_SERVER}/tickets/delete/${id}`;
    }
    public static GET_ANIMAL_BY_ID(id: number) {
        return `${MAIN_SERVER}/animals/${id}`;
    }
    public static DELETE_CREDIT_CARD(id: number) {
        return `${MAIN_SERVER}/creditcard/delete/${id}`;
    }
    public static DELETED_PACKAGE_SALE(id: number) {
        return `${MAIN_SERVER}/packages/delete/packagesale/${id}`
    }
    public static GET_PACKAGE_BY_ID(id: number) {
        return `${MAIN_SERVER}/packages/${id}`;
    }
    public static GET_SPONSOR_AVAILABLE_BY_ID(id: number) {
        return `${MAIN_SERVER}/sponsored/available/${id}`;
    }
    public static GET_USER_BY_ID(id: number) {
        return `${MAIN_SERVER}/users/${id}`;
    }
    public static GET_USER_BY_USERNAME(username: string) {
        return `${MAIN_SERVER}/users/check/${username}`;
    }
    public static GET_EVENT_BY_ID(id: number) {
        return `${MAIN_SERVER}/events/${id}`;
    }
    public static GET_CLASS_BY_ID(id:number){
        return `${MAIN_SERVER}/classes/${id}`;
    }
    public static GET_SPECIE_BY_ID(id:number) {
        return `${MAIN_SERVER}/species/${id}`;
    } 
}