export class User{

    static instanceUser(obj: User){

        return new User(
            obj.name,
            obj.email,
            obj.password,
            obj.img,
            obj.role,
            obj.google,
            obj._id
        )

    }

    constructor(
        public name: string,
        public email: string,
        public password?: string,
        public img?: string,
        public role?: 'ADMIN_ROLE' | 'USER_ROLE',
        public google?: boolean,
        public _id?: string,
    ){

    }

    
}