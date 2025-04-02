import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {NgForOf, NgIf} from '@angular/common';
import {MemberService} from './MemberService';
import {Member} from './entity/Member';

@Component({
  selector: 'app-root',
  imports: [ReactiveFormsModule, NgIf, NgForOf, FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  memberForm: FormGroup;
  member: Member = new Member();
  members: any;
  message: string;

  constructor(private fb: FormBuilder, private memberService: MemberService) {

    this.memberForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phoneNumber: ['', Validators.required]
    });
    this.message = '';
  }

  onSubmit(): void {
    console.log('Form Submitted', this.member);
    this.memberService.registerMember(this.member).subscribe(data => {
      console.log(data)
      // Trigger the "refresh" here
      this.memberService.getAllMembers().subscribe(updatedMembers => {
        this.members = updatedMembers;
        console.log('List of members updated:', this.members);
        this.member = new Member();
        this.message = 'Registered!';
      });
    },
      error => {
        console.error('Failed to register member');
        this.message= "Failed to register member";
      });
  }

  ngOnInit(): void {
    let response = this.memberService.getAllMembers();
    response.subscribe(data => this.members = data);
  }

}
