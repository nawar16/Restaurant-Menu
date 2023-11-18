<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Http\Requests\CreateCategoryRequest;
use App\Http\Requests\UpdateCategoryRequest;
use App\Http\Resources\CategoryResource;
use App\Services\CategoryService;

class CategoryController extends Controller
{
    /**
     * @var \App\Services\CategoryService
     */
    private CategoryService $categoryService;

    public function __construct(CategoryService $categoryService)
    {
        $this->categoryService = $categoryService;
    }

    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $categorys = $this->categoryService->findAll();

        return CategoryResource::collection($categorys);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(CreateCategoryRequest $request) : CategoryResource
    {
        $validated = $request->validated();

        $category = $this->categoryService->create($validated);

        return (new CategoryResource($category));
    }

        
    /**
     * Display the specified resource.
     */
    public function show(string $slug) 
    {

        $category = $this->categoryService->findWithoutFail($slug);

        if(!$category) return response()->error(404, __(':resource_not_found', ['resource' => 'Category']));

        return (new CategoryResource($category));
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateCategoryRequest $request, $id) : CategoryResource
    {
        $validated = $request->validated();

        $category = $this->categoryService->update($validated, $id);

        return (new CategoryResource($category));
    }


    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $deleted = $this->categoryService->delete($id);

        if($deleted) return response()->success(200, __(':resource_deleted_successfully', ['resource' => 'Category']));

        return response()->error(404, __(':resource_not_found', ['resource' => 'Category']));
    }

}
