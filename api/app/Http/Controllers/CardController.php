<?php

namespace App\Http\Controllers;

use App\Http\Requests\CardRequest;
use App\Http\Resources\CardResource;
use App\Models\{BoardList, Card};
use Illuminate\Support\Facades\Gate;

class CardController extends Controller
{
    public function store(CardRequest $request, BoardList $list)
    {
        Gate::authorize('manage', $list);
        $position = ($list->cards()->max('position') ?? -1) + 1;
        $card = $list->cards()->create([...$request->validated(), 'position' => $position]);
        return (new CardResource($card))->response()->setStatusCode(201);
    }

    public function update(CardRequest $request, Card $card)
    {
        Gate::authorize('manage', $card);
        $card->update($request->validated());
        return new CardResource($card);
    }

    public function destroy(Card $card)
    {
        Gate::authorize('manage', $card);
        $card->delete();
        return response()->noContent();
    }
}