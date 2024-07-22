import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivityStore } from '@test-cra/shared';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit {

  public readonly store = inject(ActivityStore)

  public ngOnInit(): void {
    console.log('HomeComponent initialized', this.store.requestState())
  }
}
