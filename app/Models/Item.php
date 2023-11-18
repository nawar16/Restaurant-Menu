<?php

namespace App\Models;
 
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Item extends Model
{
    use HasFactory;

    protected $fillable=["name","slug","category_id","price","menu_id"];

    protected $appends = ['discount_price', 'discount'];

    protected $hidden = ['category'];

    public function category()
    {
        return $this->belongsTo(Category::class,'category_id');
    }

    public function menu()
    {
        return $this->belongsTo(Menu::class);
    }

    public function getCategoriesAttribute()
    {
        $categories = collect([]);

        $category = $this->category;

        while(!is_null($category)) {
            $categories->push($category);
            $category = $category->parent;
        }

        return $categories;
    }
    public function discountable()
    {
        return $this->morphOne(Discount::class, 'discountable');
    }
    public function getDiscountAttribute()
    {
  
        return 0;
    }
    public function getDiscountPriceAttribute()
    {
  
        return 0;
    }
}
