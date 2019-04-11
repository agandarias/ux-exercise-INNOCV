import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit {

  @Output() useLanguage = new EventEmitter();
  @Input() language = '';

  constructor() { }

  ngOnInit() {
  }

  changeLanguage(language: string) {
    this.useLanguage.emit(language);
  }

}
