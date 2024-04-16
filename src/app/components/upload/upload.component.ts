import blocksStyles from '@uploadcare/blocks/web/lr-file-uploader-regular.min.css?url';
import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';


@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrl: './upload.component.css',
})
export class UploadComponent {
  blocksStyles = blocksStyles;
}
