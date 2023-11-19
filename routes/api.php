<?php

use App\Http\Controllers\API\CategoryController;
use App\Http\Controllers\API\ItemController;
use App\Http\Controllers\API\MenuController;
use App\Http\Controllers\HomeController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/


Route::middleware(['auth:sanctum', 'CustomApiResponse'])->group(function () {
    Route::get('/user', [HomeController::class,"user"]);
    Route::get('/menu', [MenuController::class,"user_menu"]);
    Route::resource('/menu', MenuController::class);
    Route::resource('categories', CategoryController::class);
    Route::get('/availableParentCategories', [CategoryController::class,"availableParentCategories"]);
    Route::get('/availableItemCategories', [CategoryController::class,"availableItemCategories"]);
    Route::resource('items', ItemController::class);
});