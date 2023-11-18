<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;

class CustomApiResponse
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle(Request $request, Closure $next)
    {
        $response = $next($request);

        $status = $response->status();

        if ($status === 204) {
            return $response;
        }
   
        $status === 422 ? 'Failed' : JsonResponse::$statusTexts[$status];

        if ($status === 500) {
            dd($response);
            return response()->error($status, 'error.unexpected');
        }

        $data = $response->getData();
        if(isset($data->meta))
        {
            $meta = $data->meta;
            $data = $data->data;
        }
        else $meta = null;

        if (isset($data->errors)) {
            if(is_array($data->errors))
            return response()->error($status, $data->errors);
            else 
            return response()->error($status, get_object_vars($data->errors));
        }


        if (isset($data->data)) {
            if(is_object($data->data))
            $data = get_object_vars($data->data);
            else $data = $data->data;
        }
        if ($status === 401 || $status === 403) {
            return response()->error($status, $data);
        }
        return response()->success($status, $data, $meta);
    }

}