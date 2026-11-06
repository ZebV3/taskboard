<?php

namespace App\Http\Controllers;

use App\Http\Requests\CardRequest;
use App\Http\Resources\CardResource;
use App\Models\BoardList;
use App\Models\Card;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Gate;

class CardController extends Controller
{
    /**
     * Store a newly created resource in storage.
     */
    public function store(CardRequest $request, BoardList $boardList)
    {
        Gate::authorize('manage', $boardList);

        $position = ($boardList->cards()->max('position') ?? -1) + 1;
        $card = $boardList->cards()->create([...$request->validated(), 'position' => $position]);

        return (new CardResource($card))->response()->setStatusCode(201);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(CardRequest $request, Card $card)
    {
        Gate::authorize('manage', $card);

        $card->update($request->validated());
        return new CardResource($card);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Card $card)
    {
        Gate::authorize('manage', $card);

        $card->delete();
        return response()->noContent();
    }
}
