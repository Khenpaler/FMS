export interface PersonnelFormData {
    name: string;
    type: string;
    birthday: string;
    license_number: string;
    address: string;
    phone_number: string;
    contact_person: string;
    [key: string]: string | undefined;
}

export type PersonnelType = 'drivers' | 'pao' | 'dispatchers';

export interface Personnel {
    id: number;
    name: string;
    birthday: string;
    age: number;
    license_number: string;
    address: string;
    phone_number: string;
    contact_person: string;
    type: PersonnelType;
    is_active: boolean;
}
