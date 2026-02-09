import { Component } from '@angular/core';
import { Sidebar } from '../sidebar/sidebar';
import { RouterOutlet } from '@angular/router';
import { Header } from '../header/header';

@Component({
  selector: 'app-homepage',
  imports: [Sidebar, Header, RouterOutlet],
  templateUrl: './homepage.html',
  styleUrl: './homepage.scss'
})
export class Homepage {

}
