<?php

namespace App\Services;

use App\Enums\DiscountTypeEnum;
use App\Models\Category;

class CategoryService 
{
  private $category;

  public function __construct(Category $category) {
    $this->category = $category;
  }

  public function findAll() {
    return $this->category->where("menu_id",auth()->user()->menu->id)
    ->where("parent_id",null)->with("subCategories","items")->get();
  }

  public function findWithoutFail($id, $columns = ['*']){
      try {
          return $this->category->find($id, $columns);
      } catch (\Exception $e) {
          return;
      }
  }

  public function create($data) {
    $data['menu_id'] = auth()->user()->menu->id;
    $category = $this->category->create($data);
    if(isset($data['discount']) && $data['discount'] > 0 )
    {
      $category->discountable()->make([
        'value' => $data['discount'],
        'type' => DiscountTypeEnum::category
      ])->save();
    }
    return $category;
  }

  public function update($data, int $id) {
    $category = $this->category->find($id);
    $data['menu_id'] = auth()->user()->menu->id;
    $category->fill($data)->save();
    if(isset($data['discount']) && $data['discount'] > 0 )
    {
      $category->discountable()->delete();
      $category->discountable()->make([
        'value' => $data['discount'],
        'type' => DiscountTypeEnum::category
        ])->save();
    }
    return $this->category->where('id', $id)->first();
  }

  public function availableParentCategories()
  {
    $categories = Category::where("menu_id",auth()->user()->menu->id)
    ->whereNot("level",4)->whereNot("child_type","item")->get();
    return $categories;
  }

  public function availableItemCategories()
  {
    $categories = Category::where("menu_id",auth()->user()->menu->id)
    ->where("child_type","item")->get();
    return $categories;
  }

  public function delete($id) {
    $category = $this->category->find($id);
    if(!$category) return false;
    $category->discountable()->delete(); 
    $category->delete();
    return true;
  }
  
}