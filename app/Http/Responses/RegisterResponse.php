<?php

namespace App\Http\Responses;

use App\Models\User;
use Illuminate\Http\Request;
use Laravel\Fortify\Contracts\RegisterResponse as RegisterResponseContract;
use Symfony\Component\HttpFoundation\Response;

class RegisterResponse implements RegisterResponseContract
{
    /**
     * Create an HTTP response that represents the object.
     */
    public function toResponse($request): Response
    {
        $user = $request instanceof Request ? $request->user() : null;

        if (! $user instanceof User) {
            return redirect()->intended(config('fortify.home'));
        }

        return redirect()->intended(route($user->homeRouteName(), absolute: false));
    }
}
