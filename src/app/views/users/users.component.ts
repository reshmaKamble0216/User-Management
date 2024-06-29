import { Component, ViewChild, OnInit, TemplateRef, } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { AddUserComponent } from '../add-user/add-user/add-user.component';
import { MatDialog } from '@angular/material/dialog';
import { User } from '../user.model';
import { MatSort } from '@angular/material/sort';
@Component( {
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: [ './users.component.css' ],
} )
export class UsersComponent implements OnInit
{
  pageSizes = [ 3, 5, 7 ];
  displayedColumns: string[] = [ 'role', 'name', 'email', 'action' ];
  //UsersData: User[] = []
  UsersData: User[] = [
    { role: 'Org admin', name: 'A', email: 'a@gmail.com' },
    { role: 'Org user', name: 'B', email: 'b@gmail.com' },
    { role: 'Org user', name: 'C', email: 'c@gmail.com' },
    { role: 'Org admin', name: 'D', email: 'd@gmail.com' },
    { role: 'Org user', name: 'E', email: 'e@gmail.com' },
    { role: 'Org admin', name: 'F', email: 'F@gmail.com' },
    { role: 'Org user', name: 'G', email: 'g@gmail.com' },
    { role: 'Org user', name: 'H', email: 'h@gmail.com' },
    { role: 'Org admin', name: 'I', email: 'i@gmail.com' },
    { role: 'Org user', name: 'J', email: 'j@gmail.com' },
  ];


  dataSource = new MatTableDataSource( this.UsersData );
  deleteUserData: any;
  indexData: any;

  constructor ( public dialog: MatDialog,
    public matTableModule: MatTableModule, ) { }

  @ViewChild( MatPaginator ) paginator !: MatPaginator;
  @ViewChild( MatSort ) sort !: MatSort;
  ngAfterViewInit ()
  {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  ngOnInit (): void
  {
    this.UsersData = []
  }
  // code for find index for delete and edit user
  findIndex ( data: any )
  {
    this.indexData = []
    this.dataSource.filteredData.forEach( ( element: any, index: number ) =>
    {
      if ( data.name === element.name || data.email === element.email )
      {
        this.indexData = index;
      }
    } )
  }
  openAddUserForm ( data: any = {}, isNew?: any ): void
  {

    this.findIndex( data )
    const title = isNew ? 'ADD' : 'UPDATE';
    const dialogRef = this.dialog.open( AddUserComponent, {
      width: '350px',
      data: {
        title: title, payload: data, isNew: isNew
      }
    } );
    dialogRef.afterClosed().subscribe( userData =>
    {
      if ( isNew )
      {
        this.addUsers( userData );
      } else
      {
        this.dataSource.filteredData.splice( this.indexData, 1 );
        this.dataSource.filteredData.splice( this.indexData, 0, userData );
        this.UsersData = this.dataSource.filteredData;
        this.dataSource = new MatTableDataSource( this.UsersData );
        this.ngAfterViewInit();
      }
    } );
  }
  addUsers ( user: any )
  {
    let users: any[] = []
    if ( localStorage.getItem( 'Users' ) )
    {
      users = JSON.parse( localStorage.getItem( 'Users' )! );
      users = [ user, ...users ]
    } else
    {
      users = [ user ];
    }
    localStorage.setItem( 'Users', JSON.stringify( users ) );
    this.dataSource.filteredData.push( user );
    this.ngAfterViewInit();
  }

  deleteUser ( template: TemplateRef<any>, user: any )
  {
    this.findIndex( user )
    this.deleteUserData = user;
    this.dialog.open( template, {
      width: '20%',
      disableClose: true
    } );

  }
  submitDeleteUser ()
  {
    this.dataSource.filteredData.splice( this.indexData, 1 );
    this.UsersData = this.dataSource.filteredData;
    this.dataSource = new MatTableDataSource( this.UsersData );
    this.ngAfterViewInit();
    this.dialog.closeAll();
  }

  // search column data code
  applyFilter ( event: Event )
  {
    const filterValue = ( event.target as HTMLInputElement ).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if ( this.dataSource.paginator )
    {
      this.dataSource.paginator.firstPage();
    }
  }
}
