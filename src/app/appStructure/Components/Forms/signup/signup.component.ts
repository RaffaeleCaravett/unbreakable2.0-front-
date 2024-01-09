import { StepperSelectionEvent } from '@angular/cdk/stepper';
import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ErrorsDialogComponent } from 'src/app/appStructure/Shared/Components/dialogs/errors-dialog/errors-dialog.component';
import { AuthService } from 'src/app/appStructure/Shared/Services/AuthService/Auth.service';
import { CitiesAndNationsService } from 'src/app/appStructure/Shared/Services/ContinentsAndNations/continents-and-nations.service';
import { FormsService } from 'src/app/appStructure/Shared/Services/FormsService/forms.service';
import { NavService } from 'src/app/appStructure/Shared/Services/navService/nav.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent implements OnInit {
  signupForm!: FormGroup;
  isLinear:boolean=true
  formSectionCount!: number;
  formSectionCount1!: number;
  showErrors:boolean=false
  isThereNationality:boolean=false;
  nationsArray:any[]=[]
  nationsFlagsArray:any[]=[]
  continentsArray:any[]=[]
  personalInfo!: FormGroup;
  locationInfo!: FormGroup;
  accountInfo!: FormGroup;
  hide:boolean=true
  hide1:boolean=true
  profile_picture!:string
  imageForm!:FormGroup
  user!:any;
  @Output() location : EventEmitter<string> = new EventEmitter<string>
  constructor(private signUpService: FormsService,private continentsAndNations: CitiesAndNationsService,
private router:Router,private _formBuilder: FormBuilder,
private dialogRef:MatDialog, private authService:AuthService,private navbarService:NavService) {
  }


  ngOnInit(): void {
    this.profile_picture='../../../../../assets/signup/default_profile_picture.jpg'
    // this.emojisService.getAll().subscribe((data:any)=>{
    // })
    // this.emojisService.search('sm').subscribe((data:any)=>{
    // })


this.continentsAndNations.getAllContinents().subscribe((data:any)=>{
  if(data && data.content){
    this.continentsArray=data.content;
  }
})
      this.personalInfo= this._formBuilder.group({
        name: ['', Validators.required],
        surname: ['', Validators.required],
        age: ['',[Validators.required, Validators.min(12)]],
      }),
      this.locationInfo= this._formBuilder.group({
        continent: ['', Validators.required],
        nation: ['', Validators.required],
      })
      this.accountInfo= this._formBuilder.group({
        email: ['', [Validators.required,Validators.pattern(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/)]],
        password: ['', [Validators.required,Validators.minLength(6)]],
        ripetiPassword: ['',[Validators.required,Validators.minLength(6)]],
      })
      this.locationInfo.controls['continent'].valueChanges.subscribe((newValue) => {
        this.callNationsByContinentId(newValue);
      });

      this.imageForm= new FormGroup({
        img_profile:new FormControl('',Validators.required)
      })
  }

  signupRequest() {
    if (this.accountInfo.controls['password'].value==this.accountInfo.controls['ripetiPassword'].value) {
      this.signUpService
        .signupRequest({
          email: String(this.accountInfo.controls['email'].value),
          continente: String(this.locationInfo.controls['continent'].value),
          età: Number(this.personalInfo.controls['age'].value),
          cognome: String(this.personalInfo.controls['surname'].value),
          nazione: String(this.locationInfo.controls['nation'].value),
          nome: String(this.personalInfo.controls['name'].value),
          password: String(this.accountInfo.controls['password'].value),
          role: 'USER',
        })
        .subscribe(
          (data: any) => {
            localStorage.setItem('img_profilo',this.selectedImage||'')
              this.signUpService.loginRequest(
                {
                  email: String(this.accountInfo.controls['email'].value),
                  password: String(this.accountInfo.controls['password'].value),
                }
              ).subscribe((data:any)=>{
                if (data) {


                  localStorage.setItem('accessToken',data.tokens.accessToken)
                  localStorage.setItem('refreshToken',data.tokens.refreshToken)
                  this.authService.setToken(data.tokens.accessToken);
                  this.authService.setRefreshToken(data.tokens.refreshToken);
                  this.signUpService.isUserAuthenticate(true)
                  this.signUpService.verifyToken(localStorage.getItem('accessToken')!).subscribe((data:any)=>{
                    if(data&&data.id){
                       this.signUpService.uploadProfileImage(this.selectedImage,data.id).subscribe(data=>{})
                      setTimeout(()=>{
                         this.authService.setToken(localStorage.getItem('accessToken')!)
                      this.user= data
                      localStorage.setItem('user',JSON.stringify(this.user))
                     this.navbarService.sendData('home')
                     this.router.navigate(['/home'])
                    },2000)
                    }
                  })

                }
                })
          },
          (error) => {
            this.signUpService.isUserAuthenticate(false)
            const dialogRef = this.dialogRef.open(ErrorsDialogComponent, {
              width: '300px',
              data: error.error.message
            });

            dialogRef.afterClosed().subscribe(result => {
            });
          }
        );
    }else{
      const dialogRef = this.dialogRef.open(ErrorsDialogComponent, {
        width: '300px',
        data: 'Le password devono coincidere'
      });

      dialogRef.afterClosed().subscribe(result => {
      });
    }
  }

callNationsByContinentId(continentId:number){
if(continentId){
  this.continentsAndNations.getNationsByContinentId(continentId).subscribe((data:any)=>{
   this.nationsArray=[]
  this.nationsArray=data
})
}else{
  this.nationsArray=[]
}
}

goToForms(params:string){
this.location.emit(params)
}
showImageForm:boolean=false
onStepChange(event: StepperSelectionEvent): void {
  if (event.selectedIndex === 2) {
    this.showImageForm=true
  }
}
selectedImage:any=null;
profile_preview:any=null;
handleFileInput(event: any): void {
  const file = event.target.files?.[0];

  if (file && file.size > 1048576) {
    this.selectedImage = null;
    alert('File size exceeds the maximum allowed size (1 MB). Please choose a smaller file.');
  } else {
    this.selectedImage = file;
  }
if (this.selectedImage) {
      const reader = new FileReader();
      reader.onload = () => {
        this.profile_preview = reader.result;
      };
      reader.readAsDataURL(this.selectedImage);
    }
}



}
