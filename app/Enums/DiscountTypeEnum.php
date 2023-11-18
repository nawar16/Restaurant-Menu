<?php
  
namespace App\Enums;
 
enum DiscountTypeEnum:string {
    case item = 'item';
    case category = 'category';
    case menu = 'menu';

    public static function getType(string $type){
        return constant("self::$type");
    }
}