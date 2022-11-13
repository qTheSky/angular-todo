import {Injectable} from '@angular/core';
import {BehaviorSubject, catchError, EMPTY, map} from 'rxjs'
import {FilterValuesType, TodoApi, TodoDomain} from 'src/app/todos/models/todos.models'
import {HttpClient, HttpErrorResponse} from '@angular/common/http'
import {environment} from 'src/environments/environment'
import {BaseResponse} from 'src/app/core/model/core.model'

@Injectable({
  providedIn: 'root'
})
export class TodosService {
  todos$ = new BehaviorSubject<TodoDomain[]>([])

  constructor(private http: HttpClient) {
  }

  fetchTodos() {
    this.http.get<TodoApi[]>(`${environment.baseUrl}/todo-lists`)
      .pipe(
        catchError(this.errorHandler.bind(this)),
        map((todos) => {
          return todos.map(todo => ({...todo, filter: 'all', entityStatus: 'idle'} as TodoDomain))
        }))
      .subscribe((todos) => {
        this.todos$.next(todos)
      })
  }

  deleteTodo(todoId: string) {
    this.http.delete<BaseResponse>(`${environment.baseUrl}/todo-lists/${todoId}`)
      .pipe(
        catchError(this.errorHandler.bind(this)),
        map(() => {
          return this.todos$.getValue().filter(todo => todo.id !== todoId)
        }))
      .subscribe((newArray) => {
        this.todos$.next(newArray)
      })
  }

  createTodo(title: string) {
    this.http.post<BaseResponse<{ item: TodoApi }>>(`${environment.baseUrl}/todo-lists`, {title})
      .pipe(
        catchError(this.errorHandler.bind(this)),
        map((res) => {
          const newTodo = {...res.data.item, entityStatus: 'idle', filter: 'all'} as TodoDomain
          const oldTodos = this.todos$.getValue()
          return [newTodo, ...oldTodos]
        }))
      .subscribe((newArrayTodos) => {
        this.todos$.next(newArrayTodos)
      })
  }

  changeTodoFilter(todoId: string, filter: FilterValuesType) {
    const todosWithChangedFilter = this.todos$.getValue().map(tl => tl.id === todoId ? {...tl, filter} : tl)
    this.todos$.next(todosWithChangedFilter)
  }

  private errorHandler(err: HttpErrorResponse) {
    alert(err.message)
    return EMPTY
  }
}
