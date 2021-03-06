export class LoggedInUser {
    constructor(id: string, access_token: string, username: string, fullName: string, email: string, avatar: string,
        address: string, birthday: string, phonenumber: string, gender: boolean, status: boolean, roles: any[]) {
        this.id = id;
        this.access_token = access_token;
        this.fullName = fullName;
        this.username = username;
        this.email = email;
        this.avatar = avatar;
        this.address = address;
        this.birthday = birthday;
        this.phonenumber = phonenumber;
        this.gender = gender;
        this.status = status;
        this.roles = roles;
    }
    public id: string;
    public access_token: string;
    public username: string;
    public fullName: string;
    public email: string;
    public avatar: string;
    public address: string;
    public birthday: string;
    public phonenumber: string;
    public gender: boolean;
    public status: boolean;
    public roles: any[];
}