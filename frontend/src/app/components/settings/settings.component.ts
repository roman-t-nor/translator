import { Component } from '@angular/core';
import { RespectListGroupsComponent } from '@/components/settings/respect-list-groups/respect-list-groups.component';
import { SectionsComponent } from '@/components/settings/sections/sections.component';
import { LanguagesComponent } from '@/components/settings/languages/languages.component';
import { ContentUploadComponent } from '@/components/settings/content-upload/content-upload.component';

@Component({
  selector: 'settings',
  standalone: true,
  imports: [
    RespectListGroupsComponent,
    SectionsComponent,
    LanguagesComponent,
    ContentUploadComponent,
  ],
  templateUrl: 'settings.component.html',
})
export class SettingsComponent {}
