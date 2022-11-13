import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {TodosRoutingModule} from 'src/app/todos/todos-routing.module';
import {TodolistsListComponent} from 'src/app/todos/components/todolistsList/todolistsList.component';
import {SharedModule} from 'src/app/shared/shared.module'
import {TasksComponent} from 'src/app/todos/tasks/components/tasks/tasks.component';
import { TodoComponent } from 'src/app/todos/components/todo/todo.component'
import {FormsModule} from '@angular/forms'


@NgModule({
  declarations: [
    TodolistsListComponent, TasksComponent, TodoComponent
  ],
  exports: [
    TodolistsListComponent, TasksComponent,
  ],
  imports: [
    CommonModule,
    TodosRoutingModule,
    SharedModule,
    FormsModule
  ]
})
export class TodosModule {
}
