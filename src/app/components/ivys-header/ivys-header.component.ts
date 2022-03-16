import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/auth/login.service';



@Component({
  selector: 'app-ivys-header',
  templateUrl: './ivys-header.component.html',
  styleUrls: ['./ivys-header.component.scss'],
})
export class IvysHeaderComponent implements OnInit {
  isLoggedIn: boolean;
  constructor(private loginService: LoginService) { }

  ngOnInit() {
    this.loginService.isLoggedIn().subscribe(
      data => {
        this.isLoggedIn = data;        
      }
    )
  }

}
