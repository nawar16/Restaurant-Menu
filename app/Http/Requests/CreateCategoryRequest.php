<?php

namespace App\Http\Requests;

use App\Rules\SubCategoryLimitRule;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\Rule;
 
class CreateCategoryRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, mixed>
     */
    public function rules()
    {
        return [
            'name' => ['required'],
            //Rule::unique('categories','name')->where(fn ($query) => $query->where('menu_id', Auth::user()->menu->id))],
            'parent_id' => [
                'nullable',
                Rule::exists('categories', 'id')
                    ->where('child_type', "category")->whereNot("depth",4),
                new SubCategoryLimitRule([$this->parent_id])
            ],
            'discount'=>'nullable|between:0,100',
            'child_type'=>'required|in:item,category'
        ];
    }
}
