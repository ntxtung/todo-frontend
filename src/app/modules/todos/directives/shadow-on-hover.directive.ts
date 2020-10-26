import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appShadowOnHover]'
})
export class ShadowOnHoverDirective {

  constructor(
    private el: ElementRef
  ) {
  }

  @HostListener('mouseenter', ['$event'])
  onMouseEnterEffect(): void {
    this.el.nativeElement.style.backgroundColor = '#f4f5f7';
    this.el.nativeElement.style.cursor = 'pointer';
    this.el.nativeElement.style.boxShadow = '2px 2px 0 1px rgba(0, 0, 0, 0.2)';
    this.el.nativeElement.style.transition = 'all 200ms ease-out';
  }

  @HostListener('mouseleave', ['$event'])
  onMouseLeaveEffect(): void {
    this.el.nativeElement.style.backgroundColor = null;
    this.el.nativeElement.style.boxShadow = null;
  }
}
