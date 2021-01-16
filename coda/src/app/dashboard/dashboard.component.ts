import { HttpClient } from '@angular/common/http';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { CommonService } from '../common.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = ['Select', 'Name', 'Avatar', 'Bet', 'Price'];
  userList: any;
  dataSource: any;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  dummylist: any;
  sidebarlist: any;

  constructor(private http: HttpClient, private router: Router, private common:CommonService) { 
    this.common.clearList();
  }

  ngOnInit(): void {
    this.userList = [];
    this.dummylist = [];
    this.sidebarlist = [];
    this.http.get('https://s3-ap-southeast-1.amazonaws.com/he-public-data/bets7747a43.json').subscribe((resp: any) => {
      console.log(resp);
      resp.forEach(e => {
        e.select = false;
      });
      this.dummylist = resp;
      this.userList = new MatTableDataSource<any>(resp);
    });
  }

  ngAfterViewInit() {
    // this.dataSource.paginator = this.paginator;
  }
  selectChanged(event, e) {
    console.log(e);
    console.log(event.target.checked);
    e.select = event.target.checked;
    if (event.target.checked) {
      this.sidebarlist.push(e);
    } else {
      let i;
      this.sidebarlist.forEach((element, index) => {
        if (element.Name == e.Name) {
          i = index;
          return;
        }
      });
      this.sidebarlist.splice(i, 1);
    }
    console.log(this.sidebarlist);
  }
  startGame() {
    this.router.navigate(['/gamescreen']);
    this.common.setUserList(this.sidebarlist);
  }

}
