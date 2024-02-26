import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrl: './search.component.css',
})
export class SearchComponent {
  @Output() handleInput: EventEmitter<string> = new EventEmitter<string>();
  searchWord: string = "";

  search() {
    this.handleInput.emit(this.searchWord);
  }
}
