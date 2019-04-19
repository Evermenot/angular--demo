import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule }    from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeroesComponent } from './components/heroes/heroes.component';
import { HeroDetailComponent } from './components/hero-detail/hero-detail.component';
import { MessagesComponent } from './components/messages/messages.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';

import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryDataService }  from './services/in-memory-data.service';
import { HeroSearchComponent } from './components/hero-search/hero-search.component';
import { AdBannerComponent } from './components/ad-banner/ad-banner.component';
/**
 * 每个组件都必须声明在（且只能声明在）一个 NgModule 中
 */
/**
 * declarations: 用来声明 组件、指令、管道。
 * exports：导出一些可以在其他模块使用的对象
 * imports：导入一些在其他模块中已经被导出的对象
 * providers: 本模块向全局服务中贡献的那些服务的创建器
 * bootstrap: 应用的主视图，称为根组件。它是应用中所有其它视图的宿主。
 *          只有根模块才应该设置这个 bootstrap 属性。
 */
@NgModule({
  declarations: [
    AppComponent,
    HeroesComponent,
    HeroDetailComponent,
    MessagesComponent,
    DashboardComponent,
    HeroSearchComponent,
    AdBannerComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    HttpClientInMemoryWebApiModule.forRoot(
      InMemoryDataService, { dataEncapsulation: false }
    )
  ],
  providers: [ ],
  bootstrap: [AppComponent]
})
export class AppModule { }
/**
 * 应用的根模块之所以叫根模块，是因为它可以包含任意深度的层次化子模块。
 */
