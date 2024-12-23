<?php

namespace App\Requests;

use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;

class StoreElementRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'title' => ['required', 'min:3', 'max:255'],
            'translation' => ['required', 'min:3', 'max:255'],
            'context' => ['min:3', 'max:1500', 'nullable']
        ];
    }
}

