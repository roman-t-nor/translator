import { Injectable } from '@angular/core';
import { HelperService } from '@/services/helper.service';
import { Entry } from '@/Entry';
import { from, map, Observable } from 'rxjs';
import { subtitles as developmentSubtitles } from '@/test/subtitles';

@Injectable({
  providedIn: 'root',
})
export class EntriesProviderService {
  constructor(private helper: HelperService) {}

  getTestEntries(): Entry[] {
    const entries = this.helper.getEntries(developmentSubtitles);
    entries[0].translations = [
      'Lorem ipsum',
      'Malesuada fames ac turpis egestas',
    ];

    return entries;
  }

  getEntriesFromFile(file: File): Observable<Entry[]> {
    return from(file.text()).pipe(
      map((text: string) => this.helper.getEntries(text)),
    );
  }

  getEntriesFromPaste(text: string): Entry[] {
    return this.helper.getEntries(text);
  }
}
