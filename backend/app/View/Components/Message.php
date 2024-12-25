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
        $this->message = self::makeBoldTextInQuotesIncluded($this->message);
        $this->message = self::makeBoldTextInPipesExcluded($this->message);
        return view('components.message');
    }

    public function shouldRender()
    {
        return !!$this->message;
    }

    private static function makeBoldTextInQuotesIncluded(string $text): string
    {
        return preg_replace('/"([^"]+)"/', '<b>$0</b>', $text);
    }

    private static function makeBoldTextInPipesExcluded(string $text): string
    {
        return preg_replace('/\|([^|]+)\|/', '<b>$1</b>', $text);
    }
}
