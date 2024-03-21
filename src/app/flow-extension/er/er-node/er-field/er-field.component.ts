import { AfterViewInit, Component, Input } from '@angular/core';

@Component({
  selector: 'app-er-field',
  templateUrl: './er-field.component.html',
  styleUrls: ['./er-field.component.less']
})
export class ErFieldComponent {
  @Input() item: any;

}
