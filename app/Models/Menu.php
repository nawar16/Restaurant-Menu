<?php

namespace App\Models;
 

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Menu extends Model
{
    use HasFactory;

    protected $fillable=["name","user_id"];

    protected $appends = ['prices', 'discount'];

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
    public function getPricesAttribute()
    {
        $data["discountPrice"] = 0;
        $data["originalPrice"] = 0;
        foreach($this->items as $item){
            $data["discountPrice"] += $item->discount_price;
            $data["originalPrice"] += $item->price;
        }
        $data['totalPrice'] = $data["originalPrice"] - $data["discountPrice"];
        return $data;
    }
    public function discountable()
    {
        return $this->morphOne(Discount::class, 'discountable');
    }
    public function getDiscountAttribute()
    {
        return $this->discountable?->value;
    }
}
