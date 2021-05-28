import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Md5 } from 'ts-md5/dist/md5';


export interface Marvel {
  data: {
    results: any[];
  }
}

@Injectable({
  providedIn: 'root'
})
export class MarvelService {

  constructor(
    private httpClient: HttpClient
  ) {
    this.httpOptions
  };

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }


  private marvelCharacterUrl = `https://gateway.marvel.com:443/v1/public/characters`;
  private publicKey = `a632b3497a2c0d4ab1c901b3327919f2`;
  private privateKey = `21540babdb39e1cb981ceeeae506f4192d2ac835`;



  private getTimeStamp() {
    return new Date().valueOf().toString();
  }


  private getHash(timeStamp: any) {
    const md5 = new Md5();
    md5.appendStr(timeStamp);
    md5.appendStr(this.privateKey);
    md5.appendStr(this.publicKey);
    const hash = md5.end().toString();
    return hash;
  }

  public getCharacters() {
    const timeStamp = this.getTimeStamp();
    const hash = this.getHash(timeStamp);
    const limit = 100;
    let url = `${this.marvelCharacterUrl}?limit=${limit}&ts=${timeStamp}&apikey=${this.publicKey}&hash=${hash}`;
    return this.httpClient.get<Marvel>(url);
  }

}




