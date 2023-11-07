import { Injectable } from '@angular/core';
import { CommandService } from '@/app/services/command.service';

@Injectable({
  providedIn: 'root'
})
export class CommandModelContributionService {
  constructor(private command: CommandService) {}
}
