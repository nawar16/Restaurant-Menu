<?php

namespace App\Services;
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
    $item = $this->item->create($data);
        if(isset($data['discount']))
    {
      $item->discountable()->make([
        'value' => $data['discount'],
        'type' => 'item'
      ]);
    }
    return $item;
  }

  public function update($data, int $id) {
    $item = $this->item->find($id);
    $item->fill($data)->save();
        if(isset($data['discount']))
    {
      $item->discountable()->delete();
      $item->discountable()->make([
        'value' => $data['discount'],
        'type' => 'item'
      ]);
    }
    return $this->item->where('id', $id)->first();
  }

  public function delete(int $id) {
    $item = $this->item->find($id);
    if(!$item) return false; 
    $item->delete();
    return true;
  }
  
}