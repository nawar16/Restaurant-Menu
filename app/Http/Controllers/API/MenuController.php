<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Http\Requests\CreateMenuRequest;
use App\Http\Requests\UpdateMenuRequest;
use App\Http\Resources\MenuResource;
use App\Services\MenuService;
use Illuminate\Http\Request;

class MenuController extends Controller
{
    /**
     * @var \App\Services\MenuService
     */
    private MenuService $menuService;

    public function __construct(MenuService $menuService)
    {
        $this->menuService = $menuService;
    }

    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $menus = $this->menuService->findAll();

        return MenuResource::collection($menus);
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
    public function store(CreateMenuRequest $request) : MenuResource
    {
        $validated = $request->validated();

        $menu = $this->menuService->create($validated);

        return (new MenuResource($menu));
    }

        
    /**
     * Display the specified resource.
     */
    public function user_menu() 
    {
        $menu = $this->menuService->user_menu(auth()->user()->id);

        if(!$menu) return response()->error(404, __(':resource_not_found', ['resource' => 'Menu']));

        return (new MenuResource($menu));
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
    public function update(UpdateMenuRequest $request, $id) : MenuResource
    {
        $validated = $request->validated();

        $menu = $this->menuService->update($validated, $id);

        return (new MenuResource($menu));
    }


    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $deleted = $this->menuService->delete($id);

        if($deleted) return response()->success(200, __(':resource_deleted_successfully', ['resource' => 'Menu']));

        return response()->error(404, __(':resource_not_found', ['resource' => 'Menu']));
    }

}
