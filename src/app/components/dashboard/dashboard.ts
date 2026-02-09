import { Component } from '@angular/core';
import { ROUTINEROW } from '../../interfaces/common';
import { CommonModule } from '@angular/common';
import {
  ApexNonAxisChartSeries,
  ApexResponsive,
  ApexChart,
  NgApexchartsModule
} from 'ng-apexcharts';

@Component({
  selector: 'app-dashboard',
  imports: [CommonModule, NgApexchartsModule],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss'
})
export class Dashboard {

  dashboard_details = [
    { title: 'Students', count: 100, img: '/assets/students.png' },
    { title: 'Teachers', count: 30, img: '/assets/teachers.png', },
    { title: 'Present Students', count: 30, img: '/assets/students.png', },
    { title: 'Present Teachers', count: 30, img: '/assets/teachers.png', },
    { title: 'Parents', count: 80, img: '/assets/parents.png', },

  ];
  column = [
    { name: 'Class--Time', key: 'class' },
    { name: '09:30', key: '09:30' },
    { name: '10:00', key: '10:00' },
    { name: '10:30', key: '10:30' },
    { name: '11:00', key: '11:00' },
    { name: '11:30', key: '11:30' },
    { name: '12:00', key: '12:00' },
    { name: '12:30', key: '12:30' },
    { name: '01:00', key: '01:00' },
    { name: '01:30', key: '01:30' },
    { name: '02:00', key: '02:00' },
    { name: '02:30', key: '02:30' },
  ];
  dataSource: ROUTINEROW[] = [
    {
      class_name: 'Standard 01',
      teacher_name: 'Nanny',
      teacher_img: 'assets/teachers.png',
      time_table: {
        '09:30': 'Math',
        '10:00': 'English',
        '10:30': 'Hindi',
        '11:00': 'Sciene',
        '11:30': 'Hindi',
        '12:00': 'Break',
        '12:30': 'Math',
        '01:00': 'English',
        '01:30': 'Math',
        '02:00': 'Sanskrit',
        '02:30': 'Hindi'
      },
    },
    {
      class_name: 'Standard 02',
      teacher_name: 'Nanny',
      teacher_img: 'assets/teachers.png',
      time_table: {
        '09:30': 'Math',
        '10:00': 'English',
        '10:30': 'Hindi',
        '11:00': 'Sciene',
        '11:30': 'Hindi',
        '12:00': 'Break',
        '12:30': 'Math',
        '01:00': 'English',
        '01:30': 'Math',
        '02:00': 'Sanskrit',
        '02:30': 'Hindi'
      },
    },
    {
      class_name: 'Standard 03',
      teacher_name: 'Nanny',
      teacher_img: 'assets/teachers.png',
      time_table: {
        '09:30': 'Math',
        '10:00': 'English',
        '10:30': 'Hindi',
        '11:00': 'Sciene',
        '11:30': 'Hindi',
        '12:00': 'Break',
        '12:30': 'Math',
        '01:00': 'English',
        '01:30': 'Math',
        '02:00': 'Sanskrit',
        '02:30': 'Hindi'
      },
    },
    {
      class_name: 'Standard 04',
      teacher_name: 'Nanny',
      teacher_img: 'assets/teachers.png',
      time_table: {
        '09:30': 'Math',
        '10:00': 'English',
        '10:30': 'Hindi',
        '11:00': 'Sciene',
        '11:30': 'Hindi',
        '12:00': 'Break',
        '12:30': 'Math',
        '01:00': 'English',
        '01:30': 'Math',
        '02:00': 'Sanskrit',
        '02:30': 'Hindi'
      },
    },
    {
      class_name: 'Standard 05',
      teacher_name: 'Nanny',
      teacher_img: 'assets/teachers.png',
      time_table: {
        '09:30': 'Math',
        '10:00': 'English',
        '10:30': 'Hindi',
        '11:00': 'Sciene',
        '11:30': 'Hindi',
        '12:00': 'Break',
        '12:30': 'Math',
        '01:00': 'English',
        '01:30': 'Math',
        '02:00': 'Sanskrit',
        '02:30': 'Hindi'
      },
    },
    {
      class_name: 'Standard 06',
      teacher_name: 'Nanny',
      teacher_img: 'assets/teachers.png',
      time_table: {
        '09:30': 'Math',
        '10:00': 'English',
        '10:30': 'Hindi',
        '11:00': 'Sciene',
        '11:30': 'Hindi',
        '12:00': 'Break',
        '12:30': 'Math',
        '01:00': 'English',
        '01:30': 'Math',
        '02:00': 'Sanskrit',
        '02:30': 'Hindi'
      },
    },
    {
      class_name: 'Standard 07',
      teacher_name: 'Nanny',
      teacher_img: 'assets/teachers.png',
      time_table: {
        '09:30': 'Math',
        '10:00': 'English',
        '10:30': 'Hindi',
        '11:00': 'Sciene',
        '11:30': 'Hindi',
        '12:00': 'Break',
        '12:30': 'Math',
        '01:00': 'English',
        '01:30': 'Math',
        '02:00': 'Sanskrit',
        '02:30': 'Hindi'
      },
    },
    {
      class_name: 'Standard 08',
      teacher_name: 'Nanny',
      teacher_img: 'assets/teachers.png',
      time_table: {
        '09:30': 'Math',
        '10:00': 'English',
        '10:30': 'Hindi',
        '11:00': 'Sciene',
        '11:30': 'Hindi',
        '12:00': 'Break',
        '12:30': 'Math',
        '01:00': 'English',
        '01:30': 'Math',
        '02:00': 'Sanskrit',
        '02:30': 'Hindi'
      },
    }
  ];
  admin_card = {
    name: 'Admin',
    img: '/assets/students.png',
    role: 'admin'
  }
  todayDate = new Date();
  chartOptions = {
    series: [44, 55, 13, 43, 22],
    chart: {
      width: 380,
      type: 'pie' as const
    },
    labels: ['Team A', 'Team B', 'Team C', 'Team D', 'Team E'],
    responsive: [
      {
        breakpoint: 480,
        options: {
          chart: {
            width: 200
          },
          legend: {
            position: 'bottom'
          }
        }
      }
    ]
  };
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
