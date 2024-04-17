import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '@auth0/auth0-angular';

@Component({
  selector: 'app-image-gallery',
  templateUrl: './image-gallery.component.html',
  styleUrls: ['./image-gallery.component.css']
})
export class ImageGalleryComponent implements OnInit {
  imageUrls: string[] = [];
  isloading: any;

  constructor(private route: ActivatedRoute, public auth: AuthService) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const navigation = window.history.state;
      if (navigation && navigation.images) {
        this.imageUrls = navigation.images;
      }
    });
  }
}
