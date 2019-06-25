import { Component, OnInit, ViewChild, ElementRef, NgZone } from '@angular/core';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import {
  GoogleMaps,
} from '@ionic-native/google-maps';

import { Platform, NavController, ToastController } from '@ionic/angular';
import { Router } from '@angular/router';

declare var google: any;

@Component({
  selector: 'app-suppliers-location',
  templateUrl: './suppliers-location.page.html',
  styleUrls: ['./suppliers-location.page.scss'],
})

export class SuppliersLocationPage implements OnInit {
  @ViewChild('map') mapElement: ElementRef;
  map: any;
  mapOptions: any;
  location = { lat: null, lng: null };
  markerOptions: any = { position: null, map: null, title: null };
  marker: any;

  constructor(public googleMaps: GoogleMaps, public plt: Platform,
    public nav: NavController, public zone: NgZone, public geolocation: Geolocation, private router: Router) { }

  ngOnInit() {
  }

  ngAfterViewInit() {
    this.plt.ready().then(() => {
      this.initMap();
    });
  }

  initMap() {

    this.geolocation.getCurrentPosition().then((position) => {
      this.location.lat = position.coords.latitude;
      this.location.lng = position.coords.longitude;
    });

    this.mapOptions = {
      center: this.location,
      zoom: 16,
      mapTypeControl: false
    };
    setTimeout(() => {
      this.map = new google.maps.Map(this.mapElement.nativeElement, this.mapOptions);
      //Marker Options
      this.markerOptions.position = this.location;
      this.markerOptions.map = this.map;
      this.markerOptions.title = 'My Location';
      this.marker = new google.maps.Marker(this.markerOptions);
      this.addInfoWindow(this.marker, this.markerOptions.title);

      this.getMarkers();
    }, 3000);
  }

  getMarkers() {
    let museumData =  [
          {
            "name": "National Museum",
            "state" : "Delhi",
            "latitude": -19.918724,
            "longitude": -43.921367
          },
          {
            "name": "National Science Centre,",
            "state": "Delhi",
            "latitude": -19.920230,
            "longitude": -43.918315
          },
          {
            "name": "The Sardar Patel Museum",
            "state": "Gujrat",
            "latitude": -19.920644,
            "longitude": -43.922403
          }]
;

    // tslint:disable-next-line:variable-name
    for (let _i = 0; _i < museumData.length; _i++) {
      if (_i > 0) {
        this.addMarkersToMap(museumData[_i]);
      }
    }
  }

  addMarkersToMap(museum) {
    const position = new google.maps.LatLng(museum.latitude, museum.longitude);
    const museumMarker = new google.maps.Marker({ position, title: museum.name });
    museumMarker.setMap(this.map);
    this.addInfoWindow(museumMarker, museum.name);
  }
  
  previous: any;
  
  addInfoWindow(marker, content) {
    const infoWindow = new google.maps.InfoWindow({
      content
    });
    google.maps.event.addListener(marker, 'click', () => {
      if(this.previous != null || this.previous != undefined) {
        this.previous.close();
      }
      this.previous = infoWindow;
      infoWindow.open(this.map, marker);
     // this.router.navigate(['suppliers']);
    });
  }

}
