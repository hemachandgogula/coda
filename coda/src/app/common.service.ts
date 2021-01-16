import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CommonService {
  private userlist: any;
  constructor() {
    this.clearList();
  }
  setUserList(user) {
    this.userlist = user;
  }
  getUserList(): any {
    return this.userlist;
  }
  clearList(){
    this.userlist = [];
  }
}
