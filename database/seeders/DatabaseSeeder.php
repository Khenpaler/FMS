<?php

namespace Database\Seeders;

use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // First seed the roles
        $this->call([
            RoleSeeder::class,
        ]);

        // Then create users with role_id
        User::factory()->create([
            'name' => 'Test User',
            'email' => 'test@example.com',
            'role_id' => 1, // This will assign the 'operation_manager' role
        ]);

        // Uncomment if you want to create more users
        // User::factory(10)->create([
        //     'role_id' => 1, // or use a random role_id between 1-4
        // ]);
    }
}
