import { Component } from '@angular/core';

@Component({
    selector: 'my-app',
    template: require('./app.component.html'),
    styles: [require('!raw!stylus!./app.component.styl')]
})
export class AppComponent{}