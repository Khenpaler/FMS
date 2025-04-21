<?php

namespace App\Services;

use App\Models\UserProfile;
use Illuminate\Pagination\LengthAwarePaginator;
use Illuminate\Support\Facades\Storage;

class UserProfileService
{
    public function getPaginatedProfiles(
        int $perPage = 10,
        array $filters = []
    ): LengthAwarePaginator {
        $query = UserProfile::query()
            ->with('user');

        if (isset($filters['position'])) {
            $query->where('position', $filters['position']);
        }

        if (isset($filters['status'])) {
            $query->where('status', $filters['status']);
        }

        if (isset($filters['search'])) {
            $query->where(function ($q) use ($filters) {
                $q->where('first_name', 'like', "%{$filters['search']}%")
                    ->orWhere('last_name', 'like', "%{$filters['search']}%")
                    ->orWhere('license_number', 'like', "%{$filters['search']}%");
            });
        }

        return $query->latest()->paginate($perPage);
    }

    public function create(array $data): UserProfile
    {
        if (isset($data['user_profile_image']) && $data['user_profile_image']->isValid()) {
            $path = $data['user_profile_image']->store('profile-images', 'public');
            $data['user_profile_image'] = $path;
        }

        return UserProfile::create($data);
    }

    public function update(UserProfile $profile, array $data): UserProfile
    {
        if (isset($data['user_profile_image']) && $data['user_profile_image']->isValid()) {
            // Delete old image if exists
            if ($profile->user_profile_image) {
                Storage::disk('public')->delete($profile->user_profile_image);
            }
            
            $path = $data['user_profile_image']->store('profile-images', 'public');
            $data['user_profile_image'] = $path;
        }

        $profile->update($data);
        return $profile->fresh();
    }

    public function delete(UserProfile $profile): bool
    {
        // Delete profile image if exists
        if ($profile->user_profile_image) {
            Storage::disk('public')->delete($profile->user_profile_image);
        }

        return $profile->delete();
    }
} 