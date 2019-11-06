import { Component, Input, OnInit } from '@angular/core';


@Component({
    template: `
    <span nbTooltip="{{value}}" nbTooltipStatus="basic" status="basic" nbTooltipPlacement="right">
        {{value.substr(0, 50)}}{{value.length < 20 ? '' : '...'}}
    </span>
    `,
})
export class DescriptionRenderComponent implements OnInit {

    public shortDescript;

    @Input() value: string;

    constructor() {
    }

    ngOnInit() {
        this.value.substr(0, 20);
    }


}
