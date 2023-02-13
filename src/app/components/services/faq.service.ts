import { Observable } from "rxjs";
import { Injectable } from "@angular/core";
import { BaseApiService } from "src/app/core/api/base-api.service";

@Injectable({
  providedIn: "root",
})
export class FaqService {
  constructor(private _baseApiService: BaseApiService) {}

  getCategoryList(params: any = {}): Observable<any> {
    return this._baseApiService.makeRequest("GET", "category/get-category", params);
  }

  createCategory(postData: { name: string }): Observable<any> {
    return this._baseApiService.makeRequest("POST", "category/add-category", postData);
  }

  editCategory(postData = {}, categoryId: string): Observable<any> {
    return this._baseApiService.makeRequest(
      "PUT",
      "category/edit-category/" + categoryId,
      postData
    );
  }

  editCategoryStatus(postData = {}, categoryId: string): Observable<any> {
    return this._baseApiService.makeRequest(
      "PUT",
      "category/active-inactive-category/" + categoryId,
      postData
    );
  }

  deleteCategory(categoryId: string): Observable<any> {
    return this._baseApiService.makeRequest("DELETE", "category/delete-category/" + categoryId);
  }

  // faq list

  getFaqList(): Observable<any> {
    return this._baseApiService.makeRequest('GET','question/get-question');
  }

  getFaqByCategory(categoryId: string): Observable<any> {
    return this._baseApiService.makeRequest('GET','category/get-category/' + categoryId);
  }

  deleteQuestion(questionId: string): Observable<any> {
    return this._baseApiService.makeRequest('DELETE','question/delete-question/' + questionId);
  }

  // Question

  addQuestion(postData: any): Observable<any> {
    return this._baseApiService.makeRequest('POST','question/add-question', postData);
  }

  editQuestion(postData: any, questionId: string): Observable<any> {
    return this._baseApiService.makeRequest('PUT','question/edit-question/' + questionId, postData);
  }

  getQuestionById(questionId: string): Observable<any> {
    return this._baseApiService.makeRequest('GET','question/get-question/' + questionId);
  }
}
