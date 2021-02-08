import { Component, OnInit } from '@angular/core';
import {ApiService} from "../service/api.service";
import {LoadingController} from "@ionic/angular";

@Component({
  selector: 'app-rentspacedetails',
  templateUrl: './rentspacedetails.page.html',
  styleUrls: ['./rentspacedetails.page.scss'],
  providers:[ApiService]
})
export class RentspacedetailsPage implements OnInit {
details:any[]=[];
url:string="http://ec2-13-250-56-5.ap-southeast-1.compute.amazonaws.com:3000/"
  constructor(private api:ApiService,private loader:LoadingController) { }

  ngOnInit() {
    this.getDetails();
  }

  getDetails()
  {
    this.loader.create({
      message:"please wait..."
    }).then((ele)=>{
ele.present();
    
    this.api.getRentSpace(localStorage.getItem("currentUser")).subscribe((data:any)=>{
      ele.dismiss();
    
      this.details = data;
    },(err)=>{
      ele.dismiss();

    })
  })
  }

}
