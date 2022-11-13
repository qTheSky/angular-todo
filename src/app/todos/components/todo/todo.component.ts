import {Component, Input, OnInit} from '@angular/core';
import {FilterValuesType, TodoDomain} from 'src/app/todos/models/todos.models'
import {TodosService} from 'src/app/todos/services/todos.service'
import {TasksService, TasksState} from 'src/app/todos/tasks/services/tasks.service'
import {Observable} from 'rxjs'
import {TaskStatuses} from 'src/app/todos/tasks/models/task.model'

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss']
})
export class TodoComponent implements OnInit {
  @Input() todo!: TodoDomain

  tasks$!: Observable<TasksState>

  constructor(private todosService: TodosService, private tasksService: TasksService) {
  }

  ngOnInit() {
    this.tasks$ = this.tasksService.tasksState$
    this.tasksService.fetchTasks(this.todo.id)
  }

  getArrayOfTasks() {
    switch (this.todo.filter) {
      case 'all':
        return this.tasksService.getArrayOfTasks(this.todo.id)
      case 'active':
        return this.tasksService.getArrayOfTasks(this.todo.id).filter(task => task.status === TaskStatuses.New)
      case 'completed':
        return this.tasksService.getArrayOfTasks(this.todo.id).filter(task => task.status === TaskStatuses.Completed)
      default:
        return this.tasksService.getArrayOfTasks(this.todo.id)
    }
  }

  changeTodoFilter(todoId: string, filter: FilterValuesType) {
    this.todosService.changeTodoFilter(this.todo.id, filter)
  }

  deleteTodo() {
    this.todosService.deleteTodo(this.todo.id)
  }

  createTask(title: string) {
    this.tasksService.createTask(this.todo.id, title)
  }
}
