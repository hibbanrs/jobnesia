<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        Schema::create('job_applications', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('user_id'); // pencari kerja
            $table->unsignedBigInteger('job_id');
            $table->string('first_name');
            $table->string('last_name');
            $table->string('email');
            $table->string('phone');
            $table->string('address');
            $table->string('education');
            $table->string('major');
            $table->string('graduation_year');
            $table->string('company')->nullable();
            $table->string('position')->nullable();
            $table->string('work_year')->nullable();
            $table->string('cv_path'); // path file PDF
            $table->timestamps();

            $table->foreign('user_id')->references('id')->on('users')->onDelete('cascade');
            $table->foreign('job_id')->references('id')->on('jobs')->onDelete('cascade');
        });
    }

    public function down()
    {
        Schema::dropIfExists('job_applications');
    }
};
