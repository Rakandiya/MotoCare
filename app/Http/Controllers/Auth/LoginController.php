<?php
namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Hash;
use App\Models\User;
use Inertia\Inertia;

class LoginController extends Controller
{
    public function login(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'email' => 'required|email',
            'password' => 'required|string|min:8',
        ]);

        if ($validator->fails()) {
            return redirect()->back()->withErrors($validator->messages())->withInput();
        }

        $credentials = $request->only('email', 'password');

        if (Auth::attempt($credentials)) {
            $request->session()->regenerate();
            $user = Auth::user();

            if($user->role == 'admin') {
                return redirect(route('admin.dashboard'));
            }else{
                return redirect(route('user.home'));
            }
        }else{
            return redirect()->back()->withErrors(['error' => 'Invalid credentials'])->withInput();
        }


        return response()->json(['message' => 'Invalid credentials'], 401);
    }

    public function logout(Request $request) {
        Auth::logout();
        return redirect('/');
    }

    public function forgot(Request $request) {
        $validator = Validator::make($request->all(), [
            'username' => 'required|string',
            'email' => 'required|email',
        ]);

        if ($validator->fails()) {
            return redirect()->back()->withErrors($validator->messages())->withInput();
        }

        $user = User::where('username', $request->username)->where('email', $request->email)->first();

        if(!$user) {
            return redirect()->back()->withErrors(['user'=>'User not found'])->withInput();
        }

        return redirect()->route('changePasswordPage')->with('user', $user);

        // return Inertia::render('ChangePassword', ['user' => $user]);
    }

    public function changePasswordPage(Request $request) {
        $user = session('user');

    if (!$user) {
        return redirect('/')->withErrors(['error' => 'User data not found']);
    }


    return Inertia::render('ChangePassword', ['user' => $user]);
    }

    public function changePassword(Request $request) {

        // dd($request->all());
        $validator = Validator::make($request->all(), [
            'password' => 'required|string|min:8',
            'konfirmasi_password' => 'required|string|min:8|same:password',
        ]);

        if ($validator->fails()) {
            return redirect()->back()->withErrors($validator->messages())->withInput();
        }

        User::find($request->user_id)->update([
            'password' => Hash::make($request->password),
        ]);

        return redirect()->route('auth')->with('success', 'Password changed successfully');
    }
}
