import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-cita-view-routed',
  templateUrl: './cita-view-routed.component.html',
  styleUrls: ['./cita-view-routed.component.css']
})
export class CitaViewRoutedComponent implements OnInit {


  id: number = 1;

  constructor(
    private oActivatedRoute: ActivatedRoute
  ) {
    this.id = parseInt(this.oActivatedRoute.snapshot.paramMap.get("id") || "1");
  }

  ngOnInit() {
  }

}
