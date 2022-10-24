import { RouterModule } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AppRoutes } from '@core/values';

@Component({
  selector: 'app-header',
  templateUrl: './app-header.component.html',
  styleUrls: ['./app-header.component.scss'],
})
export class AppHeaderComponent implements OnInit {
  constructor(private readonly router: Router) {}

  ngOnInit(): void {}

  navigateToAuth() {
    this.router.navigate([AppRoutes.AUTH]);
  }

  navigateToMainPage() {
    this.router.navigate([AppRoutes.MAIN]);
  }
}
