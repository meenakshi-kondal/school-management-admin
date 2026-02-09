import { Component, Input } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { TABLE } from '../../interfaces/common';
import { Button } from '../button/button';

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [MatTableModule, MatPaginatorModule, Button],
  templateUrl: './table.html',
  styleUrl: './table.scss'
})
export class Table {

  @Input() tableContent: TABLE = {
    title: '',
    filters: [],
    button: {
      icon: '',
      value: '',
      type: ''
    },
    action: [],
    column: [],
    path: '', // api path
    pagination: false,
    dataSource: []

  }
  displayedColumns: string[] = [];
  dataSource: any = [];

  ngOnChanges() {

    if (this.tableContent.column.length) {

      this.displayedColumns = this.tableContent.column.map(col => col.key);
      this.dataSource = this.tableContent.dataSource;
      if (this.tableContent.action?.length) {
        this.displayedColumns.push('action');
      }
      // call api by using path
      // suppose api provide data in variable datasource

    }
  }

  public handleButtonClick(event: any) {

  }

  public onView(row: {}) {
    console.log(row)
  }

}
