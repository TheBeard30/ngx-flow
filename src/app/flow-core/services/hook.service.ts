import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HookService<T> {
  hooks: T;

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  constructor() {}
}
