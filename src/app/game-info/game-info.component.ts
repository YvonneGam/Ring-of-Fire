import { Component, Input, OnChanges, OnInit } from '@angular/core';

@Component({
  selector: 'app-game-info',
  templateUrl: './game-info.component.html',
  styleUrls: ['./game-info.component.scss']
})
export class GameInfoComponent implements OnInit, OnChanges {
  cardAction = [
    { title: 'All', description: 'Everyone has to drink!' },
    { title: 'You', description: 'You drink!' },
    { title: 'Me', description: 'You decide who drink!' },
    { title: 'Category', description: 'Come up with a category. Each player must enumerate one item from the category. If someone dont know anything anymore, this dude have to drink!' },
    { title: 'Thumb master', description: 'The person with the card may place their thumb on the table at any time during the game and the last person to do so has to drink!' },
    { title: 'Math', description: 'The person with the card starts to count with 6 and the next dude have to multiply with 6. The first dude who have a wrong answer has to drink!' },
    { title: '7 is Heaven', description: 'The dude who drew the card must point to the sky (at any chosen time before the next 7 is drawn). The last person who points to the sky must drink' },
    { title: '8 is Mate', description: 'The dude who drew the card picks 2 drinking mates, who must drink every time they´re mate drinks.' },
    { title: '9 is Rhyme', description: 'The dude who drew the card says a word, and you go around the circle rhyming with that word until someone messes up, and has to drink' },
    { title: 'Next', description: 'The dude next to you has to drink!' },
    { title: 'Categories', description: 'The player who drew the card makes a new rule (e.g. must drink with your left hand, or always stand up before drinking) and anyone who breaks the rule at any time throughout the rest of the game has to drink' },
    { title: 'Questionmaster', description: 'You become the question master, and if anybody answers a question asked by you (the player who drew the card), they have to drink. This applies to ANY question.' },
    { title: 'King', description: 'You are the king! And the king has to drink the glass in one go, no matter how full it is' },
  ];

  title = '';
  description = '';


  @Input()
  card!: string | undefined;

  constructor() { }

  ngOnInit(): void {
  }


  ngOnChanges(): void {
    /*   console.log('Current card is:', this.card);
      console.log('Current number is:', this.card?.split('_')[1]); */
    if (this.card) {
      let cardNumber = +this.card?.split('_')[1];
      this.title = this.cardAction[cardNumber! - 1].title;
      this.description = this.cardAction[cardNumber! - 1].description;
    }
  }
}
