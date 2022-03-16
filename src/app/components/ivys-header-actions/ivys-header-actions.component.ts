import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/auth/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-ivys-header-actions',
  templateUrl: './ivys-header-actions.component.html',
  styleUrls: ['./ivys-header-actions.component.scss']
})
export class IvysHeaderActionsComponent implements OnInit {

  constructor(private loginService: LoginService, private router: Router) { }

  ngOnInit() {
  }

  logout() {
    this.loginService.logout();
    this.router.navigate(['/home']);
  }
}
