import { Injectable } from '@angular/core';
import {Headers,Http} from "@angular/http";

import 'rxjs/add/operator/toPromise';
import { Card } from './card';

@Injectable()
export class CardService {
  private cardsUrl = 'app/cards';  // URL to web api

  constructor(private http: Http) { }

  private handleError(error: any) {
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  }

  getCards(): Promise<Card[]> {
    return this.http.get(this.cardsUrl)
      .toPromise()
      .then(response => response.json().data)
      .catch(this.handleError);
  }

  // Add new Card
  private post(card: Card): Promise<Card> {
    let headers = new Headers({
      'Content-Type': 'application/json'});

    return this.http
      .post(this.cardsUrl, JSON.stringify(card), {headers: headers})
      .toPromise()
      .then(res => res.json().data)
      .catch(this.handleError);
  }

  // Update existing Card
  private put(card: Card) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');

    let url = `${this.cardsUrl}/${card.id}`;

    return this.http
      .put(url, JSON.stringify(card), {headers: headers})
      .toPromise()
      .then(() => card)
      .catch(this.handleError);
  }

  delete(card: Card) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');

    let url = `${this.cardsUrl}/${card.id}`;

    return this.http
      .delete(url, headers)
      .toPromise()
      .catch(this.handleError);
  }

  save(card: Card): Promise<Card>  {
    if (card.id) {
      return this.put(card);
    }
    return this.post(card);
  }

  getCard(id: number) {
    return this.getCards()
      .then(cards => cards.find(card => card.id === id));
  }

}
