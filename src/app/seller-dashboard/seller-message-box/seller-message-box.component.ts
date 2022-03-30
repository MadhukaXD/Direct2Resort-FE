import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { SellerMessageBoxService } from './seller-message-box.service';
import { LoginService } from 'src/app/auth/login.service';
import * as jwt_decode from 'jwt-decode';
import { SnotifyService } from 'ng-snotify';

@Component({
  selector: 'app-seller-message-box',
  templateUrl: './seller-message-box.component.html',
  styleUrls: ['./seller-message-box.component.scss']
})
export class SellerMessageBoxComponent implements OnInit {
  isLoading: boolean = false;
  msgList: any;
  msgTread:  any;
  sellerCompanyId: any;

  sellerMsg: {
    quoteMessage: string,
    productMsgId: string
  }
  
  @ViewChild('scrollMsgFeed') private scrollMsgFeed: ElementRef;

  constructor(private sellerMessageBoxService: SellerMessageBoxService, private loginService: LoginService, private snotifyService: SnotifyService) { }

  ngOnInit() {
    this.sellerMsg = {
      productMsgId: '',
      quoteMessage: ''
    } 

    const userToken = this.loginService.getToken();
    this.sellerCompanyId = jwt_decode(userToken).companyId;    
    this.getAllMsgs();
  }

  getAllMsgs() {
    this.isLoading = true;
    this.sellerMessageBoxService.getAllMsgs().subscribe(
      data => {
        this.isLoading = false;
        this.msgList = data;
      },
      (error) => {
        this.isLoading = false;
      }
    )
  }

  getSignleMsg(msg) {
    this.isLoading = true;
    this.sellerMessageBoxService.getSingleChat(msg.uuid).subscribe(
      data => {
        this.isLoading = false;
        this.msgTread = data;

        setTimeout(() => {
          this.msgFeedScrollToBottom();
        }, 100);
        
        this.sellerMessageBoxService.setMsgSeen({msgUuid: msg.uuid}).subscribe(
          data => {
            console.log('Message Seen');            
          }
        );        
      },
      (error) => {
        this.isLoading = false;
      }
    )
  }

  sendMsg(msgUuid: string) {
    this.sellerMsg.productMsgId = msgUuid;
    this.isLoading = true;
    
    this.sellerMessageBoxService.sendMsg(this.sellerMsg).subscribe(
      data => {
        if(data.uuid) {
          this.sellerMsg.quoteMessage = '';
          this.snotifyService.success('Message sent');
          this.getSignleMsg({uuid: msgUuid});
        }
        this.isLoading = false;
      },
      (error) => {
        this.isLoading = false;
        this.snotifyService.error('Something went wrong');
      }
    )
  }

  getProductImg(imgs){
    const firstImg = imgs.split(',');        
    return {
      backgroundImage: `url(${firstImg[0]})`
    };
  }

  msgFeedScrollToBottom(): void {
    try {
        this.scrollMsgFeed.nativeElement.scrollTop = this.scrollMsgFeed.nativeElement.scrollHeight;
    } catch(err) { }                 
  }
}
