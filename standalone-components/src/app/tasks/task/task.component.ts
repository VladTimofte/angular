import { Component, Input } from '@angular/core';
import { DatePipe } from '@angular/common'
import { inject } from '@angular/core';

import { Task } from './task.model';
import { CardComponent } from "../../shared/card/card.component";
import { TasksService } from '../tasks.service';

@Component({
    selector: 'app-task',
    standalone: true,
    templateUrl: './task.component.html',
    styleUrl: './task.component.css',
    imports: [CardComponent, DatePipe]
})
export class TaskComponent {

  @Input({required: true}) task!: Task;
  
  private tasksService = inject(TasksService)

  onCompleteTask(id: string) {
    this.tasksService.removeTask(id)
  }

}
