import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  startGame(): void {
    let nome = prompt('Qual seu nome? ')
    let information = document.querySelector('#player1');
  }
}
