export class Hospital {

    static instanceHospital(obj: Hospital){

        return new Hospital(
            obj.name,
            obj.img,
            obj._id,
        )
    }

    constructor (
        public name: string,
        public img?: string,
        public _id?: string
    ) {

    }

}
