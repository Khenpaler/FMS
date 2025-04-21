<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class UserProfileRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        $profile = $this->route('user_profile');

        return [
            'last_name' => ['required', 'string', 'max:100'],
            'first_name' => ['required', 'string', 'max:100'],
            'middle_initial' => ['nullable', 'string', 'max:1'],
            'license_number' => [
                'nullable',
                'string',
                'max:50',
                Rule::unique('user_profile')->ignore($profile),
            ],
            'address' => ['required', 'string', 'max:255'],
            'date_of_birth' => ['required', 'date'],
            'sex' => ['required', Rule::in(['Male', 'Female'])],
            'contact_number' => ['required', 'string', 'max:20'],
            'contact_person' => ['nullable', 'string', 'max:20'],
            'contact_person_number' => ['nullable', 'string', 'max:20'],
            'user_profile_image' => ['nullable', 'file', 'image', 'max:2048'],
            'position' => [
                'required',
                Rule::in([
                    'operation_manager',
                    'dispatcher',
                    'driver',
                    'passenger_assistant_officer'
                ])
            ],
            'date_hired' => ['required', 'date'],
            'status' => ['required', Rule::in(['terminate', 'on_duty', 'off_duty'])]
        ];
    }
} 