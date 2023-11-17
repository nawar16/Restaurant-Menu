<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
 
class Category extends Model
{
    use HasFactory;
    protected $fillable=["name","slug","discount","parent_id","menu_id","level","child_type"];

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

}
