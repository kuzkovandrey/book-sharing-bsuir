import { FormControl } from '@angular/forms';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-search-bar, [appSearchBar]',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss'],
})
export class SearchBarComponent implements OnInit {
  searchControl = new FormControl('');

  readonly size = 'm';

  @Output() search = new EventEmitter<string>();

  constructor() {}

  ngOnInit(): void {}

  onClickSearchButton() {
    this.search.emit(this.searchControl.value);
  }
}
