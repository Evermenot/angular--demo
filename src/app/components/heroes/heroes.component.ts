import { Component, OnInit } from '@angular/core';
import { Hero } from '../hero';
import { HeroService } from '../../services/hero.service';
/**
 * @Component 装饰器函数，用于为该组件指定所需要的元数据
 * selector— 组件的选择器（CSS 元素选择器，组件在UI层使用的标签名）
 * templateUrl— 组件模板文件的位置
 * styleUrls— 组件私有 CSS 样式表文件的位置
 */
@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.less']
})
export class HeroesComponent implements OnInit {
  heroes: Hero[];
  selectedHero: Hero;
  constructor(private heroService: HeroService) { }
  ngOnInit() {
    this.getHeroes();
  };

  onSelect(hero: Hero):void {
    this.selectedHero = hero;
    console.log(this.selectedHero)
  };
  getHeroes(): void {
    this.heroService.getHeroes()
      .subscribe(heroes => this.heroes = heroes)
  }
}
