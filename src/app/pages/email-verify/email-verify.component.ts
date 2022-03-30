import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-email-verify',
  templateUrl: './email-verify.component.html',
  styleUrls: ['./email-verify.component.scss']
})
export class EmailVerifyComponent implements OnInit {
  subscription: any;
  verifyStatusSuccess: boolean;
  reqData: any;
  constructor(private route: ActivatedRoute, private http: HttpClient) { }

  ngOnInit() {
    this.subscription = this.route.params.subscribe(params => {
      if (params.token) {
        this.http.get(`${environment.apiPath}/auth/validateToken/${params.token}`).pipe().subscribe(
          (data: any) => {
            this.reqData = data;
            if (data.status) {
              this.verifyStatusSuccess = true;
            } else {
              this.verifyStatusSuccess = false;
            }
          },
          (error) => {
            this.reqData = error;
            this.verifyStatusSuccess = false;
          }
        )
      }      
    });
  }

}
