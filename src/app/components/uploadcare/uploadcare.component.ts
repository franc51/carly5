import { Component, ViewChild, ElementRef } from '@angular/core';
import * as LR from '@uploadcare/blocks';
import { OutputFileEntry } from '@uploadcare/blocks';

@Component({
  selector: 'app-uploadcare',
  templateUrl: './uploadcare.component.html',
  styleUrls: ['./uploadcare.component.css']
})
export class UploadcareComponent {files: OutputFileEntry<'success'>[] = [];

@ViewChild('ctxProvider', { static: true }) ctxProviderRef!: ElementRef<
  InstanceType<LR.UploadCtxProvider>
>;

ngOnInit() {
  this.ctxProviderRef.nativeElement.addEventListener(
    'change',
    this.handleChangeEvent,
  );
}

ngOnDestroy() {
  this.ctxProviderRef.nativeElement.removeEventListener(
    'change',
    this.handleChangeEvent,
  );
}

handleChangeEvent = (event: LR.EventMap['change']) => {
  this.files = event.detail.allEntries.filter((file) => file.status === 'success') as OutputFileEntry<'success'>[];

console.log(this.files[0].cdnUrl);
};
}
