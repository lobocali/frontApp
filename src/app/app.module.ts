import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

//components
import { AppComponent } from './app.component';
import { SearchUserComponent } from './components/search-user/search-user.component';
import { ShowUserComponent } from './components/show-user/show-user.component';
import { ListUserComponent } from './components/list-user/list-user.component';
import { ErrorNotificationComponent } from './components/errors/error-notification.components';
import { BarChartComponent } from './components/graphic-bar/graphic-bar.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgChartsModule } from 'ng2-charts';

@NgModule({
  declarations: [
    AppComponent,
    SearchUserComponent,
    ShowUserComponent,
    ListUserComponent,
    BarChartComponent,
    ErrorNotificationComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    NgChartsModule,
    NgbModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
