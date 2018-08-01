export class Schedule {
    _id?: string;
    name: string;
    email: string;
    phone: {
      mobile: string;
      work: string;
    }
  }