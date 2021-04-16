import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-edit-player',
  templateUrl: './edit-player.component.html',
  styleUrls: ['./edit-player.component.scss']
})
export class EditPlayerComponent implements OnInit {
allProfilePictures = ['akita.png', 'beagle.png', 'chihuahua.png', 'dachshund.png', 'dalmatiner.png', 'huskey.png', 'ka.png', 'pommeranian.png', 'schnauzer.png', 'shitsu.png' ]
  constructor() { }

  ngOnInit(): void {
  }

}
