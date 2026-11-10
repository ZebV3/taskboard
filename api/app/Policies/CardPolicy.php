<?php

namespace App\Policies;

use App\Models\Card;
use App\Models\User;

class CardPolicy
{
    public function manage(User $user, Card $card): bool
    {
        return $card->boardList->board->user_id === $user->id;
    }
}