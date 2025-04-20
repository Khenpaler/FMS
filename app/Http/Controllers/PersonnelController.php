<?php

namespace App\Http\Controllers;

use App\Http\Requests\PersonnelRequest;
use App\Models\Personnel;
use App\Services\PersonnelService;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class PersonnelController extends Controller
{
    public function __construct(
        private readonly PersonnelService $personnelService
    ) {}

    public function index(Request $request): Response
    {
        $personnel = $this->personnelService->getPaginatedPersonnel(
            type: $request->get('type', 'drivers'),
            search: $request->get('search'),
            onlyActive: $request->boolean('only_active', true),
            perPage: $request->integer('per_page', 10)
        );

        return Inertia::render('personnels/index', [
            'personnel' => $personnel->items(),
            'type' => $request->get('type', 'drivers'),
            'search' => $request->get('search'),
            'filters' => [
                'search' => $request->get('search'),
                'type' => $request->get('type', 'drivers'),
                'only_active' => $request->boolean('only_active', true),
            ],
            'pagination' => [
                'current_page' => $personnel->currentPage(),
                'last_page' => $personnel->lastPage(),
                'per_page' => $personnel->perPage(),
                'total' => $personnel->total(),
            ],
        ]);
    }

    public function create(): Response
    {
        return Inertia::render('personnels/create');
    }

    public function store(PersonnelRequest $request)
    {
        $personnel = $this->personnelService->create($request->validated());
        
        return redirect()
            ->route('personnel.index', ['type' => $personnel->type])
            ->with('success', 'Personnel created successfully.');
    }

    public function show(Personnel $personnel): Response
    {
        return Inertia::render('personnels/show', [
            'personnel' => $personnel
        ]);
    }

    public function edit(Personnel $personnel): Response
    {
        return Inertia::render('personnels/edit', [
            'personnel' => $personnel
        ]);
    }

    public function update(PersonnelRequest $request, Personnel $personnel)
    {
        $this->personnelService->update($personnel, $request->validated());
        
        return redirect()
            ->route('personnel.index', ['type' => $personnel->type])
            ->with('success', 'Personnel updated successfully.');
    }

    public function destroy(Personnel $personnel)
    {
        $this->personnelService->delete($personnel);
        
        return redirect()
            ->route('personnel.index', ['type' => $personnel->type])
            ->with('success', 'Personnel deleted successfully.');
    }

    public function restore(Personnel $personnel)
    {
        $this->personnelService->restore($personnel);
        
        return redirect()
            ->route('personnel.index', ['type' => $personnel->type])
            ->with('success', 'Personnel restored successfully.');
    }

    public function toggleActive(Personnel $personnel)
    {
        $this->personnelService->toggleActive($personnel);
        
        return redirect()
            ->route('personnel.index', ['type' => $personnel->type])
            ->with('success', 'Personnel status updated successfully.');
    }
} 