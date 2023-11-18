<?php

namespace App\Services;
use App\Models\Category;

class CategoryService 
{
  private $category;

  public function __construct(Category $category) {
    $this->category = $category;
  }

  public function findAll() {
    return $this->category->get();
  }

  public function findWithoutFail($id, $columns = ['*']){
      try {
          return $this->category->find($id, $columns);
      } catch (\Exception $e) {
          return;
      }
  }

  public function create($data) {
    $category = $this->category->create($data);
    return $category;
  }

  public function update($data, int $id) {
    $category = $this->category->find($id);
    $category->fill($data)->save();
    return $this->category->where('id', $id)->first();
  }

  public function delete(int $id) {
    $category = $this->category->find($id);
    if(!$category) return false; 
    $category->delete();
    return true;
  }
  
}