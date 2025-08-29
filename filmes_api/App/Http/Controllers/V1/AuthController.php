<?php
namespace App\Http\Controllers\V1;

use App\Http\Controllers\Controller;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Tymon\JWTAuth\Facades\JWTAuth;
use Illuminate\Support\Facades\Log;

class AuthController extends Controller
{
    /** Aplica o middleware de autenticação da API a todos os métodos, exceto 'login'.*/
    public function __construct()
    {
        $this->middleware('auth:api', ['except' => ['login']]);
    }

    /**Tenta autenticar um usuário e retorna um token JWT se for bem-sucedido.*/
    public function login(Request $request): JsonResponse
    {
        // 1. Valida as credenciais recebidas
        $credentials = $request->validate([
            'email' => 'required|email',
            'password' => 'required|string',
        ]);

        if (! $token = Auth::guard('api')->attempt($credentials)) {
            return response()->json(['error' => 'Unauthorized'], 401);
        }

        // 3. Se a autenticação for bem-sucedida, chama o método helper para formatar a resposta
        return $this->respondWithToken($token);
    }

    /** Retorna os dados do usuário autenticado.*/
    public function me(): JsonResponse
    {
        return response()->json(Auth::guard('api')->user());
    }

    /**Invalida o token do usuário autenticado (logout).*/
    public function logout(): JsonResponse
    {
        Auth::guard('api')->logout();
        return response()->json(['message' => 'Successfully logged out']);
    }

    /**Atualiza token expirado.*/
    public function refresh(): JsonResponse
    {
        return $this->respondWithToken(Auth::guard('api')->refresh());
    }

    /** Formata a resposta JSON com o token e os dados do usuário. */
    protected function respondWithToken(string $token): JsonResponse
    {
        return response()->json([
            'access_token' => $token,
            'token_type'   => 'bearer',
            'expires_in'   => Auth::guard('api')->factory()->getTTL() * 60,
            'user'         => Auth::guard('api')->user() 
        ]);
    }
}