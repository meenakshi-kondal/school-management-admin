import { ChangeDetectorRef, Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { TABLE } from '../../interfaces/common';
import { Button } from '../button/button';
import { NoData } from '../no-data/no-data';

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [MatTableModule, MatPaginatorModule, Button, NoData, MatSlideToggleModule],
  templateUrl: './table.html',
  styleUrl: './table.scss'
})
export class Table implements OnChanges {

  @Input() totalLength: number = 0;
  @Output() paginationChange = new EventEmitter<PageEvent>();
  @Output() toggleChange = new EventEmitter<any>();
  @Output() view = new EventEmitter<any>();
  @Output() edit = new EventEmitter<any>();

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
  };

  displayedColumns: string[] = [];
  dataSource: any = new MatTableDataSource<any>([]);

  constructor(private cdr: ChangeDetectorRef) {}

  ngOnChanges(changes: SimpleChanges) {
    if (changes['tableContent'] || changes['totalLength']) {
      this.updateTable();
    }
  }

  private updateTable() {
    if (this.tableContent && this.tableContent.column && this.tableContent.column.length) {
      this.displayedColumns = this.tableContent.column.map((col: any) => col.key);
      this.dataSource = new MatTableDataSource<any>(this.tableContent.dataSource || []);
      
      if (this.tableContent.action?.length) {
        if (!this.displayedColumns.includes('action')) {
          this.displayedColumns.push('action');
        }
      }
      
      this.cdr.detectChanges();
    }
  }

  public handleButtonClick(event: any) {
    // Logic for button click
  }

  public onView(row: any) {
    this.view.emit(row);
  }
 
  public onEdit(row: any) {
    this.edit.emit(row);
  }

  public onPageChange(event: PageEvent) {
    this.paginationChange.emit(event);
  }

  public onToggle(row: any, key: string, event: any) {
    this.toggleChange.emit({ row, key, value: event.checked });
  }
}
