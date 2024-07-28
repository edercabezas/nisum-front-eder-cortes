import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {MatFormField} from "@angular/material/form-field";
import {MatOption, MatSelect} from "@angular/material/select";
import {ApiService} from "../../../core/services/api/api.service";
import {FormsModule} from "@angular/forms";

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    MatFormField,
    MatSelect,
    MatOption,
    FormsModule
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit {

  @Output() option = new EventEmitter<MouseEvent>();


  dataTeam: any;
  optionSelect: number;
  league: number;

  constructor(private api: ApiService) {
    this.optionSelect = 50;
    this.league = 39;
  }

  ngOnInit(): void {
    this.getTeam();

  }

  getTeam(): void {
    this.api?.readTeam(this.league)?.then((res: any) => {
      this.dataTeam = res.response;
    }).catch((error: any) => {

      console.log('error', error)

    }).finally(() => {
    })
  }

  returnSelect(option: any): void {
    this.option.emit(option.value);
    this.optionSelect = option.value;
  }
}
