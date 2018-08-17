import { Directive, Output, EventEmitter, ElementRef, Renderer } from '@angular/core';

@Directive({
  selector: '[overslide]' // Attribute selector
})
export class OverslideDirective {
 
  @Output() overslide: any = new EventEmitter();
 
  triggered: boolean = false;

  constructor(public element: ElementRef, public renderer: Renderer) {
      
  }

  handleDrag(ev){

      if(Math.abs(ev.getSlidingPercent()) > 1.7 && !this.triggered){

          this.triggered = true;

          this.renderer.setElementStyle(this.element.nativeElement, 'transition', '0.3s linear');
          this.renderer.setElementStyle(this.element.nativeElement, 'opacity', '1');

          setTimeout(() => {
              this.renderer.setElementStyle(this.element.nativeElement, 'display', 'none');
              this.overslide.emit(true);
          }, 300);

      }

  }
}
