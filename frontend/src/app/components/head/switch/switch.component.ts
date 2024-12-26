import { Component } from '@angular/core';

@Component({
  selector: 'app-switch',
  standalone: true,
  templateUrl: 'switch.component.html',
  styleUrl: 'switch.component.css',
})
export class SwitchComponent {
  title: 'Read' | 'Memorize' = 'Read';

  toggle() {
    console.log('toggle');
    this.title = this.title === 'Read' ? 'Memorize' : 'Read';
  }
}
