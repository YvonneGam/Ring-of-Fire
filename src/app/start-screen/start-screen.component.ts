import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFirestore } from '@angular/fire/firestore';
import { Game } from 'src/models/game';

@Component({
  selector: 'app-start-screen',
  templateUrl: './start-screen.component.html',
  styleUrls: ['./start-screen.component.scss']
})
export class StartScreenComponent implements OnInit {
  game: any;

  constructor(private firestore: AngularFirestore, private router: Router) { }

  ngOnInit(): void {
  }


  newGame() {
    let game = new Game();
    this.firestore
      .collection('games')
      .add(game.toJson()) //add json to firesstore  
      .then( (gameInfo:any) => {
        this.router.navigateByUrl('/game/' + gameInfo.id);
        console.log(gameInfo);
        
      });


  }

}
