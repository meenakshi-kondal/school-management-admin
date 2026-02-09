import { Component } from '@angular/core';
import { Table } from '../../sharedComponents/table/table';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-teachers',
  imports: [Table, CommonModule],
  templateUrl: './teachers.html',
  styleUrl: './teachers.scss'
})
export class Teachers {
  cardsPerView = 5;
  startIndex = 0;
  selectedClass: string = 'Standard 01';
  teachersDetails = {
    title: 'Teachers',
    filters: [
      {
        label: 'ID',
        type: 'text',
        placeholder: 'Enter Id',
        maxLength: 6
      },
      {
        label: 'Name',
        type: 'text',
        maxLength: 15,
        placeholder: 'Enter Name'
      },
      {
        label: 'Class',
        type: 'text',
        maxLength: 10,
        placeholder: 'Enter class'
      }
    ],
    button: {
      value: 'Add Teacher',
      type: 'primary',
      icon: '<i class="fa-solid fa-plus"></i>'
    },
    column: [
      { name: 'ID', key: 'id' },
      { name: 'Name', key: 'name' },
      { name: 'Gender', key: 'gender' },
      { name: 'Subject', key: 'subject' },
      { name: 'Class', key: 'class' },
      { name: 'Mobile No.', key: 'mobile' },
      { name: 'Email', key: 'email' }
    ],
    action: [{
      name: 'view'
    }],
    path: '', // api path
    pagination: true,
    dataSource: [
      { id: 1, name: 'Hydrogen', gender: 1.0079, subject: 'H', class: '1', mobile: '0987654321', email: 'hello@yopmail.com' },
      { id: 2, name: 'Helium', gender: 4.0026, subject: 'He', class: '1', mobile: '0987654321', email: 'hello@yopmail.com' },
      { id: 3, name: 'Lithium', gender: 6.941, subject: 'Li', class: '1', mobile: '0987654321', email: 'hello@yopmail.com' },
      { id: 4, name: 'Beryllium', gender: 9.0122, subject: 'Be', class: '1', mobile: '0987654321', email: 'hello@yopmail.com' },
      { id: 5, name: 'Boron', gender: 10.811, subject: 'B', class: '1', mobile: '0987654321', email: 'hello@yopmail.com' },
      { id: 6, name: 'Carbon', gender: 12.0107, subject: 'C', class: '1', mobile: '0987654321', email: 'hello@yopmail.com' },
      { id: 7, name: 'Nitrogen', gender: 14.0067, subject: 'N', class: '1', mobile: '0987654321', email: 'hello@yopmail.com' },
      ]
  };
  teachers_classes = [
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

  public visibleCards() {
    return this.teachers_classes.slice(
      this.startIndex,
      this.startIndex + this.cardsPerView
    );
  }

  public next() {
    if (this.startIndex + this.cardsPerView < this.teachers_classes.length) {
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
    this.teachersDetails.title = class_name;
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
