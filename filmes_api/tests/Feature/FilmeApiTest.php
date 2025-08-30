<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;
use App\Models\Filme;
use App\Models\User;

class FilmeApiTest extends TestCase
{
    // 🔥 1. Usa o banco de dados em memória e roda as migrations
    use RefreshDatabase; 

    // Teste para o endpoint de listagem de filmes (GET /filmes)
    public function test_pode_listar_filmes()
    {
        // 2. PREPARAÇÃO (Arrange)
        // Cria um usuário para autenticação
        $user = User::factory()->create();
        // Cria 3 filmes falsos no banco de dados de teste
        Filme::factory(3)->create();

        // 3. AÇÃO (Act)
        // Faz uma requisição GET para a API se passando por esse usuário
        $response = $this->actingAs($user, 'api')->getJson('/api/v1/filmes');

        // 4. VERIFICAÇÃO (Assert)
        $response->assertStatus(200); // Verifica se o status é 200 OK
        $response->assertJsonCount(3, 'data'); // Verifica se retornou 3 filmes na chave 'data'
    }

    // Teste para o endpoint de criação de filme (POST /filmes)
    public function test_pode_criar_um_filme()
    {
        // PREPARAÇÃO
        $user = User::factory()->create();
        $filmeData = [
            'titulo' => 'Um Filme de Teste',
            'ano_lancamento' => 2023,
            'genero' => 'Ação',
            'sinopse' => 'Uma sinopse de teste.',
            'url_poster' => 'https://exemplo.com/poster.jpg'
        ];

        // AÇÃO
        $response = $this->actingAs($user, 'api')->postJson('/api/v1/filmes', $filmeData);

        // VERIFICAÇÃO
        $response->assertStatus(201); // Verifica se o status é 201 Created
        $response->assertJsonFragment(['titulo' => 'Um Filme de Teste']); // Verifica se o filme criado foi retornado
        $this->assertDatabaseHas('filmes', ['titulo' => 'Um Filme de Teste']); // Verifica se o filme existe no banco
    }
    
    // Teste de validação (ex: criar filme sem título)
    public function test_nao_pode_criar_um_filme_sem_titulo()
    {
        $user = User::factory()->create();
        $filmeData = ['ano_lancamento' => 2023]; // Dados inválidos

        $response = $this->actingAs($user, 'api')->postJson('/api/v1/filmes', $filmeData);

        $response->assertStatus(422); // Verifica se o status é 422 Unprocessable Entity
        $response->assertJsonValidationErrors('titulo'); // Verifica se o erro de validação foi para o campo 'titulo'
    }
}