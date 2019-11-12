import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';


@Component({
    template: `
    {{value.name}}<nb-icon *ngIf="!this.value.masterCategoryId" 
    icon="corner-down-right-outline" status="basic" style="cursor: pointer"
    (click)="loadSubCategory()"></nb-icon>
  `,
})
export class SubCategoryRenderComponent implements OnInit {

    public renderValue;
    actived: boolean;

    @Input() value;

    @Output() save: EventEmitter<any> = new EventEmitter();

    constructor() { }

    ngOnInit() {
    }

    loadSubCategory() {
        this.save.emit(this.value);
    }
}
