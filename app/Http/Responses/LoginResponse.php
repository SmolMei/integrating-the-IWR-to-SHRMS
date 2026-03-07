<?php

namespace App\Http\Responses;

use App\Models\User;
use Illuminate\Http\Request;
use Laravel\Fortify\Contracts\LoginResponse as LoginResponseContract;
use Symfony\Component\HttpFoundation\Response;

class LoginResponse implements LoginResponseContract
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
