import { Component } from '@angular/core';
import { TitleComponent } from '@/components/head/title/title.component';
import { ModeComponent } from '@/components/head/mode/mode.component';

@Component({
  selector: 'app-head',
  standalone: true,
  imports: [TitleComponent, ModeComponent],
  templateUrl: './head.component.html',
})
export class HeadComponent {}
