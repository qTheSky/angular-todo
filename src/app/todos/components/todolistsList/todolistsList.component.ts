import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs'
import {TodoDomain} from 'src/app/todos/models/todos.models'
import {TodosService} from 'src/app/todos/services/todos.service'

@Component({
  selector: 'app-todolistsList',
  templateUrl: './todolistsList.component.html',
  styleUrls: ['./todolistsList.component.scss']
})
export class TodolistsListComponent implements OnInit {
  todos$!: Observable<TodoDomain[]>

  constructor(private todosService: TodosService) {
  }

  ngOnInit() {
    this.todos$ = this.todosService.todos$
    this.todosService.fetchTodos()
  }

  createTodo(title: string) {
    this.todosService.createTodo(title)
  }


}
