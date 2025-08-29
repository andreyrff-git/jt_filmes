<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
	public function run()
	{
		// Cria 2 usuários falsos usando a factory
		\App\Models\User::factory(2)->create();
	}
}
