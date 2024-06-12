<?php

namespace App\Http\Controllers;

use App\Http\Requests\ProfileUpdateRequest;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Support\Facades\Validator;
use App\Models\User;

class ProfileController extends Controller
{
    /**
     * Display the user's profile form.
     */

     public function store(Request $request, $id)
    {

        // dd($request->all());

        $validation = [
            'nama' => 'required|string|max:255',
            'tanggal_lahir' => 'required|date',
            'no_telepon' => 'required|string|max:15',
            'jenis_kelamin' => 'required|max:20',
            'foto' => 'nullable|image|max:2048',
        ];

        $validated = Validator::make($request->data, $validation);
        
        
        
        $data = [
            'nama' => $request->data['nama'],
            'tanggal_lahir' => $request->data['tanggal_lahir'],
            'no_telepon' => $request->data['no_telepon'],
            'jenis_kelamin' => $request->data['jenis_kelamin'],
        ];

        // dd($user);

        if ($request->hasFile('foto')) {
            $path = $request->file('foto')->store('images/foto_profil', 'public');
            $data['foto'] = $path;
        }

        User::where('id', $id)->update($data);

        return redirect()->route('user.home')->with('message', 'Profile updated successfully.');
    }

    public function edit(Request $request): Response
    {
        return Inertia::render('Profile/Edit', [
            'mustVerifyEmail' => $request->user() instanceof MustVerifyEmail,
            'status' => session('status'),
        ]);
    }

    /**
     * Update the user's profile information.
     */
    public function update(ProfileUpdateRequest $request): RedirectResponse
    {
        $request->user()->fill($request->validated());

        if ($request->user()->isDirty('email')) {
            $request->user()->email_verified_at = null;
        }

        $request->user()->save();

        return Redirect::route('profile.edit');
    }

    /**
     * Delete the user's account.
     */
    public function destroy(Request $request): RedirectResponse
    {
        $request->validate([
            'password' => ['required', 'current_password'],
        ]);

        $user = $request->user();

        Auth::logout();

        $user->delete();

        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return Redirect::to('/');
    }
}
