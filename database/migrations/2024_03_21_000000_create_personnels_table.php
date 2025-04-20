<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('personnels', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->date('birthday');
            $table->integer('age');
            $table->string('license_number')->unique()->nullable();
            $table->text('address');
            $table->string('phone_number');
            $table->string('contact_person');
            $table->enum('type', ['drivers', 'pao', 'dispatchers']);
            $table->boolean('is_active')->default(true);
            $table->timestamps();
            $table->softDeletes();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('personnels');
    }
}; 