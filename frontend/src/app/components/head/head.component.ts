import { Component } from '@angular/core';
import { TitleComponent } from '@/components/head/title/title.component';
import { SwitchComponent } from '@/components/head/switch/switch.component';

@Component({
  selector: 'app-head',
  standalone: true,
  imports: [TitleComponent, SwitchComponent],
  templateUrl: './head.component.html',
})
export class HeadComponent {}
