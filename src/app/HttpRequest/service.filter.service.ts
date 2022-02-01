import { EventEmitter, Injectable, Output } from "@angular/core";

@Injectable()
export class FilterService {
  filter = '';
  @Output() change: EventEmitter<string> = new EventEmitter();
  toggle(filter: string) {
    this.filter = filter;
    this.change.emit(this.filter);
  }
}