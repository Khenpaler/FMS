export interface PersonnelFormData {
    name: string;
    type: PersonnelType;
    birthday: string;
    license_number?: string;
    address: string;
    phone_number: string;
    contact_person: string;
    is_active?: boolean;
    [key: string]: string | boolean | number | null | undefined;
}

export type PersonnelType = 'drivers' | 'pao' | 'dispatchers';

export interface Personnel extends PersonnelFormData {
    id: number;
    age: number;
    created_at: string;
    updated_at: string;
    deleted_at: string | null;
}
