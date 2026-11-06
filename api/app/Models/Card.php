<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Card extends Model
{
    /** @use HasFactory<\Database\Factories\CardFactory> */
    use HasFactory;

    protected $fillable = ['title', 'description', 'position', 'due_date'];

    protected function casts()
    {
        return ['due_date' => 'date'];
    }

    public function boarList()
    {
        return $this->belongsTo(BoardList::class);
    }
}
