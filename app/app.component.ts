import {Component} from 'angular2/core';
import {BouncyComponent} from "./bouncy/bouncy.component";

@Component({
    selector: 'app',
    templateUrl: 'app/app.tpl.html',
    directives: [BouncyComponent],
})
export class AppComponent { }

