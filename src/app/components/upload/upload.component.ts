import { Component, EventEmitter, Output } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.css'],
})
export class UploadComponent {
  @Output() fileUploaded = new EventEmitter<string>();

  constructor(private storage: AngularFireStorage) {}

  uploadFile(event: any) {
    const file = event.target.files[0];
    const filePath = 'path/to/upload';
    const fileRef = this.storage.ref(filePath);
    const uploadTask = this.storage.upload(filePath, file);

    uploadTask
      .snapshotChanges()
      .pipe(
        finalize(() => {
          fileRef.getDownloadURL().subscribe((downloadURL) => {
            this.fileUploaded.emit(downloadURL); // Emit the download URL
          });
        })
      )
      .subscribe();
  }
}
