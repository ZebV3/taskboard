<?php

namespace App\Http\Controllers;

use App\Http\Requests\BoardRequest;
use App\Http\Resources\BoardSource;
use App\Models\Board;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Gate;

class BoardController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        return BoardSource::collection(
            $request->user()->boards()->latest()->get()
        );
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(BoardRequest $request)
    {
        $board = $request->user()->boards()->create($request->validated());
        return (new BoardSource($board)->response()->setStatusCode(201));
    }

    /**
     * Display the specified resource.
     */
    public function show(Board $board)
    {
        Gate::authorize('view', $board);
        return new BoardSource($board);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(BoardRequest $request, Board $board)
    {
        Gate::authorize('update', $board);
        $board->update($request->validated());
        return new BoardSource($board);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Board $board)
    {
        Gate::authorize('delete', $board);
        $board->delete();
        return response()->noContent();
    }
}
