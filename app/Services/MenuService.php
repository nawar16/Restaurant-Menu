<?php

namespace App\Services;

use App\Enums\DiscountTypeEnum;
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
          return $this->menu->where('user_id', $id, $columns);
      } catch (\Exception $e) {
          return;
      }
  }

  public function user_menu($user_id){
    try {
      return auth()->user()->menu;
    } catch (\Exception $e) {
        return;
    }
  }
  public function create($data) {
    $menu = $this->menu->create($data);
    if(isset($data['discount']) && $data['discount'] > 0 )
    {
      $menu->discountable()->make([
        'value' => $data['discount'],
        'type' => DiscountTypeEnum::menu
        ])->save();
    }
    return $menu;
  }

  public function update($data, int $id) {
    $menu = $this->menu->find($id);
    $menu->fill($data)->save();
    if(isset($data['discount']) && $data['discount'] > 0 )
    {
      $menu->discountable()->delete();
      $menu->discountable()->make([
        'value' => $data['discount'],
        'type' => DiscountTypeEnum::menu
      ])->save();
    }
    return $this->menu->where('id', $id)->first();
  }

  public function delete($id) {
    $menu = $this->menu->find($id);
    if(!$menu) return false; 
    $menu->discountable()->delete();
    $menu->delete();
    return true;
  }
  
}