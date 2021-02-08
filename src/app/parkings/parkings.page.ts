import { Component, OnInit } from '@angular/core';
import { LoadingController ,ToastController,AlertController} from "@ionic/angular";
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { ApiService } from "../service/api.service";
declare var google;
@Component({
  selector: 'app-parkings',
  templateUrl: './parkings.page.html',
  styleUrls: ['./parkings.page.scss'],
})
export class ParkingsPage implements OnInit {
map:any;
parkings:any[]=[];
bounds:any = new google.maps.LatLngBounds();
showmap:boolean=false;
usergps:any;
marker:any;
  constructor(private loader: LoadingController, private geolocation: Geolocation, private api: ApiService,private alert:AlertController) { }

  ngOnInit() {
    //this.initMap();
    this.getParkings();
  }
  initMap() {
    // The location of Uluru
    const uluru = { lat: -25.344, lng: 131.036 };
    // The map, centered at Uluru
    this.map = new google.maps.Map(document.getElementById("map"), {
      zoom: 4,
      center: uluru,
    });
 //  this.getNearestParkings();
    // The marker, positioned at Uluru
    
  }
 
more(obj)
{
  this.alert.create({
    message:"NAME:"+obj.contactName+"<br />MOBILE:"+obj.mobile+"<br />",
    buttons:[{

      text:"CLOSE"
    },{
      text:"DIRECTIONS",
      handler:()=>{
        this.loader.create({
          message:"please wait..."
        }).then((ele)=>{
          ele.present();
        this.geolocation.getCurrentPosition({}).then((gps)=>{
          ele.dismiss();
          var origin = gps.coords.latitude.toString()+","+gps.coords.longitude.toString();
          var destination = obj.latitude+","+obj.longitude;
          var modeVal = "driving";
          var url = "https://www.google.com/maps/dir/?api=1&travelmode="+modeVal+"&layer=traffic&origin="+origin+"&destination="+destination;
          window.open(url);


        },(err)=>{
          ele.dismiss();
        })
      })
      }
    }
      ]
  }).then((ele)=>{
    ele.present();
  })
}
  getParkings()
  {
    this.loader.create({
      message:"please wait..."
    }).then((ele)=>{
      ele.present();
    this.geolocation.getCurrentPosition({}).then((gps)=>{

   
    this.api.getParkings().subscribe((val:any)=>{
      ele.dismiss();
      console.log(val);
      this.parkings = val;
      for(var i = 0;i<this.parkings.length;i++)
      {
        let dis = this.getDistance(gps.coords.latitude,gps.coords.longitude,parseFloat(this.parkings[i].latitude),parseFloat(this.parkings[i].longitude));
        this.parkings[i]["dis"] = dis;
      }
      this.parkings.sort(this.compare);
     
    },(err)=>{
      ele.dismiss();
      console.log(err);
    })
  })
  })
  }
  compare( a, b ) {
    if ( parseFloat(a.dis) < parseFloat(b.dis) ){
      return -1;
    }
    if ( parseFloat(a.dis) > parseFloat(b.dis) ){
      return 1;
    }
    return 0;
  }
  
getDistance(lat1,lng1,lat2,lng2)
{
  var distance = google.maps.geometry.spherical.computeDistanceBetween(new google.maps.LatLng(lat1, lng1), new google.maps.LatLng(lat2, lng2));
  
  return (distance/1000).toFixed(2);       
}

viewParking(obj)
{
  if(this.showmap)
  {
    this.marker.setPosition({lat: parseFloat(obj.latitude), lng: parseFloat(obj.longitude)});
    this.marker.setTitle(obj.contactName);
      this.map.panTo(this.marker.getPosition());
  }
  else{
    this.showmap = true;
    setTimeout(()=>{

   
    this.map = new google.maps.Map(document.getElementById("map"), {
      center: { lat: parseFloat(obj.latitude), lng: parseFloat(obj.longitude) },
      zoom: 8,
    });
    this.marker = new google.maps.Marker({
      position: { lat: parseFloat(obj.latitude), lng: parseFloat(obj.longitude) },
      map: this.map,
      title:obj.contactName
      

    });
  })
  }


}
}
