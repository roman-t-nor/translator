import { Injectable } from '@angular/core';
import { Entry } from '@/Entry';

@Injectable({
  providedIn: 'root',
})
export class HelperService {
  getEntries(text: string) {
    let groups: string[] = [];
    text
      .split(/[\r\n]+/)
      .map((g) => g.trim())
      .filter(Boolean)
      .map((g) => g.replaceAll('...', '…'))
      .map((g) => g.replaceAll('?!', '⁈'))
      .map((g) => groups.push(g));

    groups = groups.filter((g, i) => {
      return !g.includes('-->') && !groups[i + 1]?.includes('-->');
    });

    groups = groups.map((g) => (g.startsWith('- ') ? g.slice(2) : g));

    const tempGroups = [];
    const endChars = ['.', '?', '!', '…', '⁈'];
    let chunks = [];

    for (let i = 0; i < groups.length; i++) {
      const lastChar = groups[i].slice(-1);
      if (endChars.includes(lastChar) || i === groups.length - 1) {
        if (!chunks.length) {
          tempGroups.push(groups[i]);
        } else {
          chunks.push(groups[i]);
          tempGroups.push(chunks.join(' '));
          chunks = [];
        }
      } else {
        chunks.push(groups[i]);
      }
    }

    groups = tempGroups;

    let entries: Entry[] = [];

    let id = 0;
    groups.forEach((context) => {
      const groupEntries = context.split(/(?<=[.!?…⁈])/g);

      groupEntries.forEach((e, index) => {
        e = e.trim();
        const entry = new Entry(index, e);
        entry.id = id++;
        if (groupEntries.length > 1) {
          entry.context = context;
        }
        if (index + 1 === groupEntries.length) {
          entry.lastInGroup = true;
        }
        entries.push(entry);
      });
    });

    return entries;
  }

  hashCode(string: string): number {
    let hash = 0,
      i,
      chr,
      len;
    if (string.length === 0) return hash;
    for (i = 0, len = string.length; i < len; i++) {
      chr = string.charCodeAt(i);
      hash = (hash << 5) - hash + chr;
      hash |= 0; // Convert to 32bit integer
    }
    return Math.abs(hash);
  }
}
