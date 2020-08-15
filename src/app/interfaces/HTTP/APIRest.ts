import { Hospital } from 'src/app/models/hospital.model';

export interface getHospitals {
    ok:         string;
    hospitals:  Hospital[];
    total:      number;
    totalPages: number;
    inPage:     number;
    limit:      number;
}

export interface createHospital {
    ok:       string;
    hospital: Hospital;
}

