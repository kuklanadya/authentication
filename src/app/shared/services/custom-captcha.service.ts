import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class CustomCaptchaService {

    private _currentCaptcha: string[] = [];

    constructor() { }

    get currentCaptcha(): string[] {
        return this._currentCaptcha;
    }

    makeRandom(lengthOfCode: number, possible: string) {
        let text = "";
        for (let i = 0; i < lengthOfCode; i++) {
            text += possible.charAt(Math.floor(Math.random() * possible.length));
        }
        return text;
    }

    generateCaptcha() {
        let possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890"
        const lengthOfCode = 1;

        for (let i = 0; i < 5; i++) {
            let captchaChar = this.makeRandom(lengthOfCode, possible);
            this._currentCaptcha[i] = captchaChar;
        }
    }


    validateCaptcha(captcha): boolean {
        let i = 0
        captcha = captcha.toLocaleUpperCase()
        for (i; i < 5; i++) {
            if (captcha.charAt(i) != this.currentCaptcha[i]) {
                alert('Wrong captcha entered. Try again')
                return false;
            }
        }
        return true;
    }
}
