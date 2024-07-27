import {Component, OnInit} from '@angular/core';
import {HeaderComponent} from "../../shared/components/header/header.component";
import {ShowInfoComponent} from "../../shared/components/show-info/show-info.component";


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    HeaderComponent,
    ShowInfoComponent

  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export default class HomeComponent implements OnInit {

  optionTeam: number;

  constructor() {
    this.optionTeam = 50;

  }

  ngOnInit(): void {
  }

  public optionSelectHeader(data: any): void {
    this.optionTeam = data;
  }
}

