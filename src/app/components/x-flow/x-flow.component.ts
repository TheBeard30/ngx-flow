import { ChangeDetectionStrategy, Component, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-x-flow',
  templateUrl: './x-flow.component.html',
  styleUrls: ['./x-flow.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class XFlowComponent {
  @ViewChild('XFlow') XFlow: ElementRef | undefined;
}
