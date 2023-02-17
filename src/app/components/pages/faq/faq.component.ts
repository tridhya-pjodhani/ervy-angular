import { BaseApiService } from './../../../core/api/base-api.service';
import { Component, OnInit } from '@angular/core';
import { FaqService } from '../../services/faq.service';

@Component({
  selector: 'app-faq',
  templateUrl: './faq.component.html',
  styleUrls: ['./faq.component.scss']
})
export class FaqComponent implements OnInit {

  questionList: any;
  activeTab: any;

  constructor(private faqService : FaqService, private baseApiService: BaseApiService) { }

  ngOnInit(): void {
    this.faqService.getFaqList().subscribe( response => {
      console.log(response);
      if(response.status && response.data.length > 0){
        this.questionList = response.data;
      }
    })
  }

  getFaqList(): void{

  }
}
