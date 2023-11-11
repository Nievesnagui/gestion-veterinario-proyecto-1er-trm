import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-mascota-view-routed',
  templateUrl: './mascota-view-routed.component.html',
  styleUrls: ['./mascota-view-routed.component.css']
})
export class MascotaViewRoutedComponent implements OnInit {


  id: number = 1;

  constructor(
    private oActivatedRoute: ActivatedRoute
  ) {
    this.id = parseInt(this.oActivatedRoute.snapshot.paramMap.get("id") || "1");
  }

  ngOnInit() {
  }

}
