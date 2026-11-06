<?php

namespace App\Http\Controllers;

use App\Http\Requests\BoardListRequest;
use App\Http\Resources\BoardListResource;
use App\Models\Board;
use App\Models\BoardList;
use Illuminate\Support\Facades\Gate;

class BoardListController extends Controller
{
    /**
     * Store a newly created resource in storage.
     */
    public function store(BoardListRequest $request, Board $board)
    {
        Gate::authorize('update', $board);

        $position = ($board->lists()->max('position') ?? -1) + 1;
        $list = $board->lists()->create([...$request->validated(), 'position' => $position]);

        return (new BoardListResource($list))->response()->setStatusCode(201);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(BoardListRequest $request, BoardList $boardList)
    {
        Gate::authorize('manage', $boardList);

        $boardList->update($request->validated());
        return new BoardListResource($boardList);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(BoardList $boardList)
    {
        Gate::authorize('manage', $boardList);

        $boardList->delete();
        return response()->noContent();
    }
}
