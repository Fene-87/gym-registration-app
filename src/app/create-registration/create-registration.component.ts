import { Component } from '@angular/core';

@Component({
  selector: 'app-create-registration',
  templateUrl: './create-registration.component.html',
  styleUrls: ['./create-registration.component.scss']
})
export class CreateRegistrationComponent {
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
  ]
}
