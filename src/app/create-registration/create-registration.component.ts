import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ApiService } from '../services/api.service';
import { NgToastService } from 'ng-angular-popup';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-create-registration',
  templateUrl: './create-registration.component.html',
  styleUrls: ['./create-registration.component.scss']
})
export class CreateRegistrationComponent implements OnInit {
  public packages = ['Daily', 'Monthly', 'Yearly'];
  public genders = ['Male', 'Female'];
  //same as the two above but declares type as string
  public importantList: string[] = [
    'Stubborn fat reduction',
    'Energy and endurance',
    'Building lean muscle',
    'Healthier digestive system',
    'Sugar craving body',
    'Fitness'
  ];

  public registerForm!: FormGroup;
  public userIdToUpdate!: number;

  constructor(private fb: FormBuilder, private activatedRoute: ActivatedRoute, private api: ApiService, private toastService: NgToastService) {

  }
  ngOnInit(): void {
    this.registerForm = this.fb.group({
      firstName: [''],
      lastName: [''],
      email: [''],
      mobile: [''],
      weight: [''],
      height: [''],
      bmi: [''],
      bmiResult: [''],
      gender: [''],
      requireTrainer: [''],
      package: [''],
      important: [''],
      haveGymBefore: [''],
      enquiryDate: [''],
    })
    this.registerForm.controls['height'].valueChanges.subscribe(res => {
      this.calculateBMI(res)
    })
    this.activatedRoute.params.subscribe(val => {
      this.userIdToUpdate = val['id']
      this.api.getRegisteredUserId(this.userIdToUpdate)
      .subscribe(res => {
        
      })
    })
  }

  submit() {
    this.api.postRegistration(this.registerForm.value)
    .subscribe(res => {
      this.toastService.success({detail: "SUCCESS", summary: "Enquiry added", duration:3000});
      this.registerForm.reset();
    })
  }

  calculateBMI(heightValue: number) {
    const weight = this.registerForm.value.weight;
    const height = heightValue;
    const heightMetres = height / 100
    const bmi = weight / (heightMetres * heightMetres);
    this.registerForm.controls['bmi'].patchValue(bmi);

    switch(true) {
      case bmi < 18.5:
        this.registerForm.controls['bmiResult'].patchValue("underweight");
        break;
      case (bmi >= 18.5 && bmi < 25):
        this.registerForm.controls['bmiResult'].patchValue("Normal");
        break;
      case (bmi >= 25 && bmi < 30):
        this.registerForm.controls['bmiResult'].patchValue("overweight");
        break;
      
      default:
        this.registerForm.controls['bmiResult'].patchValue("Obese");
        break;
    }
  }
}
