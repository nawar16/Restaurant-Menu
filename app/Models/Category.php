<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
 
class Category extends Model
{
    use HasFactory;
    protected $fillable=["name","slug","parent_id","menu_id","level","child_type"];
    protected $appends = ['discount'];
    /**
     * Get the comments for the blog post.
     */
    public function subCategories()
    {
        return $this->hasMany(Category::class,'parent_id', 'id')->with('subCategories')->with('items');
    }

    public function items()
    {
        return $this->hasMany(Item::class,'category_id', 'id');
    }

    public function parent()
    {
        return $this->belongsTo(Category::class,'parent_id');
    }

    public function menu()
    {
        return $this->belongsTo(Menu::class,'menu_id');
    }

    public function getParentsAttribute()
    {
        $parents = collect([]);

        $parent = $this->parent;

        while(!is_null($parent)) {
            $parents->push($parent);
            $parent = $parent->parent;
        }

        return $parents;
    }
    public function discountable()
    {
        return $this->morphOne(Discount::class, 'discountable');
    }
    public function getDiscountAttribute()
    {
        if($this->discountable) return $this->discountable->value;
        foreach ($this->getParentsAttribute() as $category){
            if($category->discount){
                return $category->discount;
            }
        }
        return $this->menu->discount ?? 0;
    }
}
