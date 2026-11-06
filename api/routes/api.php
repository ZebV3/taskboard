<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\BoardController;
use App\Http\Controllers\BoardListController;
use App\Http\Controllers\CardController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);

Route::middleware('auth:sanctum')->group(function () {
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::get('/user', fn(Request $r) => $r->user());
    Route::apiResource('boards', BoardController::class);
    Route::apiResource('boards.lists', BoardListController::class)->shallow()->only(['store', 'update', 'destroy']);
    Route::apiResource('lists.cards', CardController::class)->shallow()->only(['store', 'update', 'destroy']);
});