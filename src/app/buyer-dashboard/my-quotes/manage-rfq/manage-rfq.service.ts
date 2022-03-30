import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ManageRfqService {

  constructor(private http: HttpClient) { }

  getProductQuoteInstancebyQuote(productQuoteId) {
    return this.http.get(`${environment.apiPath}/series/getProductQuoteInstancebyQuote/${productQuoteId}`).pipe(
      map((data: any) => {
        data.data.quotations.forEach(quote => {
          quote.tmpMsg = [];
          quote.messages.forEach(msgs => {            
            if(msgs.created_date === quote.created_date) {
              const normalMsg = {
                msgType: 'textMsg',
                approval: msgs.approval,
                created_date: msgs.created_date,
                message_body: msgs.message_body,
                message_id: msgs.message_id,
                series_quote_instance_id: msgs.series_quote_instance_id,
                user_category: msgs.user_category
              }
              
              const quoteTemplateMsg = {
                msgType: 'quoteTpl',    
                rejectFormIsOpen: false,          
                quote_total: quote.quote_total,
                repacking_handling: quote.repacking_handling,
                duty_fee: quote.duty_fee,
                dirrect_to_resort_fee: quote.dirrect_to_resort_fee,
                pricingProducts: quote.pricingProducts,
                quoteComment: normalMsg,
                manufacture_leadtime: quote.manufacture_leadtime,
                product_items_amount: (quote.quote_total) - (quote.dirrect_to_resort_fee + quote.repacking_handling)
              }
              quote.tmpMsg.push(quoteTemplateMsg);
            } else {
              const normalMsg = {
                msgType: 'textMsg',
                approval: msgs.approval,
                created_date: msgs.created_date,
                message_body: msgs.message_body,
                message_id: msgs.message_id,
                series_quote_instance_id: msgs.series_quote_instance_id,
                user_category: msgs.user_category,
                admin_reject_msg: msgs.admin_reject_msg
              }
              quote.tmpMsg.push(normalMsg);
            }         
          });
          console.log(quote.tmpMsg);
        });

        
        
        return data;
      })
    )
  }

  sendMessaageQuote(msgObj: any) {
    return this.http.post(`${environment.apiPath}/series/sendMessaageQuote`, msgObj).pipe(
      map((data: any) => {
        return data;
      })
    )
  }

  buyerApproveQuoteFinal(quote: any) {
    return this.http.put(`${environment.apiPath}/series/buyerApproveQuoteFinal`, quote).pipe(
      map((data: any) => {
        return data;
      })
    )
  }

  getMinLpVal(parentQuoteId: number) {
    return this.http.get(`${environment.apiPath}/series/getMinLpVal/${parentQuoteId}`).pipe(
      map((data: any) => {
        return data.data;
      })
    )
  }

  rejectQuoteWithMsg(quoteInfo: any) {
    return this.http.put(`${environment.apiPath}/buyer/rejectQuoteWithMsg`, quoteInfo).pipe(
      map((data: any) => {
        return data;
      })
    )
  }

  closeQuote(quoteId: string) {    
    return this.http.post(`${environment.apiPath}/quote/buyerCloseQuote`, {quoteId}).pipe(
      map((data: any) => {
        return data;
      })
    )
  }
}
