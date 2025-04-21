<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasOne;

class UserProfile extends Model
{
    protected $table = 'user_profile';
    protected $primaryKey = 'user_profile_id';

    protected $fillable = [
        'last_name',
        'first_name',
        'middle_initial',
        'license_number',
        'address',
        'date_of_birth',
        'sex',
        'contact_number',
        'contact_person',
        'contact_person_number',
        'user_profile_image',
        'position',
        'date_hired',
        'status'
    ];

    protected $casts = [
        'date_of_birth' => 'date',
        'date_hired' => 'date'
    ];

    public function user()
    {
        return $this->hasOne(User::class, 'user_profile_id');
    }
} 