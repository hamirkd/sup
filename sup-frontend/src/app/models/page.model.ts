export class Page<T> {
    count: number;
    next: string;
    previous: string;
    content: Array<T>;
    totalPages:number;
    totalElements:number;
    number:number;
    first:boolean=false;
    last:boolean=false;
    size:number;
  }