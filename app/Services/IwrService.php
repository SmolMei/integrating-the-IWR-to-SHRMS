<?php

namespace App\Services;

use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;

class IwrService
{
    private string $baseUrl;

    public function __construct()
    {
        $this->baseUrl = config('services.iwr.url', 'http://localhost:3000');
    }

    public function routeIpcr(array $payload): array
    {
        return $this->post('/api/iwr/ipcr', $payload);
    }

    public function routeLeave(array $payload): array
    {
        return $this->post('/api/iwr/leave', $payload);
    }

    public function health(): array
    {
        try {
            $response = Http::timeout(5)->get($this->baseUrl.'/api/iwr/health');

            return $response->json();
        } catch (\Exception $e) {
            Log::error('IWR health check failed: '.$e->getMessage());

            return ['status' => 'error', 'message' => $e->getMessage()];
        }
    }

    private function post(string $path, array $payload): array
    {
        try {
            Log::info('IWR request', ['path' => $path, 'payload' => $payload]);

            $response = Http::timeout(30)
                ->post($this->baseUrl.$path, $payload);

            if (! $response->successful()) {
                Log::error('IWR request failed', [
                    'path' => $path,
                    'status' => $response->status(),
                    'body' => $response->body(),
                ]);

                return [
                    'status' => 'error',
                    'notification' => 'IWR service returned an error.',
                ];
            }

            return $response->json();
        } catch (\Exception $e) {
            Log::error('IWR service unavailable: '.$e->getMessage());

            return [
                'status' => 'error',
                'notification' => 'IWR service is unavailable. Please try again later.',
            ];
        }
    }
}
