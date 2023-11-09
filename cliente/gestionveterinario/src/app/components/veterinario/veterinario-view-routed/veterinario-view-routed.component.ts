import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { VeterinarioAjaxService } from 'src/app/service/veterinario.ajax.service';

@Component({
  selector: 'app-veterinario-view-routed',
  templateUrl: './veterinario-view-routed.component.html',
  styleUrls: ['./veterinario-view-routed.component.css']
})
export class VeterinarioViewRoutedComponent implements OnInit {

  id: number = 1;

  constructor(
    private oActivatedRoute: ActivatedRoute
  ) {
    this.id = parseInt(this.oActivatedRoute.snapshot.paramMap.get("id") || "1");
  }

  ngOnInit() {
  }

}
