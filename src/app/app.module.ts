import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { ImagePicker } from '@ionic-native/image-picker/ngx';
import { Crop } from '@ionic-native/crop/ngx';
import { Camera } from '@ionic-native/camera/ngx';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';
import { ApiService } from './service/api.service';
import { AuthService } from './service/auth.service';
import { File } from '@ionic-native/File/ngx';
import { WebView } from '@ionic-native/ionic-webview/ngx';
import { FilePath } from '@ionic-native/file-path/ngx';

//import { ImagePickerService } from './service/image-picker.service';
import { LocationAccuracy } from '@ionic-native/location-accuracy/ngx';
import { Ng2SearchPipeModule } from 'ng2-search-filter';


@NgModule({
  declarations: [AppComponent,],
  entryComponents: [],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    Ng2SearchPipeModule,
    BrowserAnimationsModule,
    IonicModule.forRoot(),
    ReactiveFormsModule,
   
    AppRoutingModule,

  ],
  providers: [
    StatusBar,
    Geolocation,
    LocationAccuracy,
    ImagePicker,
    Crop,
    Camera,
    File,
    WebView,
    FilePath,
    BarcodeScanner,
    ApiService,
    AuthService,
   // ImagePickerService,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
 