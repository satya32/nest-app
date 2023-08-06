export class ResponseModel {
    message: string;
    code: number;
     data:any[] | any
    constructor(message?: string, code?: number,data?:any[] | any) {
      this.message = message;
      this.code = code;
      this.data =  data;

    }
  }
  