<?php

namespace App\View\Components;

use Closure;
use Illuminate\Contracts\View\View;
use Illuminate\View\Component;

class Message extends Component
{
    public string $type = '';
    public string $message = '';

    public function __construct()
    {
        if ($message = session()->get('message')) {
            $this->message = $message['message'];
            $this->type = $message['type'];
        }
    }

    public static function add(string $message, string $type = 'success')
    {
        request()->session()->flash('message', compact('message', 'type'));
    }

    public function render(): View|Closure|string
    {
        return view('components.message');
    }

    public function shouldRender()
    {
        return !!$this->message;
    }
}
