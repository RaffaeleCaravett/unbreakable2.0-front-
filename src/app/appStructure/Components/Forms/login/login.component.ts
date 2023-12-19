import { Component, EventEmitter, OnInit, Output} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ErrorsDialogComponent } from 'src/app/appStructure/Shared/Components/dialogs/errors-dialog/errors-dialog.component';
import { AuthService } from 'src/app/appStructure/Shared/Services/AuthService/Auth.service';
import { FormsService } from 'src/app/appStructure/Shared/Services/FormsService/forms.service';
import { NavService } from 'src/app/appStructure/Shared/Services/navService/nav.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent implements OnInit{

  userName: string | undefined;
  loginForm!:FormGroup;
  user!:any;
  loggedIn!:any;
  hide:boolean=true
  @Output() location : EventEmitter<string> = new EventEmitter<string>

  constructor(private router:Router, private formsService:FormsService,private dialogRef:MatDialog,
    private authService:AuthService,private navbarService:NavService) { }


  ngOnInit(): void {
this.loginForm= new FormGroup({
  email: new FormControl('',[Validators.required,Validators.pattern(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/)]),
  password: new FormControl('',[Validators.required,Validators.minLength(6)])
})
  }
  getErrorMessage() {
    if (this.loginForm.controls['email'].hasError('required')) {
      return 'You must enter a value';
    }
    return this.loginForm.controls['email'].hasError('email') ? 'Not a valid email' : '';
  }


login(){
  if(this.loginForm.valid){
    this.formsService.loginRequest(
  {
email:this.loginForm.controls['email'].value,
password:this.loginForm.controls['password'].value
  }
  ).subscribe(
    (data: any) => {
      if (data) {
        localStorage.setItem('accessToken',data.tokens.accessToken)
        localStorage.setItem('refreshToken',data.tokens.refreshToken)
        this.authService.setToken(data.tokens.accessToken);
        this.authService.setRefreshToken(data.tokens.refreshToken);
        this.formsService.isUserAuthenticate(true)
        this.formsService.verifyToken(localStorage.getItem('accessToken')!).subscribe((data:any)=>{
          if(data&&data.id){
            this.authService.setToken(localStorage.getItem('accessToken')!)
            this.user= data
            localStorage.setItem('user',JSON.stringify(this.user))
          }
           this.navbarService.sendData('home')
           this.router.navigate(['home'])
        })
      }
    },
    (err) => {
      this.formsService.isUserAuthenticate(false)
    const dialogRef = this.dialogRef.open(ErrorsDialogComponent, {
      width: '300px',
      data: err.error.message
    });

    dialogRef.afterClosed().subscribe(result => {
    });  })
  }

}

  goToForms(params:string){
this.location.emit(params)
}

}
