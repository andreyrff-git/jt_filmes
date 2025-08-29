<?php

namespace App\Http\Controllers\V1;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreFilmeRequest;
use App\Http\Requests\UpdateFilmeRequest;
use App\Models\Filme;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;

class FilmeController extends Controller
{
 public function index(): JsonResponse
    {
        $filmes = Filme::paginate(10); 
        return response()->json($filmes);
    }

    /**Armazena um novo filme.*/
    public function store(StoreFilmeRequest $request): JsonResponse
    {
        $filme = Filme::create($request->validated());

        return response()->json($filme, 201);
    }

    /**Exibe um filme específico*/
    public function show(Filme $filme): JsonResponse
    {
        return response()->json($filme);
    }

    /**Atualiza um filme específico.*/
    public function update(UpdateFilmeRequest $request, Filme $filme): JsonResponse
    {
        $filme->update($request->validated());

        return response()->json($filme);
    }

    /**Remove um filme específico.*/
    public function destroy(Filme $filme): JsonResponse
    {
        $filme->delete();

        return response()->json(null, 204); // 204 No Content
    }
}