<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        Schema::create('jobs', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('user_id');
            $table->string('title');
            $table->string('company');
            $table->string('location');
            $table->string('jobType');
            $table->string('category');
            $table->string('experience');
            $table->integer('salaryMin')->nullable();
            $table->integer('salaryMax')->nullable();
            $table->text('description');
            $table->text('requirements');
            $table->json('skills')->nullable();
            $table->date('deadline')->nullable();
            $table->string('contact');
            $table->string('profile_picture')->nullable(); // Tambahkan ini sebelum $table->timestamps()
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('jobs');
    }
};
