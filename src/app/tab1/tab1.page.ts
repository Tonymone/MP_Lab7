import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})

export class Tab1Page implements OnInit {
  themeToggle = false;
  postData: any = {};
  fetchedData: any = []; // Initialize fetchedData as an empty array
  
  constructor(private http: HttpClient, private route: ActivatedRoute, private alertController: AlertController) { }

  ngOnInit() {
    // Call fetchDataFromServer when the component initializes to populate fetchedData
    this.fetchDataFromServer();
    this.route.queryParams.subscribe(params => {
      if (params && params['user']) {
        this.postData = JSON.parse(params['user']);
      }
    });    
  }

  async postDataToServer() {
    if (!this.postData.name || !this.postData.email || !this.postData.username) {
      const alert = await this.alertController.create({
        header: 'Error',
        message: 'Please fill in all fields.',
        buttons: ['OK']
      });
      await alert.present();
      return; // Prevent submission if any field is empty
    }

    // Check if the username is unique before submitting
    const isUnique = this.isUsernameUnique(this.postData.username);
    if (!isUnique) {
      const alert = await this.alertController.create({
        header: 'Error',
        message: 'Username is not unique. Please choose a different username.',
        buttons: ['OK']
      });
      await alert.present();
      return; // Prevent submission if username is not unique
    }
  
    this.http.post('http://localhost:3000/users', this.postData).subscribe(response => {
      console.log('Data posted successfully:', response);
      // Optionally, you can display a success message or clear the form here
      this.fetchDataFromServer(); // Reload data after posting
      window.location.reload();
    });
  }
  

  private isUsernameUnique(username: string): boolean {
    return !this.fetchedData.some((user: { username: string }) => user.username === username);
  }

  private fetchDataFromServer() {
    this.http.get('http://localhost:3000/users').subscribe((response: any[]) => {
      console.log('Data fetched successfully:', response);
      this.fetchedData = response; // Update fetchedData with the response from the server
    }, error => {
      console.error('Error fetching data:', error);
    });
  }

  toggleChange() {
    this.themeToggle = !this.themeToggle;
    const prefersDark = this.themeToggle;
    document.body.classList.toggle('dark', prefersDark);
    // Update the icon name based on the theme toggle
    const icon = document.querySelector('ion-icon');
    if (icon) {
      icon.setAttribute('name', prefersDark ? 'moon-outline' : 'sunny-outline');
    }
  }
}
