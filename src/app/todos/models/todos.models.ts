export interface TodoApi {
  addedDate: string
  id: string
  order: number
  title: string
}

export interface TodoDomain extends TodoApi {
  filter: FilterValuesType
  entityStatus: RequestStatusType
}
export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'
export type FilterValuesType = 'all' | 'active' | 'completed'
