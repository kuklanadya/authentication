import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { reauthenticateWithCredential } from 'firebase/auth';
import { Log, OperationLog } from 'src/app/shared/models/log.model';
import { User } from 'src/app/shared/models/user.model';
import { AuthService } from 'src/app/shared/services/auth.service';
import { CustomCaptchaService } from 'src/app/shared/services/custom-captcha.service';
import { OperationLogsService } from 'src/app/shared/services/operation-logs.service';
import { CoreValidators } from 'src/app/shared/validators/validators';

@Component({
    selector: 'change-password',
    templateUrl: './change-password.component.html',
})
export class ChangePasswordComponent implements OnInit {

    authForm: UntypedFormGroup;
    currentUser: User;
    currentCaptcha: string[];

    constructor(
        private cdr: ChangeDetectorRef,
        private formBuilder: UntypedFormBuilder,
        private customCaptchaService: CustomCaptchaService,
        private operationLogsService: OperationLogsService,
        private authService: AuthService,
    ) { }

    ngOnInit(): void {
        this.customCaptchaService.generateCaptcha();
        this.currentCaptcha = this.customCaptchaService.currentCaptcha;

        this.authForm = this.formBuilder.group({
            oldPassword: ['', Validators.required],
            newPassword: ['', [Validators.required, Validators.minLength(6)]],
            newPasswordConfirm: ['', Validators.required],
            captcha: ['', Validators.required],
        },
            {
                validators: CoreValidators.mustMatch('newPassword', 'newPasswordConfirm')
            });

        this.getCurrentUser();
    }

    getCurrentUser(): void {
        this.authService.getCurrentUser()
            .subscribe((user) => {
                this.currentUser = user;
                if (user.password_restricted) {
                    this.authForm.get('newPassword').setValidators(CoreValidators.passwordValidator(this.authForm.get('newPassword')))
                    this.authForm.updateValueAndValidity();
                }
                this.cdr.detectChanges();
            });
    }

    changePassword(content): void {
        const enteredCaptcha = this.authForm.get('captcha').value;
        if (!this.customCaptchaService.validateCaptcha(enteredCaptcha)) {
            return;
        }
        this.operationLogsService.create(new Log(OperationLog.change_password, this.currentUser?.email));
        if (content.oldPassword !== this.currentUser.password) {
            window.alert('Old password is wrong. Please, try again');
            this.authForm.get('oldPassword').setValue('');
            return;
        }

        this.authService.changePassword(this.currentUser, content.newPassword)
            .subscribe(({ success, message }) => {
                window.alert(message);
            });
    }
}
