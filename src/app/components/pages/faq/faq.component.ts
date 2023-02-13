import { Component, OnInit } from '@angular/core';
import { FaqService } from '../../services/faq.service';

@Component({
  selector: 'app-faq',
  templateUrl: './faq.component.html',
  styleUrls: ['./faq.component.scss']
})
export class FaqComponent implements OnInit {

  constructor(private faqService : FaqService) { }

  ngOnInit(): void {
    this.faqService.getFaqList().subscribe( response => {
      console.log(response);
    })
  }

}
