import { Component } from '@angular/core';

/**
 * @Component() 装饰器表明紧随它的那个类是一个组件，并
 * 提供模板和该组件专属的元数据。
 * 
 * 装饰器是一些用于修饰 JavaScript 类的--函数。Angular 定义了许多装饰器，
 * 这些装饰器会把一些特定种类的元数据附加到类上，以便 
 * Angular 了解这些这些类的含义以及该如何使用它们。
 */
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less'],
  providers:  [ ]
})
/**
 * 每个组件都会定义一个类，其中包含应用的数据和逻辑，
 * 并与一个 HTML 模板相关联，该模板定义了一个供目标环境下显示的视图。
 */
export class AppComponent {
  title = 'My First Angular App!';
  constructor(){ }
}
