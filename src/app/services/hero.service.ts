import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Hero } from '../components/hero';
// import { HEROES } from '../components/mock-heroes';
import { Observable, of } from 'rxjs';
import { MessageService } from './message.service'
import { catchError, map, tap } from 'rxjs/operators';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})

export class HeroService {

  private heroesUrl = 'api/heroes';  // URL to web api

  constructor(
    private http: HttpClient,
    private messageService: MessageService) {}

  
  getHeroes(): Observable<Hero[]> {
    // this.messageService.add('HeroService: fetched heroes');
    // return of(HEROES);

    return this.http.get<Hero[]>(this.heroesUrl)
      .pipe(
        catchError(this.handleError<Hero[]>('getHeroes', []))
      );
  };

  getHero(id: number): Observable<Hero> {
    // this.messageService.add(`HeroService: fetched hero id=${id}`);
    // return of(HEROES.find(hero => hero.id === id));

    const url = `${this.heroesUrl}/${id}`;
    return this.http.get<Hero>(url).pipe(
      tap(_ => this.log(`fetched hero id=${id}`)),
      catchError(this.handleError<Hero>(`getHero id=${id}`))
    );
  };

  updateHero (hero: Hero): Observable<any> {
    return this.http.put(this.heroesUrl, hero, httpOptions).pipe(
      tap(_ => this.log(`updated hero id=${hero.id}`)),
      catchError(this.handleError<any>('updateHero'))
    )
  };

  addHero (hero: Hero): Observable<Hero> {
    return this.http.post<Hero>(this.heroesUrl, hero, httpOptions).pipe(
      tap((newHero: Hero) => this.log(`added hero w/ id=${newHero.id}`)),
      catchError(this.handleError<Hero>('addHero'))
    );
  };

  /** DELETE: delete the hero from the server */
  deleteHero (hero: Hero | number): Observable<Hero> {
    const id = typeof hero === 'number' ? hero : hero.id;
    const url = `${this.heroesUrl}/${id}`;

    return this.http.delete<Hero>(url, httpOptions).pipe(
      tap(_ => this.log(`deleted hero id=${id}`)),
      catchError(this.handleError<Hero>('deleteHero'))
    );
  };

  /* GET heroes whose name contains search term */
  searchHeroes(term: string): Observable<Hero[]> {
    if (!term.trim()) {
      // if not search term, return empty hero array.
      return of([]);
    }
    return this.http.get<Hero[]>(`${this.heroesUrl}/?name=${term}`).pipe(
      tap(_ => this.log(`found heroes matching "${term}"`)),
      catchError(this.handleError<Hero[]>('searchHeroes', []))
    );
  }

  private log(message: string) {
    this.messageService.add(`HeroService: ${message}`);
  }

  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
   
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead
   
      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);
   
      // Let the app keep running by returning an empty result.
      return of(result as T);
    }
  };
}


/**
 * 参考文章：http://www.manongjc.com/article/7059.html
 * 
 * RxJS 的特点
 *   数据流抽象了很多现实问题
 *   擅长处理异步问题
 *   把复杂问题分解为简单问题的组合
 * 
 *   RxJS 对数据采用“推”的方式，当一个数据产生时，会将其推送给对应的处理函数，
 * 这个处理函数不用关心数据时同步产生还是异步产生的，因此处理异步将会变得非常简单。
 * 
 *   RxJS 中很多操作符，每个操作符都提供了一个小功能，
 * 学习 RxJS 最重要的就是学习如何组合操作符来解决复杂问题。
 * 
 *   RxJS 有一个核心和三个重点，
 * 一个核心是 Observable 再加上相关的 Operators，三个重点分别是 Observer、Subject、Schedulers。
 * 
 * 
 * RxJS 的 import 路径有以下 5 种：
 *   创建 Observable 的方法、types、schedulers 和一些工具方法
 *     import { Observable, Subject, asapScheduler, pipe, of, from, interval, 
 *        merge, fromEvent, SubscriptionLike, PartialObserver } from 'rxjs';
 * 
 *   操作符 operators
 *     import { map, filter, scan } from 'rxjs/operators';
 * 
 *   webSocket
 *     import { webSocket } from 'rxjs/webSocket';
 * 
 *   ajax
 *     import { ajax } from 'rxjs/ajax';
 * 
 *   测试
 *     import { TestScheduler } from 'rxjs/testing';
 */

/**
 * 操作符
 *   在 RxJS 中，操作符是用来处理数据流的。
 * 我们往往需要对数据流做一系列处理，才交给 Observer，这时一个操作符就像一个管道一样，数据进入管道，完成处理，流出管道。
 * 如：
 * import { interval } from 'rxjs';
 * import { map } from 'rxjs/operators'
 * const source$ = interval(1000).pipe(
 *   map(x => x * x)
 * )
 * source$.subscribe(x => console.log(x))
 */