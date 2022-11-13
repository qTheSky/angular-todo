import {Component, Input, OnInit} from '@angular/core';
import {Task, TaskStatuses} from 'src/app/todos/tasks/models/task.model'
import {TasksService} from 'src/app/todos/tasks/services/tasks.service'

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.scss']
})
export class TasksComponent implements OnInit {
  @Input() task!: Task


  constructor(private tasksService: TasksService) {
  }

  ngOnInit() {
  }

  deleteTask() {
    this.tasksService.deleteTask(this.task.todoListId, this.task.id)
  }

  changeTaskStatus(e: Event) {
    this.tasksService.updateTask(this.task.todoListId, this.task.id, {
      status: e ? TaskStatuses.Completed : TaskStatuses.New
    })
  }
}

