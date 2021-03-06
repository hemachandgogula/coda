import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonService } from '../common.service';

@Component({
  selector: 'app-gamescreen',
  templateUrl: './gamescreen.component.html',
  styleUrls: ['./gamescreen.component.css']
})
export class GamescreenComponent implements OnInit {
  list: any;
  random: number;

  constructor(private router: Router, private common: CommonService) { }

  ngOnInit(): void {
    this.random = Math.floor(Math.random() * 10) + 1;
    this.list = [];
    this.list = this.common.getUserList().length > 0 ? this.common.getUserList() : [];
    this.list.forEach(element => {
      element.fate = this.random == element.Bet ? true : false;
      if (element.fate) {
        element.Price = 2 * element.Price;
      }
    });
    console.log(this.list);
  }
  backToDashboard() {
    this.router.navigate(['/dashboard']);
  }

}
