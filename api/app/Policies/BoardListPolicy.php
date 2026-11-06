<?php

namespace App\Policies;

use App\Models\BoardList;
use App\Models\User;

class BoardListPolicy
{
    /**
     * Determine whether the user can manage the model
     * @param User $user
     * @param BoardList $boardList
     * @return bool
     */
    public function manage(User $user, BoardList $boardList)
    {
        return $boardList->board->user_id === $user->id;
    }
}
