import { Component, Input, OnInit, Output, EventEmitter, TemplateRef } from '@angular/core';
import { NbDialogService } from '@nebular/theme';
import { Category } from '../../models/category.model';
import { CategoryService } from '../../services/category.service';
import { FileUploader } from 'ng2-file-upload';
import { NbAuthService } from '@nebular/auth';

@Component({
    template: `
    <!-- IMAGE DIALOG -->
    <ng-template #imageDialog let-data let-ref="dialogRef">
        <nb-card [size]="'small'">
            <nb-card-header>{{category.name}}</nb-card-header>
            <nb-card-body>
                <h6>Image</h6>
                <button (click)="imgInput.click()" style="margin-bottom: 1rem" nbButton
                    [disabled]="imgUploader.getNotUploadedItems().length">Upload</button>
                <input style="visibility: hidden; width: 0px; height:0px;" type="file" #imgInput ng2FileSelect
                    [uploader]="imgUploader" accept="image/*" />
                <button type="button" style="margin-left: 1rem; margin-bottom: 1rem" nbButton (click)="imgUploader.uploadAll()"
                    [disabled]="!imgUploader.getNotUploadedItems().length">
                    <nb-icon icon="upload-outline" style="color: white"></nb-icon> {{ imgUploader?.queue?.length }} file(s)
                </button>
                <button type="button" style="margin-left: 1rem; margin-bottom: 1rem" nbButton status="danger"
                    (click)="imgUploader.clearQueue();" [disabled]="!imgUploader.getNotUploadedItems().length">
                    <nb-icon icon="trash-2-outline" style="color: white"></nb-icon>
                </button>
                <nb-list>
                    <nb-list-item>
                        <span *ngIf="!category.imageUrl" style="color: red">No file uploaded!</span>
                        <nb-actions size="small" *ngIf="category.imageUrl">
                            <nb-action> {{ category.imageUrl.split('_').slice(1).join('_') }} </nb-action>
                            <nb-action icon="eye-outline" [nbPopover]="template" nbPopoverPlacement="right"></nb-action>
                            <nb-action icon="trash-2-outline" (click)="deleteImage(image)"></nb-action>
                            <ng-template #template let-data>
                                <nb-card style="margin: 0">
                                    <nb-card-body>
                                        <img src="{{category.imageUrl}}" width="300px">
                                    </nb-card-body>
                                </nb-card>
                            </ng-template>
                        </nb-actions>
                    </nb-list-item>
                </nb-list>
            </nb-card-body>
            <nb-card-footer>
                <button (click)="ref.close()" nbButton status="danger">Close Dialog</button>
            </nb-card-footer>
        </nb-card>
    </ng-template>

    <!-- Edit Dialog -->
    <ng-template #editDialog let-data let-ref="dialogRef">
        <nb-card>
            <nb-card-header>Edit category</nb-card-header>
            <nb-card-body>
            <h6 for="name">Name</h6>
            <input type="text" nbInput fullWidth class="form-control" id="name" [(ngModel)]="category.name" name="name"
                style="margin-bottom: 1rem" required>

            </nb-card-body>
            <nb-card-footer>
                <button (click)="ref.close()" nbButton status="danger" style="margin-right: 1rem;">Cancel</button>
                <button (click)="editCategory();ref.close()" nbButton>Save</button>
            </nb-card-footer>
        </nb-card>
    </ng-template>

    <!-- Delete Dialog -->
    <ng-template #deleteDialog let-data let-ref="dialogRef">
        <nb-card>
            <nb-card-header>Delete category</nb-card-header>
            <nb-card-body>
                <h5>Do you want to delete "{{category.name}}"?</h5>
            </nb-card-body>
            <nb-card-footer>
                <button (click)="ref.close()" nbButton status="danger" style="margin-right: 1rem;">Cancel</button>
                <button (click)="deleteCategory();ref.close()" nbButton>Delete</button>
            </nb-card-footer>
        </nb-card>
    </ng-template>

    <nb-actions size="small">
        <nb-action icon="image-outline" (click)="open(imageDialog)"></nb-action>
        <nb-action icon="edit-2-outline" (click)="open(editDialog)"></nb-action>
        <nb-action icon="trash-2-outline" (click)="open(deleteDialog)"></nb-action>
    </nb-actions>
    `,
})

export class ActionRenderComponent implements OnInit {

    @Input() value;

    @Output() save: EventEmitter<any> = new EventEmitter();

    category: Category;
    imgUploader: FileUploader;
    token: string;

    constructor(
        private dialogService: NbDialogService,
        private categoryService: CategoryService,
        private tokenService: NbAuthService,
    ) {
    }

    ngOnInit() {
        this.category = this.value;
        this.tokenService.getToken().subscribe(res => this.token = (res as any).token);

        this.imgUploader = new FileUploader({
            url: 'http://54.255.195.251/vat-api/api/upload-file',
            method: 'POST',
            authTokenHeader: 'authorization',
            authToken: 'Bearer ' + this.token,
            itemAlias: 'files'
        });
        this.imgUploader.onAfterAddingFile = (file) => { file.withCredentials = false; };
        this.imgUploader.onSuccessItem = (item, response) => {
            var name: string = response.substring(1, response.length - 1);
            this.addImage(name);
        };
        this.imgUploader.onCompleteAll = () => {
            this.imgUploader.clearQueue();
        };
    }

    deleteCategory() {
        this.categoryService.deleteCategory(this.value.id).subscribe(res => {
            this.save.emit();
        });
    }

    addImage(image: string) {
        this.category.imageUrl = 'http://54.255.195.251/vat-api/image/' + image;
        this.categoryService.updateCategory(this.category).subscribe(res => {
            this.save.emit();
        })
    }

    editCategory() {
        this.categoryService.updateCategory(this.category).subscribe(res => {
            this.save.emit();
        });
    }

    open(dialog: TemplateRef<any>) {
        this.dialogService.open(dialog, { hasBackdrop: true, hasScroll: true, autoFocus: false, closeOnEsc: false })
    }
}
