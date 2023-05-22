import { Component, OnInit, ViewChild } from '@angular/core';
import { DataBindingDirective } from '@progress/kendo-angular-grid';
import { process } from '@progress/kendo-data-query';
import { DataManagementService } from 'src/app/Services/DataManagement/data-management.service';
import { Users } from 'src/app/Models/UserData';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
@Component({
  selector: 'app-list-user',
  templateUrl: './list-user.component.html',
  styleUrls: ['./list-user.component.css'],
})
export class ListUserComponent implements OnInit {
  constructor(
    public dataService: DataManagementService,
    private router: Router
  ) {}

  public gridData: Users[];
  userList$ : Observable<Users[]>
  userList : Users[];

  @ViewChild(DataBindingDirective) dataBinding: DataBindingDirective;
  public gridView: unknown[];

  public mySelection: string[] = [];

  ngOnInit(){
    this.gridData = [];
    console.log("list-user-init")

    this.userList$ = this.dataService.findAllUser();
    
    this.userList$.subscribe((data)=>  {
      console.log("List of users",this)
      data.forEach((element: any) => {
        this.gridData.push(element)
      });
      this.gridView = this.gridData;
      console.log("grid data",this.gridData);
      //this.gridData = data
    });


  }


  public onFilter(input: Event): void {
    const inputValue = (input.target as HTMLInputElement).value;
    this.gridView = process(this.gridData, {
      filter: {
        logic: 'or',
        filters: [
          {
            field: 'userName',
            operator: 'contains',
            value: inputValue,
          },
          {
            field: 'email',
            operator: 'contains',
            value: inputValue,
          },
          {
            field: 'skills',
            operator: 'contains',
            value: inputValue,
          },
          {
            field: 'contact',
            operator: 'contains',
            value: inputValue,
          },
        ],
      },
    }).data;

    this.dataBinding.skip = 0;
  }

  editUser(data: any) {
    console.log(data);
    this.router.navigate(['admin/adminDash/editUser'], {
      state: { email: data.email },
    });
  }

  exportAsExcel(data:any){
    console.log("Export as excel")
  }
}
