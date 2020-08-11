import { Directive, ElementRef, OnInit, AfterViewInit } from "@angular/core";
import { PlatformService } from 'src/app/common/services/platform.service';

@Directive({
    selector: '[headerScroll]'
})
export class HeaderScrollDirective implements OnInit, AfterViewInit {
    private _el: HTMLElement;
    private observer: IntersectionObserver;

    constructor(
        _ref: ElementRef,
        private _platform: PlatformService
    ) {
        this._el = _ref.nativeElement;
    }

    ngOnInit(): void {
        
    }

    ngAfterViewInit(): void {
        this.scrollDetection();
    }

    scrollDetection(): void {
        if (this._platform.isBrowser) {
            const header = this._el;
            const topHeader = header.querySelector('#top-header');
            const bottomHeader = header.querySelector('#section-header');
            const main: HTMLElement = document.querySelector('main#main-content');
            const handler = (entries) => {

                if (!entries[0].isIntersecting) {
                    bottomHeader.classList.add('fixed-top');
                    main.style.paddingTop = '145px';
                } else {
                    bottomHeader.classList.remove('fixed-top');
                    main.style.paddingTop = '0px';
                }
            }
            this.observer = new IntersectionObserver(handler);
            this.observer.observe(topHeader);
        }
    }




}