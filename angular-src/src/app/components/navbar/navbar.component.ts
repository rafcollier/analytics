import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(
    public authService: AuthService,
    private router: Router

    ) { }

  ngOnInit() {
  }

  isIn = false;
  toggleState() {
    let bool = this.isIn;
    this.isIn = bool === false ? true : false;
  }

  onRefreshHome(){
    console.log("Refresh Homepage");
    this.router.navigateByUrl('/dummy', {skipLocationChange:true});
    setTimeout(()=>this.router.navigate(['']));
    return false;
  }

}
