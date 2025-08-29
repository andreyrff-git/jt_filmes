<?php

use Illuminate\Support\Facades\Route;
use Illuminate\Http\Request;
use App\Http\Controllers\V1\AuthController;
use App\Http\Controllers\V1\FilmeController;

// Agrupa as rotas sob o prefixo 'v1' e o namespace correto
Route::prefix('v1')->group(function () {

    // Rota  Pública
    Route::post('/login', [AuthController::class, 'login']);

    // Rotas por JWT
    Route::middleware('auth:api')->group(function () {
        Route::post('/logout', [AuthController::class, 'logout']);
        Route::post('/refresh', [AuthController::class, 'refresh']);
        Route::get('/me', [AuthController::class, 'me']);

        // Rotas de Filmes
        Route::apiResource('filmes', FilmeController::class);
    });
});

Route::get('/teste', function () {
    return response()->json([
        'message' => 'API do Laravel está funcionando!',
        'status' => 'sucesso'
    ]);
});
