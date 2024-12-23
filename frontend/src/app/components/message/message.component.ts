import { Component } from '@angular/core';
import { MessageService } from '@/services/message.service';
import { IconSuccessComponent } from './icons/success/icon-success.component';
import { IconErrorComponent } from './icons/error/icon-error.component';
import { delay, of } from 'rxjs';
import { NgIf } from '@angular/common';

@Component({
  selector: 'message',
  standalone: true,
  templateUrl: './message.component.html',
  imports: [IconSuccessComponent, IconErrorComponent, NgIf],
})
export class MessageComponent {
  message: string = '';
  type: 'success' | 'error' = 'success';
  isShow = false;
  private classOuterInit: string = 'message';
  classOuter: string = this.classOuterInit;

  public constructor(private messageService: MessageService) {}

  ngOnInit() {
    this.messageService.isShow$.subscribe({
      next: (value) => {
        if (value) {
          this.message = this.messageService.message;
          this.show();
          of(true)
            .pipe(delay(1500))
            .subscribe(() => {
              // this.messageService.close();
            });
        } else {
          this.hide();
        }
        this.type = this.messageService.type;
      },
    });
  }

  close() {
    this.messageService.close();
  }

  private show() {
    this.classOuter += ' message-top-position';
  }

  private hide() {
    this.classOuter = this.classOuterInit;
  }
}
