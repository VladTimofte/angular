import { Component, Input } from '@angular/core';
import { inject } from '@angular/core';

import { Task } from './task.model';
import { TasksService } from '../tasks.service';

@Component({
    selector: 'app-task',
    templateUrl: './task.component.html',
    styleUrl: './task.component.css',
})
export class TaskComponent {

  @Input({required: true}) task!: Task;
  
  private tasksService = inject(TasksService)

  onCompleteTask(id: string) {
    this.tasksService.removeTask(id)
  }

}
