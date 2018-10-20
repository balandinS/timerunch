export class WatchModel {
    private  typeWatch: string;
    private brand: string;
    private model: string;
    private referenceNUmber: number;
    private condition: string;
    private scopeDelivery : string;
    private price: number;
    private allowPrice: boolean;
    private description: string;
    private improtantDetails : {
        gender: string,
        movement: string,
        caseMarerail: string,
        caseDaimeter: number,
        year: number
    }

    constructor(
        typeWatch:string,
        brand:string,
        model:string,
        condition: string,
        scopeDelivery:string,
        price: number
        ) 
        {
        this.typeWatch = typeWatch;
        this.brand = brand;
        this.model = model;
        this.condition = condition;
        this.scopeDelivery = scopeDelivery;
        this.price = price; 
    }
}