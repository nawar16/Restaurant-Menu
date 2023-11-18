<?php

namespace App\Providers;


use Illuminate\Support\ServiceProvider;
use Illuminate\Contracts\Routing\ResponseFactory;

class ApiResponseServiceProvider extends ServiceProvider
{
    /**
     * Register services.
     *
     * @return void
     */
    public function register()
    {
        //
    }

    /**
     * Bootstrap services.
     *
     * @return void
     */
    public function boot()
    {
        $response = app(ResponseFactory::class);

        $response->macro('success', function ($status, $data = null, $meta = null) use ($response) {
            if(is_string($data))
            {
                $responseData = [
                    'success' => $status == '422' || $status == '404' ? false:true,
                    'status' => $status,
                    'message' => $status == '422' || $status == '404' ? __('Something went wrong'):__('Success'),
                    'data' => [$data],
                    'meta' => $meta
                ];
            }
            else{
                $responseData = [
                    'success' => $status == '422' || $status == '404' ? false:true,
                    'status' => $status,
                    'message' => $status == '422' || $status == '404' ? __('Something went wrong'):__('Success'),
                    'data' => $data,
                    'meta' => $meta
                ];
            }

            return $response->json($responseData, $status);
        });

        $response->macro('error', function ($status, $errors) use ($response) {

            if (is_string($errors)) {
                return $response->json([
                    'success' => false,
                    'status' => $status,
                    'message' => __('Something went wrong'),
                    'errors' => [$errors],
                ], $status);
            }

            $flatten = [];
            array_walk_recursive($errors, function ($error) use (&$flatten) {
                $flatten[] = $error;
            });

            return $response->json([
                'success' => false,
                'status' => $status,
                'message' => __('Something went wrong'),
                'errors' => $flatten,
            ], $status);
        });
    }

}