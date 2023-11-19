import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthLog, Log } from 'src/app/shared/models/log.model';
import { AuthLogsService } from 'src/app/shared/services/auth-logs.service';
import { AuthService } from 'src/app/shared/services/auth.service';
import { CoreValidators } from 'src/app/shared/validators/validators';

@Component({
    selector: 'sign-in',
    templateUrl: './sign-in.component.html',
    encapsulation: ViewEncapsulation.None,
})
export class SignInComponent implements OnInit {

    signInForm!: UntypedFormGroup;
    captchaVerified: boolean = false;

    constructor(
        private router: Router,
        private formBuilder: UntypedFormBuilder,
        private authLogsService: AuthLogsService,
        private authService: AuthService,
    ) { }

    ngOnInit(): void {
        this.signInForm = this.formBuilder.group({
            email: ['', [Validators.required, Validators.email]],
            password: ['', Validators.required],
            passwordConfirm: ['', Validators.required],
            captchaVerified: ['', Validators.required],
        },
            {
                validators: CoreValidators.mustMatch('password', 'passwordConfirm')
            });
    }

    resolveRecaptcha(value: string): void {
        if (value) {
            this.signInForm.get('captchaVerified').setValue(true);
        }
    }

    signIn({ email, password }: { email: string, password: string }): void {
        this.authLogsService.create(new Log(AuthLog.sign_in, email)).subscribe();
        this.authService.signIn(email, password)
            .subscribe((user) => {
                this.authService.user = user;
                this.router.navigate(['users']);
            });
    }
}
