<?php

namespace App\Models;
 

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Menu extends Model
{
    use HasFactory;

    protected $fillable=["name","user_id","discount"];

    protected $appends = ['prices'];

    /**
     * Get the user that owns the menu.
     */
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function items()
    {
        return $this->hasMany(Item::class);
    }

   

}
