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
    this.registerForm.controls['height'].valueChanges.subscribe(res => {
      this.calculateBMI(res)
    })
  }

  submit() {
    console.log(this.registerForm.value);
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
