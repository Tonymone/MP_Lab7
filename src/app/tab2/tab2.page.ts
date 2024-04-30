import { Component, OnInit } from '@angular/core';
import { User, UserCrudServiceService } from '../services/user-crud-service.service';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit {
  themeToggle = true;
  fetchedData: User[] = [];

  constructor(private userCrudService: UserCrudServiceService, private navCtrl: NavController) {}

  ngOnInit() {
    // Fetch data from the server when the component is initialized
    this.fetchDataFromServer();
  }

  fetchDataFromServer() {
    this.userCrudService.getUsers().subscribe(
      (response: User[]) => {
        console.log('Data fetched successfully:', response);
        this.fetchedData = response;
      },
      (error) => {
        console.error('Error fetching data:', error);
      }
    );
  }

  deleteUser(username: string) {
    this.userCrudService.deleteUser(username).subscribe(
      () => {
        console.log('User deleted successfully.');
        // After deletion, fetch the updated user list
        this.fetchDataFromServer();
        window.location.reload();
      },
      (error) => {
        console.error('Error deleting user:', error);
      }
    );
  }

  editUserDetails(user: User) {
    // Navigate to Tab1Page and pass the user details as parameters
    this.navCtrl.navigateForward(['/tabs/tab1'], {
      queryParams: { user: JSON.stringify(user) }
    });
    this.deleteUser(user.username);
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
