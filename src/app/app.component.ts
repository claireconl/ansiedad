import { Component } from '@angular/core';
import { IonApp, IonRouterOutlet } from '@ionic/angular/standalone';
import { register } from 'swiper/element/bundle';
import { IndexPage } from './index/index.page';
import { SplashScreen } from '@capacitor/splash-screen';
import { DatabaseService } from './services/database.service';

register();

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  standalone: true,
  imports: [IonApp, IonRouterOutlet],
})
export class AppComponent {
  rootPage: any = IndexPage;
  constructor(private database: DatabaseService) {
    this.initApp();
  }

  async initApp(){
    await this.database.initializPlugin();
    SplashScreen.hide();
  }
}
