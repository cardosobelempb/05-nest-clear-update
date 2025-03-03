export namespace Pagination {
  export interface Params {
    size?: number
    page: number
    sort?: [],
    direction?: 'asc'| 'desc'
    linesPerPage?: number
    orderBy?: number
  }
}
