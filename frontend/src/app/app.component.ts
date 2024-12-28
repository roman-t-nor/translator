import { Component, isDevMode, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ListComponent } from '@/components/list/list.component';
import { MessageComponent } from './components/message/message.component';
import { StateService } from './services/state.service';
import { SettingsComponent } from '@/components/settings/settings.component';
import { HeadComponent } from '@/components/head/head.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ListComponent, MessageComponent, SettingsComponent, HeadComponent],
  templateUrl: './app.component.html',
  styles: ':host{display: flex;flex-direction: column;flex-grow: 1;}',
})
export class AppComponent implements OnInit {
  title = 'Angular ajax translate';

  public constructor(
    private titleService: Title,
    private state: StateService,
  ) {}

  ngOnInit(): void {
    this.title += isDevMode() ? ' - DEVELOPMENT' : '';
    this.titleService.setTitle(this.title);
    this.state.getSections();
  }
}
