<?php

namespace App\Policies;

use App\Models\Card;
use App\Models\User;

class CardPolicy
{
    /**
     * Create a new policy instance.
     */
    public function __construct()
    {
        //
    }

    /**
     * Determine whether the user can manage the model
     * @param User $user
     * @param Card $card
     * @return bool
     */
    public function manage(User $user, Card $card)
    {
        return $card->boardList->board->user_id === $user->id;
    }
}
