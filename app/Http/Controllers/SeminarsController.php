<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreSeminarsRequest;
use App\Http\Requests\UpdateSeminarsRequest;
use App\Models\Seminars;
use Illuminate\Http\RedirectResponse;
use Inertia\Inertia;
use Inertia\Response;

class SeminarsController extends Controller
{
    /**
     * @return array<int, array<string, mixed>>
     */
    private function seminarPayload(): array
    {
        return Seminars::query()
            ->orderBy('date')
            ->orderBy('time')
            ->get()
            ->map(fn (Seminars $seminar): array => [
                'id' => $seminar->id,
                'title' => $seminar->title,
                'description' => $seminar->description,
                'location' => $seminar->location,
                'time' => $seminar->time,
                'speaker' => $seminar->speaker,
                'target_performance_area' => $seminar->target_performance_area,
                'date' => $seminar->date?->format('Y-m-d'),
            ])
            ->all();
    }

    public function performanceDashboard(): Response
    {
        return Inertia::render('performanceDashboard', [
            'seminars' => $this->seminarPayload(),
        ]);
    }

    public function adminPerformanceDashboard(): Response
    {
        return Inertia::render('admin/performance-dashboard', [
            'seminars' => $this->seminarPayload(),
        ]);
    }

    /**
     * Display a listing of the resource.
     */
    public function index(): Response
    {
        return Inertia::render('admin/training-scheduling', [
            'seminars' => $this->seminarPayload(),
        ]);
    }

    public function adminTrainingScheduling(): Response
    {
        return Inertia::render('admin/training-scheduling', [
            'seminars' => $this->seminarPayload(),
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreSeminarsRequest $request): RedirectResponse
    {
        Seminars::query()->create($request->validated());

        return to_route('admin.training-scheduling');
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateSeminarsRequest $request, Seminars $seminar): RedirectResponse
    {
        $seminar->update($request->validated());

        return to_route('admin.training-scheduling');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Seminars $seminar): RedirectResponse
    {
        $seminar->delete();

        return to_route('admin.training-scheduling');
    }
}
