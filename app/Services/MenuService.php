<?php

namespace App\Services;
use App\Models\Menu;

class MenuService 
{
  private $menu;

  public function __construct(Menu $menu) {
    $this->menu = $menu;
  }

  public function findAll() {
    return $this->menu->get();
  }

  public function findWithoutFail($id, $columns = ['*']){
      try {
          return $this->menu->find($id, $columns);
      } catch (\Exception $e) {
          return;
      }
  }

  public function create($data) {
    $menu = $this->menu->create($data);
    return $menu;
  }

  public function update($data, int $id) {
    $menu = $this->menu->find($id);
    $menu->fill($data)->save();
    return $this->menu->where('id', $id)->first();
  }

  public function delete(int $id) {
    $menu = $this->menu->find($id);
    if(!$menu) return false; 
    $menu->delete();
    return true;
  }
  
}