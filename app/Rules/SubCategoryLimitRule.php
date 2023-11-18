<?php

namespace App\Rules;

use App\Models\Category;
use Illuminate\Contracts\Validation\Rule;

class SubCategoryLimitRule implements Rule
{
    private $parameters;
    public function __construct($parameters)
    {
        $this->parameters = $parameters;
    }
    public function passes($attribute, $value)
    {
        $limitExceeded = Category::find($this->parameters[0])?->level >= 4;
        return !$limitExceeded;
    }
    public function message()
    {
        return __('Can\'t add more sub categories for this category');
    }
}
