import { Injectable } from '@angular/core';
import { IKeyBinding } from '@/app/flow-core/interfaces';

@Injectable({
  providedIn: 'root'
})
export class KeybindingService {
  private keyBindingMap = new Map<string, IKeyBinding>();
}
