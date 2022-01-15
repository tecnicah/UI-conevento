import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {
  

  constructor(public router: Router) { }

  ngOnInit(): void {
  }


  public openTInNewWindow() {
    // Converts the route into a string that can be used 
    // with the window.open() function
    const url = this.router.serializeUrl(this.router.createUrlTree(['/terminos'])
    );
    window.open("https://my.premierds.com/test/terminos", '_blank');
   // window.open(url, '_blank');
  }

  public openAInNewWindow() {
    // Converts the route into a string that can be used 
    // with the window.open() function
    const url = this.router.serializeUrl(
      this.router.createUrlTree(['/aviso'])
    );
    window.open("https://my.premierds.com/test/aviso", '_blank');
   // window.open(url, '_blank');
  }
}
