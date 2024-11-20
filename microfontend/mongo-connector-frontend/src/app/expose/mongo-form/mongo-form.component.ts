import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MongoConnectionService } from '../../mongo-connection.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-mongo-form',
  templateUrl: './mongo-form.component.html',
  styleUrls: ['./mongo-form.component.css']
})
export class MongoFormComponent implements OnInit {
  mongoForm: FormGroup = new FormGroup({});

  constructor(
    private fb: FormBuilder,
    private mongoService: MongoConnectionService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.mongoForm = this.fb.group({
      host: ['', Validators.required],
      port: [27017, Validators.required],
      user: [''],
      password: [''],
      databaseName: ['', Validators.required]
    });
  }

  onSubmit(): void {
    if (this.mongoForm.valid) {
      const formData = this.mongoForm.value;
      console.log('Form Data:', formData);

      this.mongoService.connectDatabase(formData).subscribe({
        next: (response) => {
          console.log('Database Connection Response:', response);
          // Navigate to the mongo-tables page only if the connection is successful
          //this.router.navigate(['/mongo-tables']);
        },
        error: (err) => {
          console.error('Database Connection Error:', err);
        }
      });
    } else {
      console.error('Form is invalid');
    }
  }
}
