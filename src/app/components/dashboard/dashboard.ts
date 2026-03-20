import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  NgApexchartsModule
} from 'ng-apexcharts';


@Component({
  selector: 'app-dashboard',
  imports: [CommonModule, NgApexchartsModule],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss'
})
export class Dashboard implements OnInit {

  dashboard_details = [
    { title: 'Students', count: 100, img: '/assets/students.png' },
    { title: 'Teachers', count: 30, img: '/assets/teachers.png', },
    { title: 'Parents', count: 80, img: '/assets/parents.png', },

  ];

  admin_card = {
    name: 'Admin',
    img: '/assets/students.png',
    role: 'admin'
  }
  todayDate = new Date();
  genderChart = {
    series: [320, 280],
    chart: {
      type: 'donut' as const,
      height: 300
    },
    labels: ['Male', 'Female'],
    dataLabels: {
      enabled: true
    },
    legend: {
      position: 'bottom' as const
    },
    colors: ['#F17404', '#075A6D'],
  };

  attendanceChart = {
    series: [
      {
        name: 'Present Students',
        data: [410, 395, 420, 380, 405, 415, 420] // Replace with real data for last 7 days
      }
    ],
    chart: {
      type: 'area' as const, // 'area' looks better than 'line' for dashboards
      height: 300,
      toolbar: { show: false },
      zoom: { enabled: false }
    },
    colors: ['#e1b44b'], // Using your theme's green
    fill: {
      type: 'gradient',
      gradient: {
        shadeIntensity: 1,
        opacityFrom: 0.7,
        opacityTo: 0.3,
      }
    },
    dataLabels: { enabled: false },
    stroke: {
      curve: 'smooth' as const,
      width: 3
    },
    xaxis: {
      categories: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      axisBorder: { show: false },
    },
    yaxis: {
      min: 0,
      tickAmount: 4
    },
    grid: {
      borderColor: '#f1f1f1',
      strokeDashArray: 4
    }
  };

  feeChartOption = {
    series: [44, 55, 41],
    chart: {
      width: 280,
      type: 'donut' as const
    },
    labels: ['Paid', 'Pending', 'Overdue'],
    fill: {
      type: 'gradient' as const
    },
    dataLabels: {
      enabled: false
    },
    legend: {
      show: true,

      floating: false,
      offsetY: 0,

      formatter: function (val: any, opts: any) {
        return val + ' - ' + opts.w.globals.series[opts.seriesIndex];
      }
    },
    colors: ['#cf4242', '#075A6D', '#e1b44b'],
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
    ],
  };
  currentDate = new Date();
  currentMonth = '';
  currentYear = 0;
  calendarDays: { date: number, hasEvent: boolean, eventName?: string, eventColor?: string }[] = [];
  weekdays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  events = [
    { date: 5, name: 'Science Fair', color: 'red' },
    { date: 12, name: 'Parent-Teacher Meeting', color: 'green' },
    { date: 20, name: 'Sports Day', color: 'blue' },
    { date: 25, name: 'Field Trip', color: 'maroon' }
  ];

  topRankers = [
    { photo: "/assets/parents.png", name: 'Anchal', id: 123, standard: '10th', score: 92.7 },
    { photo: "/assets/parents.png", name: 'Anchal', id: 123, standard: '10th', score: 87.7 },
    { photo: "/assets/parents.png", name: 'Anchal', id: 123, standard: '10th', score: 89.7 },
    { photo: "/assets/parents.png", name: 'Anchal', id: 123, standard: '10th', score: 98.7 }
  ];
  notices = [
    { id: 1, heading: 'Staff Meeting regarding Annual Day', author: 'Principal', time: '2 hours ago' },
    { id: 2, heading: 'Summer Vacation Schedule Released', author: 'Admin Office', time: 'Yesterday' },
    { id: 3, heading: 'New Library Books Available', author: 'Librarian', time: '2 days ago' },
    { id: 2, heading: 'Summer Vacation Schedule Released', author: 'Admin Office', time: 'Yesterday' },
  ];

  ngOnInit() {
    this.generateCalendar();
  }

  prevMonth() {
    this.currentDate.setMonth(this.currentDate.getMonth() - 1);
    this.generateCalendar();
  }

  nextMonth() {
    this.currentDate.setMonth(this.currentDate.getMonth() + 1);
    this.generateCalendar();
  }

  generateCalendar() {
    this.calendarDays = [];

    this.currentMonth = this.currentDate.toLocaleString('default', { month: 'long' });
    this.currentYear = this.currentDate.getFullYear();

    const year = this.currentDate.getFullYear();
    const month = this.currentDate.getMonth();

    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    for (let i = 0; i < firstDay; i++) {
      this.calendarDays.push({ date: 0, hasEvent: false });
    }

    for (let i = 1; i <= daysInMonth; i++) {
      const eventInfo = this.events.find(e => e.date === i);

      this.calendarDays.push({
        date: i,
        hasEvent: !!eventInfo,
        eventName: eventInfo ? eventInfo.name : undefined,
        eventColor: eventInfo ? eventInfo.color : undefined
      });
    }
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
