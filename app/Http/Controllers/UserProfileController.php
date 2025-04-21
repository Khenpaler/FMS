<?php

namespace App\Http\Controllers;

use App\Http\Requests\UserProfileRequest;
use App\Models\UserProfile;
use App\Services\UserProfileService;
use Illuminate\Http\RedirectResponse;
use Inertia\Inertia;
use Inertia\Response;

class UserProfileController extends Controller
{
    private readonly UserProfileService $userProfileService;

    public function __construct(UserProfileService $userProfileService)
    {
        $this->userProfileService = $userProfileService;
    }

    public function index(): Response
    {
        $profiles = $this->userProfileService->getPaginatedProfiles(
            request('per_page', 10),
            request()->only(['position', 'status', 'search'])
        );

        return Inertia::render('personnel-management/personnels/index', [
            'personnel' => $profiles->items(),
            'position' => request('position', 'driver'),
            'type' => request('type', 'all'),
            'filters' => request()->all(['search', 'type']),
            'pagination' => [
                'current_page' => $profiles->currentPage(),
                'last_page' => $profiles->lastPage(),
                'per_page' => $profiles->perPage(),
                'total' => $profiles->total(),
            ]
        ]);
    }

    public function store(UserProfileRequest $request): RedirectResponse
    {
        $profile = $this->userProfileService->create($request->validated());

        return redirect()
            ->route('personnel-management.personnels.index')
            ->with('success', 'Personnel created successfully.');
    }

    public function show(UserProfile $userProfile): Response
    {
        return Inertia::render('personnel-management/personnels/show', [
            'personnel' => $userProfile->load('user')
        ]);
    }

    public function update(UserProfileRequest $request, UserProfile $userProfile): RedirectResponse
    {
        $this->userProfileService->update($userProfile, $request->validated());

        return redirect()
            ->route('personnel-management.personnels.index')
            ->with('success', 'Personnel updated successfully.');
    }

    public function destroy(UserProfile $userProfile): RedirectResponse
    {
        $this->userProfileService->delete($userProfile);

        return redirect()
            ->route('personnel-management.personnels.index')
            ->with('success', 'Personnel deleted successfully.');
    }
} 