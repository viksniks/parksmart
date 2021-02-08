import { Component, OnInit } from '@angular/core';
import { MenuController ,AlertController} from '@ionic/angular';
import {Router} from "@angular/router";
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-adminpanel',
  templateUrl: './adminpanel.page.html',
  styleUrls: ['./adminpanel.page.scss'],
})
export class AdminpanelPage implements OnInit {

  fullName = 'Jhon';

  
  constructor(private menuController: MenuController,private router:Router, private alertController: AlertController,
    
    private authService: AuthService) { }
  gotoParkings()
  {
    this.menuController.close().then(()=>{

   
    this.router.navigate(["/parkings"]);
  })
  }
  gotoAddParkings()
  {
    this.menuController.close().then(()=>{
    this.router.navigate(["/addparking"]);
    })
  }
  async logout() {
    this.menuController.close();
    const alert = await this.alertController.create({
      mode: 'ios',
      header: 'Logout',
      message: 'Are you sure you want to logout?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: (res) => {

          }
        },
        {
          text: 'OK',
          cssClass: 'buttonCss',
          handler: () => {
            this.authService.logout();
            this.router.navigate(['/splash']);
            console.log('Logout Successful.');
          }
        }
      ]
    });

    await alert.present();
  }
  ngOnInit() {
  }

  closeMenu(){
    this.menuController.close();
  }
}
