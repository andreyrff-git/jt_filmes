<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateFilmeRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true; // Alterar para false se houver regra de autorização
    }

    public function rules(): array
    {
        return [
            'titulo' => 'sometimes|required|string|max:100',
            'ano_lancamento' => 'sometimes|required|after:1894-12-31',
            'genero' => 'sometimes|required|string|max:100',
            'sinopse' => 'sometimes|required|string|max:500',
            'url_poster' => 'sometimes|required|url',
        ];
    }
}