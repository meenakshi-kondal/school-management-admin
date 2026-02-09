import { Component } from '@angular/core';

@Component({
  selector: 'app-classes',
  imports: [],
  templateUrl: './classes.html',
  styleUrl: './classes.scss'
})
export class Classes {

  class_info = [
    {
      name: 'Standard One',
      count: 100,
      students: [
        { name: 'mani', img: '/assets/students.png' },
        { name: 'nani', img: '/assets/parents.png' },
        { name: 'nami', img: '/assets/teachers.png' }
      ]
    },
    {
      name: 'Standard Two',
      count: 80,
      students: [
        { name: 'mani', img: '/assets/students.png' },
        { name: 'nami', img: '/assets/teachers.png' }
      ]
    },
    {
      name: 'Standard Three',
      count: 30,
      students: [
        { name: 'nani', img: '/assets/parents.png' },
        { name: 'mani', img: '/assets/students.png' }
      ]
    },
    {
      name: 'Standard Four',
      count: 100,
      students: [{ name: 'mani', img: '/assets/students.png' }]
    },
    {
      name: 'Standard Five',
      count: 80,
      students: [
        { name: 'nami', img: '/assets/teachers.png' },
        { name: 'mani', img: '/assets/students.png' }
      ]
    },
    {
      name: 'Standard Six',
      count: 30,
      students: [
        { name: 'nani', img: '/assets/parents.png' },
        { name: 'nami', img: '/assets/teachers.png' },
        { name: 'mani', img: '/assets/students.png' }
      ]
    },
    {
      name: 'Standard Seven',
      count: 30,
      students: [
        { name: 'nani', img: '/assets/parents.png' },
        { name: 'mani', img: '/assets/students.png' }
      ]
    },
    {
      name: 'Standard Eight',
      count: 100,
      students: [{ name: 'mani', img: '/assets/students.png' }]
    }
  ];

  public getCardColor(index: number) {
    const cardColor = [
      '#3e3eb5f2',
      '#cf4242',
      '#e1b44b',
      '#075A6D',
      '#F17404',
      '#695845',
    ];
    return cardColor[index % cardColor.length];
  }
}
