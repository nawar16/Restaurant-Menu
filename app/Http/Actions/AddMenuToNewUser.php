<?php


namespace App\Http\Actions;


use App\Models\Menu;
use App\Models\User;

class AddMenuToNewUser
{
    public function execute(User $user){
        Menu::create([
            'name' => $user->name.' Menu',
            'user_id'=>$user->id
        ]);
    }

}
