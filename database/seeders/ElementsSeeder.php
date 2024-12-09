<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class ElementsSeeder extends Seeder
{
    public function run(): void
    {
        $elements = DB::table('b_iblock_element')
            ->get();

        foreach ($elements as $e) {
            DB::table('elements')->insert([
                'id' => $e->ID,
                'name' => $e->NAME,
                'section_id' => $e->IBLOCK_SECTION_ID,
                'active' => $e->ACTIVE === "Y",
            ]);
        }

    }
}
