<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        $sections = DB::table('b_iblock_section')
            ->orderBy('left_margin')
            ->get();

        foreach ($sections as $s) {
            DB::table('sections')->insert([
                'id' => $s->ID,
                'name' => $s->NAME,
                'parent_id' => $s->IBLOCK_SECTION_ID,
                'active' => $s->ACTIVE === "Y",
                'left_margin' => $s->LEFT_MARGIN,
                'right_margin' => $s->RIGHT_MARGIN,
                'depth_level' => $s->DEPTH_LEVEL,
            ]);
        }

    }
}
