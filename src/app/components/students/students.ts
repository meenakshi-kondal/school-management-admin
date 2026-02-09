import { Component } from '@angular/core';
import { Table } from '../../sharedComponents/table/table';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-students',
  imports: [Table, CommonModule],
  templateUrl: './students.html',
  styleUrl: './students.scss'
})
export class Students {
  cardsPerView = 5;
  startIndex = 0;
  selectedClass: string = 'Standard 01';
  students_classes = [
    {
      class_name: 'Standard 01',
      count: 20
    },
    {
      class_name: 'Standard 02',
      count: 20
    },
    {
      class_name: 'Standard 03',
      count: 20
    },
    {
      class_name: 'Standard 04',
      count: 20
    },
    {
      class_name: 'Standard 05',
      count: 20
    },
    {
      class_name: 'Standard 06',
      count: 20
    },
    {
      class_name: 'Standard 07',
      count: 20
    },
    {
      class_name: 'Standard 08',
      count: 20
    },
    {
      class_name: 'Standard 09',
      count: 20
    },
    {
      class_name: 'Standard 10',
      count: 20
    },
    {
      class_name: 'Standard 11',
      count: 20
    },
    {
      class_name: 'Standard 12',
      count: 20
    }
  ];
  studentsDetails = {
    title: 'Standard 01',
    column: [
      { name: 'ID', key: 'id' },
      { name: 'Name', key: 'name' },
      { name: 'Gender', key: 'gender' },
      { name: 'Status', key: 'status' }
    ],
    action: [{
      name: 'view'
    }],
    path: '',
    dataSource: [
      { id: 1, name: 'Hydrogen', gender: 'Female', status: 'Present' },
      { id: 2, name: 'Helium', gender: 'Female', status: 'Absent' },
      { id: 3, name: 'Lithium', gender: 'Male', status: 'Leave' },
      { id: 4, name: 'Beryllium', gender: 'Male', status: 'Present' },
      { id: 5, name: 'Boron', gender: 'Female', status: 'Present' },
      { id: 6, name: 'Carbon', gender: 'Male', status: 'Present' },
      { id: 7, name: 'Nitrogen', gender: 'Male', status: 'Present' },
      { id: 8, name: 'Oxygen', gender: 'Female', status: 'Present' },
    ],
    pagination:true
  };

  public visibleCards() {
    return this.students_classes.slice(
      this.startIndex,
      this.startIndex + this.cardsPerView
    );
  }

  public next() {
    if (this.startIndex + this.cardsPerView < this.students_classes.length) {
      this.startIndex++;
    }
  }

  public prev() {
    if (this.startIndex > 0) {
      this.startIndex--;
    }
  }

  public onCardClick(class_name: string) {
    this.selectedClass = class_name;
    this.studentsDetails.title = class_name;
  }


  public getCardColor(index: number) {
    const cardColor = [
      '#3e3eb5f2',
      '#cf4242',
      '#e1b44b',
      '#075A6D',
      '#F17404',
      '#695845',
      '#DE76D2'
    ];
    return cardColor[index % cardColor.length];
  }
}
