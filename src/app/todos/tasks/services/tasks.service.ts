import {Injectable} from '@angular/core';
import {BehaviorSubject, catchError, EMPTY, map} from 'rxjs'
import {GetTasksResponse, Task, TaskStatuses} from 'src/app/todos/tasks/models/task.model'
import {HttpClient, HttpErrorResponse} from '@angular/common/http'
import {environment} from 'src/environments/environment'
import {BaseResponse} from 'src/app/core/model/core.model'

export interface TasksState {
  [todolistId: string]: Task[]
}


export interface UpdateDomainTaskModelType {
  title?: string
  status?: TaskStatuses
}

@Injectable({
  providedIn: 'root'
})
export class TasksService {
  tasksState$ = new BehaviorSubject<TasksState>({})

  constructor(private http: HttpClient) {
  }

  fetchTasks(todolistId: string) {
    this.http.get<GetTasksResponse>(`${environment.baseUrl}/todo-lists/${todolistId}/tasks`)
      .pipe(
        catchError(this.errorHandler.bind(this)),
        map((res) => {
          const state: TasksState = {[todolistId]: res.items}
          return {...this.tasksState$.getValue(), ...state}
        }))
      .subscribe((newState) => {
        this.tasksState$.next(newState)
      })
  }

  deleteTask(todoId: string, taskId: string) {
    this.http.delete<BaseResponse>(`${environment.baseUrl}/todo-lists/${todoId}/tasks/${taskId}`)
      .pipe(
        catchError(this.errorHandler.bind(this)),
        map(() => {
          const necessaryArray = this.tasksState$.getValue()[todoId]
          const arrayWithoutRemovedTask = necessaryArray.filter(task => task.id !== taskId)
          return {...this.tasksState$.getValue(), [todoId]: arrayWithoutRemovedTask}
        }))
      .subscribe((newState) => {
        this.tasksState$.next(newState)
      })
  }

  createTask(todoId: string, title: string) {
    this.http.post<BaseResponse<{ item: Task }>>(`${environment.baseUrl}/todo-lists/${todoId}/tasks`, {title})
      .pipe(
        catchError(this.errorHandler.bind(this)),
        map((res) => {
          const tasks = this.tasksState$.getValue()[todoId]
          return {...this.tasksState$.getValue(), [todoId]: [res.data.item, ...tasks]}
        }))
      .subscribe((newState) => {
        this.tasksState$.next(newState)
      })
  }

  updateTask(todoId: string, taskId: string, changedValue: UpdateDomainTaskModelType) {
    const changedTask = this.tasksState$.getValue()[todoId].find(task => task.id === taskId)
    if (!changedTask) {
      throw new Error('Task must be in the state')
    }
    const apiModel = {
      deadline: changedTask.deadline,
      description: changedTask.description,
      priority: changedTask.priority,
      startDate: changedTask.startDate,
      title: changedTask.title,
      status: changedTask.status,
      ...changedValue
    }
    this.http.put<BaseResponse<{ item: Task }>>(`${environment.baseUrl}/todo-lists/${todoId}/tasks/${taskId}`, apiModel)
      .pipe(
        catchError(this.errorHandler.bind(this)),
        map(() => {
          const tasks = this.tasksState$.getValue()[todoId]
          const index = tasks.findIndex(t => t.id === taskId)
          if (index > -1) {
            tasks[index] = {...tasks[index], ...changedValue}
          }
          return {...this.tasksState$.getValue(), [todoId]: tasks}
        }))
      .subscribe((newState) => {
        this.tasksState$.next(newState)
      })
  }

  getArrayOfTasks(todoId: string) {
    return this.tasksState$.getValue()[todoId]
  }

  private errorHandler(err: HttpErrorResponse) {
    alert(err.message)
    return EMPTY
  }
}
