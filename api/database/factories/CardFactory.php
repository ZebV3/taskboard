<?php

namespace Database\Factories;

use App\Models\BoardList;
use App\Models\Card;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<Card>
 */
class CardFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'board_list_id' => BoardList::factory(),
            'title' => fake()->words(2, true),
            'position' => 0
        ];
    }
}
