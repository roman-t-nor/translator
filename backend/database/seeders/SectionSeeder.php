<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class SectionSeeder extends Seeder
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
                '_lft' => $s->LEFT_MARGIN,
                '_rgt' => $s->RIGHT_MARGIN,
                'created_at' => $s->DATE_CREATE,
            ]);
        }

    }
}
