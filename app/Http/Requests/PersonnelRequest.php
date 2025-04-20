<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class PersonnelRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        $personnel = $this->route('personnel');
        
        return [
            'name' => ['required', 'string', 'max:255'],
            'birthday' => ['required', 'date', 'before:today'],
            'license_number' => [
                'nullable',
                'string',
                'max:255',
                Rule::unique('personnels')->ignore($personnel),
            ],
            'address' => ['required', 'string'],
            'phone_number' => ['required', 'string', 'max:255'],
            'contact_person' => ['required', 'string', 'max:255'],
            'type' => ['required', Rule::in(['drivers', 'pao', 'dispatchers'])],
            'is_active' => ['boolean'],
        ];
    }

    public function messages(): array
    {
        return [
            'birthday.before' => 'The birthday must be a date before today.',
            'type.in' => 'The type must be one of: drivers, pao, dispatchers.',
        ];
    }
} 