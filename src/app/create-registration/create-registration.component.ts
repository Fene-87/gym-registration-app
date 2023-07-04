import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

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

  constructor(private fb: FormBuilder) {

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
  }

  submit() {
    console.log(this.registerForm.value);
  }
}
