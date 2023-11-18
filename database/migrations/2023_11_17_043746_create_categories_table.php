<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('categories', function (Blueprint $table) {
            $table->id();
            $table->String("name");
            $table->String("slug")->nullable();
            $table->enum("child_type",['category', 'item']);
            $table->integer("level")->default(1);
            $table->unsignedBigInteger("menu_id");
            $table->foreign('menu_id')->references('id')->on('menus')->onDelete("cascade");
            $table->unsignedBigInteger("parent_id")->nullable();
            $table->foreign('parent_id')->references('id')->on('categories')->onDelete("cascade");
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('categories');
    }
};
