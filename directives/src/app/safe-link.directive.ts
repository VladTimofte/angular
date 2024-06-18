import { Directive, input } from '@angular/core'

@Directive({
    selector: "a[appSafeLink]",
    standalone: true,
    host: {
        '(click)': 'onConfirmLeavePage($event)'
    }
})
export class SafeLinkDirective {

    queryParam = input('myApp')

constructor() {
    console.log('SafeLinkDirective Loaded')
}

    onConfirmLeavePage(event: MouseEvent) {
        const wantsToLeave = window.confirm('Do you want to leave the app?');

        if (wantsToLeave) {
            const address = (event.target as HTMLAnchorElement).href;
            (event.target as HTMLAnchorElement).href = address + '?from=' + this.queryParam();
            return;
        }

        event?.preventDefault();
    }   

}