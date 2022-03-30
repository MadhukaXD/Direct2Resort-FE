import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/auth/login.service';

@Component({
  selector: 'app-ivys-footer',
  templateUrl: './ivys-footer.component.html',
  styleUrls: ['./ivys-footer.component.scss']
})
export class IvysFooterComponent implements OnInit {
  isLoggedIn: boolean = false;
  constructor(private loginService: LoginService) { }

  ngOnInit() {
    this.loginService.isLoggedIn().subscribe(isLoggedIn => {
      this.isLoggedIn = isLoggedIn;      
    });
  }
}
