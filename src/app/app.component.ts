import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { DateAdapter } from '@angular/material';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  language = 'es';
  title = 'ux-exercise';

  constructor(private translate: TranslateService, private adapter: DateAdapter<any>,
    ) {
    // this language will be used as a fallback when a translation isn't found in the current language
    translate.setDefaultLang('es');

    // the lang to use, if the lang isn't available, it will use the current loader to get them
    translate.use('es');
  }

  useLanguage(language: string) {
    this.adapter.setLocale(language);
    this.language = language;
    this.translate.use(language);
  }
}
