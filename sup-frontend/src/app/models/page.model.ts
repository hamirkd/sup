export class Page<T> {
    count: number;      // total number of items
    next: string;       // URL of the next page
    previous: string;   // URL of the previous page
    content: Array<T>;  // items for the current page
    totalPages:number;
    totalElements:number;
    number:number;
    first:boolean;
    last:boolean;
    size:number;
    pages():any[]{
      let n=[];
      if(this.number<3)
      for(let i=this.number/3;i<=this.number+3;i++)
      n.push(i);
      else if(this.number+3!=this.totalElements) 
      for(let i=0;i<=this.totalPages;i++)
      n.push(i);
      return n;
    }
  }