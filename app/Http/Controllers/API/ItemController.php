<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Http\Requests\CreateItemRequest;
use App\Http\Requests\UpdateItemRequest;
use App\Http\Resources\ItemResource;
use App\Services\ItemService;

class ItemController extends Controller
{
    /**
     * @var \App\Services\ItemService
     */
    private ItemService $itemService;

    public function __construct(ItemService $itemService)
    {
        $this->itemService = $itemService;
    }

    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $items = $this->itemService->findAll();

        return ItemResource::collection($items);
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
    public function store(CreateItemRequest $request) : ItemResource
    {
        $validated = $request->validated();

        $item = $this->itemService->create($validated);

        return (new ItemResource($item));
    }

        
    /**
     * Display the specified resource.
     */
    public function show(string $slug) 
    {

        $item = $this->itemService->findWithoutFail($slug);

        if(!$item) return response()->error(404, __(':resource_not_found', ['resource' => 'Item']));

        return (new ItemResource($item));
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
    public function update(UpdateItemRequest $request, $id) : ItemResource
    {
        $validated = $request->validated();

        $item = $this->itemService->update($validated, $id);

        return (new ItemResource($item));
    }


    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $deleted = $this->itemService->delete($id);

        if($deleted) return response()->success(200, __(':resource_deleted_successfully', ['resource' => 'Item']));

        return response()->error(404, __(':resource_not_found', ['resource' => 'Item']));
    }

}
