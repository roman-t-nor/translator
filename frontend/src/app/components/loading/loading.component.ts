import { Component } from '@angular/core';

@Component({
  selector: 'loading',
  standalone: true,
  template: '{{text}}',
})
export class LoadingComponent {
  text: string;
  char: string = '-';
  min: number = 5;
  max: number = 60;
  speed: number = 100;

  constructor() {
    this.text = this.char;
    setInterval(() => {
      if (this.text.length >= this.getRandomInt(this.min, this.max)) {
        this.text = this.char;
      }
      this.text += this.char;
    }, this.speed);
  }

  getRandomInt(min: number, max: number) {
    const minCeil = Math.ceil(min);
    const maxFloored = Math.floor(max);
    return Math.floor(Math.random() * (maxFloored - minCeil + 1) + minCeil);
  }
}
