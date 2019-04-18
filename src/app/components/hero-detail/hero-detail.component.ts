import { Component, OnInit, Input } from '@angular/core';
import { Hero } from '../hero'
import { ActivatedRoute } from '@angular/router';
/**
 * ActivatedRoute中保存着路由信息。
 */
import { Location } from '@angular/common';
/**
 * 相当于原生中浏览器BOM中的Location
 */
import { HeroService } from '../../services/hero.service'
@Component({
  selector: 'app-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: ['./hero-detail.component.less']
})
export class HeroDetailComponent implements OnInit {
  @Input() hero: Hero;
  constructor(
    private route: ActivatedRoute,
    private heroService: HeroService,
    private location: Location
  ) { }

  ngOnInit() {
    this.getHero();
  }
  getHero(): void {
    // 加号是用来做隐式转换的
    const id = +this.route.snapshot.paramMap.get('id');
    this.heroService.getHero(id)
      .subscribe( hero => this.hero = hero);
  };
  goBack(): void {
    this.location.back();
  };
  save(): void {
    this.heroService.updateHero(this.hero)
      .subscribe(() => this.goBack());
  }
}
