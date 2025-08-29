<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreFilmeRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true; // Alterar para false se houver regra de autorização
    }

    public function rules(): array
    {
        return [
            'titulo' => 'required|string|max:100',
            'ano_lancamento' => 'required|after:1894-12-31',
            'genero' => 'required|string|max:100',
            'sinopse' => 'required|string|max:500',
            'url_poster' => 'required|url',
        ];
    }
}