import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EventsService } from '../../services/events.service';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-eventos',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './eventos.component.html',
  styleUrls: ['./eventos.component.scss'],
})
export class EventosComponent implements OnInit {
  private eventsService = inject(EventsService);
  
  eventos: any[] = [];
  loading = true;
  errorMessage = '';

  ngOnInit() {
    this.fetchEvents();
  }

  getImageUrl(url: string | null | undefined): string {
    if (!url) return '';
    if (url.startsWith('http')) return url;
    return `${environment.apiUrl}${url}`;
  }

  fetchEvents() {
    this.loading = true;
    this.eventsService.getEvents().subscribe({
      next: (data) => {
        this.eventos = data;
        this.loading = false;
      },
      error: (err) => {
        console.error('Error fetching events', err);
        this.errorMessage = 'No se pudieron cargar los eventos.';
        this.loading = false;
      }
    });
  }
}
