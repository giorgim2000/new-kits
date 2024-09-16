import { trigger, transition, style, animate, query, stagger } from '@angular/animations';
import { Component } from '@angular/core';

@Component({
  selector: 'app-showroom',
  templateUrl: './showroom.component.html',
  styleUrl: './showroom.component.scss',
  animations: [
    trigger('fadeInOut', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('900ms', style({ opacity: 1 })),
      ]),
      transition(':leave', [
        animate('0ms', style({ opacity: 0 })),
      ]),
    ]),
    trigger('fadeInList', [
      transition('* => *', [
        query(':enter', [
          style({ opacity: 0, transform: 'translateY(-15px)' }),
          stagger('100ms', [
            animate('500ms', style({ opacity: 1, transform: 'translateY(0)' })),
          ]),
        ], { optional: true }),
      ]),
    ]),
  ]
})
export class ShowroomComponent {

  constructor(){}

  scrollLeft() {
    const container = document.querySelector('.media-scroller')!;
    container.scrollLeft -= 900;
  }

  scrollRight() {
    const container = document.querySelector('.media-scroller')!;
    container.scrollLeft += 900;
  }
}
