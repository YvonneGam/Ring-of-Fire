import { Component, OnInit } from '@angular/core';
import { Game } from 'src/models/game';
import { MatDialog } from '@angular/material/dialog';
import { DialogAddPlayerComponent } from '../dialog-add-player/dialog-add-player.component';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit {
  pickCardAnimation = false;
  currentCard: string | undefined = ''; //shows the name of the current card from the stack (lying on top)
  game!: Game;

  constructor(public dialog: MatDialog) { }

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

    this.game.currentPlayer++; //counts to the next player
    this.game.currentPlayer = this.game.currentPlayer % this.game.players.length; //divide the index

    setTimeout(() => {
      this.game.playedCard.push(this.currentCard!);
      this.pickCardAnimation = false;
    }, 1200); //only allowed to click on the stack every 1500ms
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogAddPlayerComponent);

    dialogRef.afterClosed().subscribe((name: string) => {
      if(name && name.length > 0 ) { // check if the variable exist and when it exist than check if the length of the name is bigger than 0
      this.game.players.push(name);
    }
    });
  }

}

