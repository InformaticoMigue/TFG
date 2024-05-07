import {
  animate,
  state,
  style,
  transition,
  trigger
} from "@angular/animations";

export const CardFlip = trigger('cardFlip', [
  state('active', style({
    transform: 'rotateY(179deg)'
  })),
  state('inactive', style({
    transform: 'rotateY(0)'
  })),
  transition('active => inactive', animate('500ms ease-out')),
  transition('inactive => active', animate('500ms ease-in'))
])

export const filterAnimalOpacity = trigger('fadeInOut', [
  transition(':enter', [   // :enter es un alias para 'void => *'
    style({ opacity: 0 }),
    animate('300ms', style({ opacity: 1 }))
  ]),
  transition(':leave', [   // :leave es un alias para '* => void'
    animate('300ms', style({ opacity: 0 }))
  ])
])
