import { Component, OnInit } from '@angular/core';
import { Game } from 'src/models/game';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit {
  pickCardAnimation = false;
  currentCard: string | undefined = ''; //shows the name of the current card from the stack (lying on top)
  game!: Game;

  constructor() { }

  ngOnInit(): void {
    this.newGame();
  }


  newGame() {
    this.game = new Game();
    console.log(this.game);
  }


  takeCard() {
    if (!this.pickCardAnimation) // only if pickCardAnimation is false the rest of the function is running
      this.currentCard = this.game.stack.pop(); //last card from array
    this.pickCardAnimation = true;
    console.log('Game is', this.game);


    setTimeout(() => {
      this.game.playedCard.push(this.currentCard!);
      this.pickCardAnimation = false;
    }, 1200); //only allowed to click on the stack every 1500ms
  }

}
