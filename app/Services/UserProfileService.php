<?php

namespace App\Services;

use App\Models\User;
use App\Models\UserProfile;
use Illuminate\Pagination\LengthAwarePaginator;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Carbon;

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

        // Create the user profile
        $userProfile = UserProfile::create($data);

        // Generate username and password
        $dateHired = Carbon::parse($data['date_hired']);
        $username = strtolower($data['first_name'] . '.' . $data['last_name']);
        $password = $dateHired->format('mdy') . '_' . strtoupper($data['last_name']);

        // Create user account
        $user = User::create([
            'name' => $data['first_name'] . ' ' . $data['last_name'],
            'email' => $username . '@fms.com',
            'password' => Hash::make($password),
            'role_id' => $this->getRoleIdByPosition($data['position']),
            'user_profile_id' => $userProfile->user_profile_id
        ]);

        return $userProfile;
    }

    /**
     * Get the appropriate role ID based on the position
     */
    private function getRoleIdByPosition(string $position): int
    {
        // Map positions to role IDs
        $roleMap = [
            'operation_manager' => 1,
            'dispatcher' => 2,
            'driver' => 3,
            'passenger_assistant_officer' => 4
        ];

        return $roleMap[$position] ?? 3; // Default to driver role if position not found
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