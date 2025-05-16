import { Injectable, Inject } from '@angular/core';
import { TRANSLATIONS } from './translations'; // import our opaque token

@Injectable()
export class TranslateService {
  currentLang: string = 'en';

  public get currentLangSelcted() {
      return this.currentLang;
  }

  // inject our translations
  constructor(@Inject(TRANSLATIONS) private translations: any) {
  }

  public use(lang: string): void {
      // set current language
      localStorage.setItem('curruntLang', lang);
      const clang = localStorage.getItem('curruntLang');
      this.currentLang = clang || 'EN';
  }

  private translate(key: string): string {
      // private perform translation
      const translation = key;
      const clang = localStorage.getItem('curruntLang');
      this.currentLang = clang || 'EN';

      if (this.translations[this.currentLang] && this.translations[this.currentLang][key]) {
          return this.translations[this.currentLang][key];
      }

      return translation;
  }

  public instant(key: string) {
      // call translation
      return this.translate(key);
  }
}
