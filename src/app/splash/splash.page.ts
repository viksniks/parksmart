import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';

import { NavController } from '@ionic/angular';

declare var window;
@Component({
  selector: 'app-splash',
  templateUrl: './splash.page.html',
  styleUrls: ['./splash.page.scss'],
})
export class SplashPage implements OnInit {

  constructor(public navCtrl: NavController) { }
  ionViewDidEnter()
  {
    let token = localStorage.getItem("token");
     console.log(token);
      if (token != null) {
        
        
       token = JSON.parse(token);
       if(token["type"] == "admin")
       {
        this.navCtrl.navigateRoot('/adminpanel');
       }
       else{
        this.navCtrl.navigateRoot('/main');
       }
        
        
        
      }
      else {
        this.navCtrl.navigateRoot('/landing-page');
       

      }

   
  }
  ngOnInit() {
    
    
  }

}
