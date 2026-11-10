<?php

namespace App\Policies;

use App\Models\BoardList;
use App\Models\User;

class BoardListPolicy
{
    public function manage(User $user, BoardList $list): bool
    {
        return $list->board->user_id === $user->id;
    }
}