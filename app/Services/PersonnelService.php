<?php

namespace App\Services;

use App\Models\Personnel;
use Illuminate\Pagination\LengthAwarePaginator;
use Illuminate\Support\Carbon;

class PersonnelService
{
    public function getPaginatedPersonnel(
        string $type = 'drivers',
        ?string $search = null,
        bool $onlyActive = true,
        int $perPage = 10
    ): LengthAwarePaginator {
        $query = Personnel::query()
            ->ofType($type);

        if ($onlyActive) {
            $query->active();
        }

        if ($search) {
            $query->where(function ($q) use ($search) {
                $q->where('name', 'like', "%{$search}%")
                    ->orWhere('license_number', 'like', "%{$search}%");
            });
        }

        return $query->latest()->paginate($perPage);
    }

    public function create(array $data): Personnel
    {
        $data['age'] = Carbon::parse($data['birthday'])->age;
        return Personnel::create($data);
    }

    public function update(Personnel $personnel, array $data): Personnel
    {
        if (isset($data['birthday'])) {
            $data['age'] = Carbon::parse($data['birthday'])->age;
        }
        
        $personnel->update($data);
        return $personnel->fresh();
    }

    public function delete(Personnel $personnel): bool
    {
        return $personnel->delete();
    }

    public function restore(Personnel $personnel): bool
    {
        return $personnel->restore();
    }

    public function toggleActive(Personnel $personnel): Personnel
    {
        $personnel->update(['is_active' => !$personnel->is_active]);
        return $personnel->fresh();
    }
} 