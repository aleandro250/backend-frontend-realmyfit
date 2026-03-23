import { Component } from '@angular/core';
import { HeroComponent } from '../hero/hero';
import { FeaturesComponent } from '../features/features';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  imports: [HeroComponent, FeaturesComponent, RouterLink],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {}
