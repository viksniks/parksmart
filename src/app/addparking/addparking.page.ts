import { Component, OnInit } from '@angular/core';
import { LoadingController ,ToastController} from "@ionic/angular";
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { ApiService } from "../service/api.service";

declare var google;
declare var document;
@Component({
  selector: 'app-addparking',
  templateUrl: './addparking.page.html',
  styleUrls: ['./addparking.page.scss'],
})
export class AddparkingPage implements OnInit {
  map: any;
  marker: any;
  searchText: string = "";
  mobile: string = "";
  contactName: string = "";
  parkingName: string = "";

  constructor(private loader: LoadingController, private geolocation: Geolocation, private api: ApiService,private toast:ToastController) { }

  ngOnInit() {
    this.loader.create({
      message: "please wait..."
    }).then((loadingElement) => {

      loadingElement.present();
      this.geolocation.getCurrentPosition().then((gps) => {

        loadingElement.dismiss();
        this.map = new google.maps.Map(document.getElementById("map"), {
          center: { lat: gps.coords.latitude, lng: gps.coords.longitude },
          zoom: 8,
        });

        this.plotMarker(gps.coords.latitude, gps.coords.longitude);
        let that = this;
        var input = document.getElementById('searchTextField');
        let autocomplete = new google.maps.places.Autocomplete(input);
        autocomplete.addListener("place_changed", () => {

          const place = autocomplete.getPlace();
          that.searchText = document.getElementById("searchTextField").value;
          that.plotMarker(place.geometry.location.lat(), place.geometry.location.lng());



        });
      }, (err) => {
        loadingElement.dismiss();
      })
    });

  }

  plotMarker(latitude, longitude) {
    if (this.marker) {
      //this.marker.set
      this.marker.setPosition({ lat: latitude, lng: longitude });
      this.map.panTo(this.marker.getPosition());
    }
    else {
      this.marker = new google.maps.Marker({
        position: { lat: latitude, lng: longitude },
        map: this.map,
        draggable: true

      });
      // this.marker.addListener('drag', this.handleEvent);
      this.marker.addListener('dragend', this.handleEvent);
    }
  }
  handleEvent(event) {
    // document.getElementById('lat').value = event.latLng.lat();
    // document.getElementById('lng').value = event.latLng.lng();
    this.map.panTo({ lat: event.latLng.lat(), lng: event.latLng.lng() })
  }


  addParking() {
    
    
    if(this.parkingName == "")
    {
      this.showMsg("enter parking area name.");

      return;
    }
    if(this.contactName == "")
    {
      this.showMsg("enter contact person name");

      return;
    }
    if(this.mobile == "")
    {
      this.showMsg("enter mobile");

      return;
    }
    this.loader.create({
      message:"please wait..."
    }).then((ele)=>{
      ele.present();
    
    let obj = {
      mobile: this.mobile,
      contactName: this.contactName,
      parkingName: this.parkingName,
      latitude:this.marker.getPosition().lat(),
      longitude:this.marker.getPosition().lng()
    };
    this.api.addParking(obj).subscribe((val) => {
      ele.dismiss();
      this.showMsg("successfully inserted");

    }, (err) => {
      ele.dismiss();
      console.log(err);
    })
  })
  }

  showMsg(msg)
  {
this.toast.create({
  message:msg,
  duration:3000
}).then((ele)=>{
  ele.present();
})
  }
}
