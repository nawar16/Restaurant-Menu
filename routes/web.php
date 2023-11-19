<?php

use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "web" middleware group. Make something great!
|
*/
Route::get('/', function () {
    return Inertia::render('Dashboard');
});
Route::get('/category', function () {
    return Inertia::render('Category');
});
Route::get('/item', function () {
    return Inertia::render('Item');
});
Route::get('/login', function () {
    return Inertia::render('Login');
});
Route::get('/register', function () {
    return Inertia::render('Register');
});

// Route::get('{any}', function () {
//     return view('welcome');
// })->where('any', '.*');

Auth::routes();
