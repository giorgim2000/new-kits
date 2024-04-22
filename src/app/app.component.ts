import { Component, HostBinding } from '@angular/core';
import { ScreenManagerService } from './services/screen-manager.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'body-kits';

  constructor(){}
}
