export class User {
    id: number;
    firstName: string;
    secondName: string;
    email: string;
    password: string;
    phone?: string;
    registrationDate: Date;
    loginDate: Date;
}