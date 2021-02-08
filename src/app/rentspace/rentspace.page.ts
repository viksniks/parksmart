import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { ActionSheetController, AlertController, LoadingController, ToastController } from '@ionic/angular';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { environment } from 'src/environments/environment';
import { Router } from "@angular/router";
import { ApiService } from "../service/api.service";

@Component({
  selector: 'app-rentspace',
  templateUrl: './rentspace.page.html',
  styleUrls: ['./rentspace.page.scss'],
  providers: [ApiService]
})
export class RentspacePage implements OnInit {

  image;
  countryList;
  firstFormGroup: FormGroup;
  currentNumber = 1;
  base64Image: string;
  images: any = {};
  selectedCountry: any;
  address: string = "";
  parkingType: string = "";
  vehicletype: string = "";
  desc: string = "";
  mobile: string = "";
  features: any[] = [{
    name: "Covered parking",
    value: "coveredParking",
    checked: false,
  }, {
    name: "CCTV",
    value: "cctv",
    checked: false,
  }, {
    name: "Securely gated",
    value: "Securelygated",
    checked: false,
  }, {
    name: "Disabled access",
    value: "disabledAccess",
    checked: false,
  }, {
    name: "Electric vehicle charging",
    value: "electricCharging",
    checked: false,
  }, {
    name: "Lighting",
    value: "lighting",
    checked: false,
  }, {
    name: "Airport transfers by the space owner",
    value: "airportTransfer",
    checked: false,
  }];



  constructor(private httpClient: HttpClient,
    private formBuilder: FormBuilder,
    private actionSheetCtrl: ActionSheetController,
    private camera: Camera,
    private alertCtrl: AlertController,
    private loading: LoadingController,
    private toast: ToastController,
    private router: Router,
    private api: ApiService
  ) { }


  ngOnInit() {
    this.httpClient.get<any>('https://restcountries.eu/rest/v2/all')
      .subscribe((res) => {
        this.countryList = res;
      });

    this.firstFormGroup = this.formBuilder.group({
      address: ['', Validators.required]
    });
  }

  increment() {
    this.currentNumber++;
  }

  decrement() {
    if (this.currentNumber <= 1) {
      return;
    } else {
      this.currentNumber--;
    }
  }

  // selectImage() {
  //   this.imagePickerService.selectImage().then(data => {
  //     this.images = data ;
  //   });
  // }

  async selectImage(key) {
    const actionSheet = await this.actionSheetCtrl.create({
      mode: 'ios',
      header: 'Select Image source',
      buttons: [{
        text: 'Camera',
        handler: () => {
          this.pickImage(this.camera.PictureSourceType.CAMERA, key);
        }
      },
      {
        text: 'Load from Gallery',
        handler: () => {
          this.pickImage(this.camera.PictureSourceType.PHOTOLIBRARY, key);
        }
      },
      {
        text: 'Cancel',
        role: 'cancel'
      }
      ]
    });
    await actionSheet.present();
  }


  pickImage(sourceType, key) {

    const options: CameraOptions = {
      quality: 100,
      sourceType: sourceType,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    };
    this.camera.getPicture(options).then((imageData) => {
      // imageData is either a base64 encoded string or a file URI
      // If it's base64 (DATA_URL):
      this.base64Image = 'data:image/jpeg;base64,' + imageData;
      this.image = 'data:image/jpeg;base64,' + imageData;
      this.images[key] = this.image;

      // this.upload(this.base64Image);
    }, (err) => {
      alert('error' + JSON.stringify(err));
    });
  }


  async upload(file) {

    const formdata = new FormData();
    formdata.append('imageFile', file);

    const loader = await this.loading.create({
      message: 'Processing please wait…',
    });

    loader.present().then(() => {
      this.httpClient.post(environment.baseURL.url + '/upload/image', formdata, { responseType: 'text' })
        .subscribe(async res => {
          loader.dismiss();
          if (res === 'OK') {
            const alert = await this.alertCtrl.create({
              message: 'Image uploaded successfully',
            });
            alert.present();
            setTimeout(() => {
              alert.dismiss();
            }, 1500);
          } else {
            const alert = await this.alertCtrl.create({
              message: 'Image could not be uploaded',
              buttons: [
                {
                  text: 'Ok',
                  role: 'cancel',
                },
              ]
            });
            alert.present();
          }
        });
    });
  }
goto()
{
  this.router.navigate(["/rentspacedetails"]);
}
  continue(data, ele) {

    console.log(this.images);
    console.log(this.selectedCountry);
    console.log(this.address);
    console.log(this.parkingType);
    console.log(this.vehicletype);
    console.log(this.desc);
    console.log(this.mobile);
    console.log(this.features);
    let str = "";
    for (var i = 0; i < this.features.length; i++) {
      if (this.features[i].checked) {
        if (str == "") {
          str = this.features[i].name;
        }
        else {
          str += ", " + this.features[i].name;
        }
      }
    }
    ele.message = "saving...";
    let obj = { images: data, selectedCountry: this.selectedCountry, address: this.address, parkingType: this.parkingType, vehicleType: this.vehicletype, desc: this.desc, mobile: this.mobile, features: str, email: localStorage.getItem('currentUser') }
    this.api.saveRentSpace(obj).subscribe((data) => {
      ele.dismiss();
      this.showToast("successfully saved!");console.log(this.images);
      this.selectedCountry= "";
       this.address= "";
      this.parkingType = "";
      this.vehicletype = "";
      this.desc = "";
      this.mobile="";
      for (var i = 0; i < this.features.length; i++) {
        this.features[i].checked = false;
          
      }
      this.router.navigate(["/splash"]);
    }, (err) => {
      ele.dismiss();
      console.log(err);
    })






  }

  insertImages() {
    let i = 0;
    let obj = {
      message:"uploading image"+(i+1).toString()+"..."
    }
    if (Object.keys(this.images).length > 0 && this.selectedCountry != undefined && this.address != "" && this.parkingType != "" && this.vehicletype != "" && this.desc != "" && this.mobile != "") {
      this.loading.create(obj).then((ele) => {
        
        ele.present();

        let keys = Object.keys(this.images);

        let ref = this;
        
        inner();
        var img = "";
        function inner() {
          ref.api.saveImage({ imgbase: ref.images[keys[i]] }).subscribe((data: any) => {
            console.log(data);
            if (img == "") {
              img = data;
            }
            else {
              img += "," + data;
            }
            i++;
            if (i > keys.length - 1) {
              console.log("end");
              ref.continue(img, ele);
            }
            else {
              ele.message = "uploading image"+(i+1).toString()+"...";
              inner();
            }
          })
        }
      })
    }
    else {
      this.showToast("please fill all fields!");
    }
  }

  showToast(msg) {
    this.toast.create({
      message: msg,
      duration: 3000

    }).then((ele) => {
      ele.present().then(() => {
        // this.router.navigate(["/splash"]);
      })
    })
  }
}


