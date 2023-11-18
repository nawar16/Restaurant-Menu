<?php

namespace App\Http\Controllers;
 
use App\Models\Menu;
use App\Models\User;
use Illuminate\Http\Request;

class HomeController extends Controller
{
    public function user(Request $request)
    {
        return User::find($request->user()->id);
    }
}
