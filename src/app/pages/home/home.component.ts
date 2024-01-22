import { AfterViewInit, ChangeDetectionStrategy, Component, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomeComponent implements AfterViewInit, OnDestroy {
  syncPointer = ({ x: pointerX, y: pointerY }) => {
    const x = pointerX.toFixed(2);
    const y = pointerY.toFixed(2);
    const xp = (pointerX / window.innerWidth).toFixed(2);
    const yp = (pointerY / window.innerHeight).toFixed(2);
    document.documentElement.style.setProperty('--x', x);
    document.documentElement.style.setProperty('--xp', xp);
    document.documentElement.style.setProperty('--y', y);
    document.documentElement.style.setProperty('--yp', yp);
  };

  constructor(private router: Router) {}
  ngAfterViewInit(): void {
    document.body.addEventListener('pointermove', this.syncPointer);
  }

  ngOnDestroy(): void {
    document.body.removeEventListener('pointermove', this.syncPointer);
  }

  navigate(t: 'flow' | 'er'): void {
    const map = {
      flow: '/flow',
      er: '/er'
    };
    const url = map[t] ?? '/flow';
    this.router.navigate([url]);
  }
}
