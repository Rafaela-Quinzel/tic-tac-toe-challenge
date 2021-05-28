import { Component, OnInit } from '@angular/core';
import { MarvelService } from '../shared/service/marvel.service'


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})



export class HomeComponent implements OnInit {

  isEnabled: boolean;
  chooseFirstPlayer: number;
  namePlayer1: string;
  player1: string;
  namePlayer2: string;
  player2: string;
  checkShift: boolean;
  combinations: number[][];
  cells: NodeListOf<Element>;
  shift: string;
  listGetCharacters: any[];
  spinner: boolean;
  firstImagePath: string;
  firstCharacter: any;
  secondImagePath: string;
  secondCharacter: any;
  namesList: string[];
  names: any[];

  constructor(
    public marvelService: MarvelService
  ) {
    this.namePlayer1 = "";
    this.namePlayer2 = "";
    this.player1 = 'X';
    this.player2 = 'O';
    this.namesList = [""]
    this.isEnabled = false;
    this.chooseFirstPlayer = Math.random() * 2;
    this.checkShift = true;
    this.cells = document.querySelectorAll(".cell");
    this.shift = this.checkShift ? this.player1 : this.player2
    this.combinations = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6]
    ];

    this.listGetCharacters = [];
    this.names = [];
    this.spinner = false;
    this.firstImagePath = ""
    this.secondImagePath = ""
    this.secondCharacter = ""

  }

  ngOnInit(): void {
  }


  startGame(): void {
    this.openModalSelect()
    this.createPlayerOne()
    this.createPlayerTwo()
    this.getCharacters()
    this.choosePlayer()
  }

  openModalSelect() {
    const showModal = (<HTMLInputElement>document.querySelector(".background-modal"));
    showModal.style.display = "flex";
  }


  getCharacters() {
    this.marvelService.getCharacters().subscribe(
      response => {
        const responseList = response.data.results;
        this.listGetCharacters = responseList;
        this.spinner = false;
      },
      error => {
        console.log(error);
      }
    );
  }

  selectCharacter() {

  }

  createPlayerOne() {
    //let namePlayer1 = prompt('Nome do jogador 1? ')
    const player1 = document.querySelector('#player1');
    const p1 = document.createElement("p");
    //p1.textContent = namePlayer1

    player1?.appendChild(p1)
  }

  createPlayerTwo() {
    //let namePlayer2 = prompt('Nome do jogador 2? ')
    const player2 = document.querySelector('#player2');
    const p2 = document.createElement("p");
    //p2.textContent = namePlayer2

    player2?.appendChild(p2)
  }

  choosePlayer() {
    if (Math.floor(this.chooseFirstPlayer) === 1) {
      alert('Jogador 1 começa!');
    } else {
      alert('Jogador 2 começa!');
    }
  }


  chooseCell(id: string) {
    const cell = document.getElementById(id);
    let shift = this.checkShift ? this.player1 : this.player2
    const p = document.createElement("p")
    p.textContent = shift
    p.classList.add(shift)
    this.checkShift = !this.checkShift

    cell?.appendChild(p)
  }

  checkWinner(shift: string) {
    const winner = this.combinations.some((comb) => {
      return comb.every((index) => {
        return this.cells[index].classList.contains(this.shift)
      })
    })

    if (winner) {
      this.gameOver(shift)
    } else if (this.checkTie()) {
      this.gameOver(null)
    } else {
      this.checkShift = !this.checkShift
    }
  }

  gameOver(winner: string | null) {
    if (winner) {
      console.log(`vencedor ${winner}`)
    } else {
      console.log("Empatou!")
    }
  }

  checkTie() {
    let x = 0;
    let o = 0;

    for (let index in this.cells) {
      if (this.cells[index].classList.contains(this.player1)) {
        x++;
      }

      if (this.cells[index].classList.contains(this.player2)) {
        o++;
      }
    }

    return x + o === 9 ? true : false
  }

  disableCell() {
    this.isEnabled = !this.isEnabled;
  }

}

