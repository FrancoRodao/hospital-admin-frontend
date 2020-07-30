import { User } from './user.model';
import { Hospital } from './hospital.model';

export class Doctor {

    constructor(
        public name: string,
        public hospital: Hospital,
        public img?: string,
        public lastUserModifedIt?: User,
        public _id?: string
    ) { }

}