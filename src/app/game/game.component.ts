import { Component, OnInit } from '@angular/core';
import { Game } from 'src/models/game';
import { MatDialog } from '@angular/material/dialog';
import { DialogAddPlayerComponent } from '../dialog-add-player/dialog-add-player.component';
import { AngularFirestore } from '@angular/fire/firestore';
import { ActivatedRoute, Router } from '@angular/router';
import { EditPlayerComponent } from '../edit-player/edit-player.component';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit {
  game!: Game;
  gameId: string;
  playerImages: any;

  constructor(private route: ActivatedRoute, private firestore: AngularFirestore, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.newGame();
    this.route.params.subscribe((params) => { //gets current route (ActivatedRoute)
      this.gameId = params.id;
      console.log('this is my', params.id);

      this.firestore.collection('games')
        .doc(this.gameId)
        .valueChanges()
        .subscribe((game: any) => {
          console.log('Game update', game)
          this.game.currentPlayer = game.currentPlayer;
          this.game.playedCard = game.playedCard;
          this.game.players = game.players;
          this.playerImages = game.playerImages,
          this.game.stack = game.stack;
          this.game.pickCardAnimation = game.pickCardAnimation;
          this.game.currentCard = game.currentCard;
        });
    });
  }


  newGame() {
    this.game = new Game();
  }


  takeCard() {
    if (!this.game.pickCardAnimation) // only if pickCardAnimation is false the rest of the function is running
      this.game.currentCard = this.game.stack.pop(); //last card from array
    this.game.pickCardAnimation = true;
    console.log('Game is', this.game);

    this.game.currentPlayer++; //counts to the next player
    this.game.currentPlayer = this.game.currentPlayer % this.game.players.length; //divide the index
    this.saveGame(); //wenn Karte weggenommen wird

    setTimeout(() => {
      this.game.playedCard.push(this.game.currentCard!);
      this.game.pickCardAnimation = false;
      this.saveGame(); //wenn Karte zu neuem Stapel gepusht wird
    }, 1200); //only allowed to click on the stack every 1500ms
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogAddPlayerComponent);

    dialogRef.afterClosed().subscribe((name: string) => {
      if (name && name.length > 0) { // check if the variable exist and when it exist than check if the length of the name is bigger than 0
        this.game.players.push(name);
        this.game.playerImages.push('huskey.png');
        this.saveGame();
      }
    });
  }

  saveGame() {
    this.firestore.collection('games')
      .doc(this.gameId)
      .update(this.game.toJson());

  }


  editPlayer(playerid: number) {
    console.log('edit player', playerid);

    const dialogRef = this.dialog.open(EditPlayerComponent);
    dialogRef.afterClosed().subscribe((change: string) => {
      console.log('Received change', change);
      this.game.playerImages[playerid] = change;
      this.saveGame();
    });
  }

}

