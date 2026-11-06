<?php

namespace App\Http\Controllers;

use App\Http\Requests\BoardRequest;
use App\Http\Resources\BoardResource;
use App\Models\Board;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Gate;

class BoardController extends Controller
{
    public function index(Request $request)
    {
        return BoardResource::collection(
            $request->user()->boards()->latest()->get()
        );
    }

    public function store(BoardRequest $request)
    {
        $board = $request->user()->boards()->create($request->validated());
        return (new BoardResource($board))->response()->setStatusCode(201);
    }

    public function show(Board $board)
    {
        Gate::authorize('view', $board);
        return new BoardResource($board->load('lists.cards'));
    }

    public function update(BoardRequest $request, Board $board)
    {
        Gate::authorize('update', $board);
        $board->update($request->validated());
        return new BoardResource($board);
    }

    public function destroy(Board $board)
    {
        Gate::authorize('delete', $board);
        $board->delete();
        return response()->noContent();
    }
}