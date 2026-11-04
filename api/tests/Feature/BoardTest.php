<?php

use App\Models\{Board, User};
use function Pest\Laravel\{actingAs, getJson};

it('forbids viewing another user\'s board', function () {
    $board = Board::factory()->create();
    actingAs(User::factory()->create());
    getJson("/api/boards/{$board->id}")->assertForbidden();
});