<?php

use Illuminate\Database\Seeder;

class TodolistsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('todo_lists')->truncate();

        $todoLists = [];
        for ($i = 0; $i < 10; $i++)
        {
        	$todoLists[] = [
        		'title' => "Todo list {$i}",
        		'description' => 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dignissimos animi numquam voluptatum repudiandae magni quae ipsam debitis! Temporibus excepturi, deserunt quam est animi modi, quaerat aliquid magnam reiciendis, nesciunt officiis.',
        		'user_id' => rand(1,2)
        	];
        }

        DB::table('todo_lists')->insert($todoLists);
    }

}
