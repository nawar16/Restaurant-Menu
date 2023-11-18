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
        return $this->discountable ?
         $this->discountable->value : $this->category->discount;
    }
    public function getDiscountPriceAttribute()
    {
        return number_format(($this->discount/100) * $this->price, 2, '.', '');
    
        //TODO: if acumulative discount with menu and parent categories
        /**
         * 
         * $discount = 1.0;
         * $discount = (1 - $this->menu->discount/100) * $discount;
         * foreach ($this->getCategoriesAttribute() as $category){
         *    $discount = (1 - $category->discount/100) * $discount;
         * }
         * $discount = (1 - $this->discount/100) * $discount;
         * return number_format(($discount) * $this->price, 2, '.', '');
         * 
         */

    }
}
