<?php

namespace App\Services;

use App\Enums\DiscountTypeEnum;
use App\Models\Item;

class ItemService 
{
  private $item;

  public function __construct(Item $item) {
    $this->item = $item;
  }

  public function findAll() {
    return $this->item->get();
  }

  public function findWithoutFail($id, $columns = ['*']){
      try {
          return $this->item->find($id, $columns);
      } catch (\Exception $e) {
          return;
      }
  }

  public function create($data) {
    $data['menu_id'] = auth()->user()->menu->id;
    $item = $this->item->create($data);
    if(isset($data['discount']) && $data['discount'] > 0 )
    {
      $item->discountable()->make([
        'value' => $data['discount'],
        'type' => DiscountTypeEnum::item
        ])->save();
    }
    return $item;
  }

  public function update($data, int $id) {
    $data['menu_id'] = auth()->user()->menu->id;
    $item = $this->item->find($id);
    $item->fill($data)->save();
    if(isset($data['discount']) && $data['discount'] > 0 )
    {
      $item->discountable()->delete();
      $item->discountable()->make([
        'value' => $data['discount'],
        'type' => DiscountTypeEnum::item
        ])->save();
    }
    return $this->item->where('id', $id)->first();
  }

  public function delete($id) {
    $item = $this->item->find($id);
    if(!$item) return false; 
    $item->discountable()->delete();
    $item->delete();
    return true;
  }
  
}