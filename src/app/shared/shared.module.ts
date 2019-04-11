import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { AngularMaterialModule } from './modules/angular-material.module';
import { ErrorDialogComponent } from './components/error-dialog/errordialog.component';
import { ErrorDialogService } from './services/errordialog.service';
import { ToolbarComponent } from './components/toolbar/toolbar.component';

@NgModule({
  declarations: [ErrorDialogComponent, ToolbarComponent],
  imports: [CommonModule, AngularMaterialModule],
  exports: [CommonModule, TranslateModule, AngularMaterialModule, ToolbarComponent],
  providers: [ErrorDialogService],
  entryComponents: [ErrorDialogComponent],
})
export class SharedModule {}
