export type Role = 'admin' | 'dispatcher' | 'driver' | 'passenger_assistant_officer';

export interface AccountFormData {
    name: string;
    email: string;
    password?: string;
    password_confirmation?: string;
    role_id: number;
    [key: string]: string | number | undefined;
}

export interface Account {
    id: number;
    name: string;
    email: string;
    role_id: number;
    role: {
        role_id: number;
        name: string;
    };
    email_verified_at: string | null;
    created_at: string;
    updated_at: string;
    is_active: boolean;
}
