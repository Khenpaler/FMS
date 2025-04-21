export type Position = 'driver' | 'dispatcher' | 'passenger_assistant_officer';
export type Status = 'terminate' | 'on_duty' | 'off_duty';
export type Sex = 'Male' | 'Female';

export interface PersonnelFormData {
    first_name: string;
    last_name: string;
    middle_initial?: string;
    license_number?: string;
    address: string;
    date_of_birth: string;
    sex: Sex;
    contact_number: string;
    contact_person?: string;
    contact_person_number?: string;
    user_profile_image?: string;
    position: Position;
    date_hired: string;
    status: Status;
    [key: string]: string | undefined;
}

export interface Personnel extends PersonnelFormData {
    user_profile_id: string;
    created_at: string;
    updated_at: string;
}
