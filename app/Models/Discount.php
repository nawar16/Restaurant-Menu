<?php

namespace App\Models;

use App\Enums\DiscountTypeEnum;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Discount extends Model
{
    use HasFactory;

    protected $fillable = [
        'value', 
        'type'
    ];

    protected $casts = [
        'type' => DiscountTypeEnum::class,
    ];

    public function discountable()
    {
      return $this->morphTo(); 
    }
}
