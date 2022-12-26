import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../../../../core/services";
import {Router} from "@angular/router";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  form: FormGroup = new FormGroup({
    firstName: new FormControl('', Validators.required),
    lastName: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', Validators.required),
    confirmPassword: new FormControl('', Validators.required)
  })

  constructor(
    private authService: AuthService,
    private router: Router
  ) {
  }

  ngOnInit() {
    this.form.get('password')?.valueChanges.subscribe((pas) => {
      const confirmPas = this.form.get('confirmPassword')?.value;
      if (pas && confirmPas && pas !== confirmPas) {
        this.form.get('confirmPassword')?.setErrors({notMatch: true})
      } else {
        this.form.get('confirmPassword')?.setErrors(null);
      }
    })

    this.form.get('confirmPassword')?.valueChanges.subscribe((pas) => {
      const confirmPas = this.form.get('password')?.value;
      if (pas && confirmPas && pas !== confirmPas) {
        this.form.get('confirmPassword')?.setErrors({notMatch: true})
      } else {
        this.form.get('confirmPassword')?.setErrors(null);
      }
    })
  }

  submit() {
    this.form.markAllAsTouched();
    if (this.form.invalid) return

    console.log(this.form.value)

    this.authService.register(this.form.value).subscribe(res => {
      this.router.navigate(['/auth/login'])
      console.log(res)
    })
  }

}
