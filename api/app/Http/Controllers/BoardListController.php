<?php

namespace App\Http\Controllers;

use App\Http\Requests\BoardListRequest;
use App\Http\Resources\BoardListResource;
use App\Models\{Board, BoardList};
use Illuminate\Support\Facades\Gate;

class BoardListController extends Controller
{
    public function store(BoardListRequest $request, Board $board)
    {
        Gate::authorize('update', $board);
        $position = ($board->lists()->max('position') ?? -1) + 1;
        $list = $board->lists()->create([...$request->validated(), 'position' => $position]);
        return (new BoardListResource($list))->response()->setStatusCode(201);
    }

    public function update(BoardListRequest $request, BoardList $list)
    {
        Gate::authorize('manage', $list);
        $list->update($request->validated());
        return new BoardListResource($list);
    }

    public function destroy(BoardList $list)
    {
        Gate::authorize('manage', $list);
        $list->delete();
        return response()->noContent();
    }
}