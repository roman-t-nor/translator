<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class ElementsSeeder extends Seeder
{
    public function run(): void
    {
        $elements = DB::table('b_iblock_element as e')
            ->select('e.ID', 'e.NAME', 'e.IBLOCK_SECTION_ID', 'e.ACTIVE')
            ->selectRaw('GROUP_CONCAT(p.VALUE SEPARATOR "|")  as "VALUES"')
            ->whereNot('p.IBLOCK_PROPERTY_ID', 12)
            ->join('b_iblock_element_property as p', 'e.ID', '=', 'p.IBLOCK_ELEMENT_ID')
            ->groupBy('e.ID')
            ->get();


        foreach ($elements as $e) {
            $values = explode('|', $e->VALUES);

            $translation = $values[0];
            $context = null;

            if (!empty($values[1])) {
                $context = @unserialize($values[1]);
                if (!empty($context)) {
                    $context = $context["TEXT"];
                }
            }

            DB::table('elements')->insert([
                'id' => $e->ID,
                'name' => $e->NAME,
                'translation' => $translation,
                'context' => $context,
                'section_id' => $e->IBLOCK_SECTION_ID,
                'active' => $e->ACTIVE === "Y",
            ]);
        }

    }
}
