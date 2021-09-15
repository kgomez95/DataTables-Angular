// Librerías.
import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

// Importaciones de home.
import { HomeDtService } from '../services/home.dt-service';

@Component({
    selector: 'app-home',
    templateUrl: '../pages/home.page.html'
})
export class HomeComponent implements OnInit {

    constructor(
        private titleService: Title,
        public homeDtService: HomeDtService
    ) { }

    ngOnInit(): void {
        this.titleService.setTitle('Inicio');
    }

}
