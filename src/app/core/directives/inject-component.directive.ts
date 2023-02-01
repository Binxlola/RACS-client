import {ComponentRef, Directive, Input, OnInit, ViewContainerRef} from '@angular/core';
import {RosterComponent} from "../../features/roster/roster.component";

@Directive({
  selector: '[injectComponent]',
})
export class InjectComponent implements OnInit{

  @Input() injectComponent: typeof RosterComponent | undefined;

  constructor(private _viewContainerRef: ViewContainerRef) { }

  ngOnInit(): void {
    if(this.injectComponent) {
      const component: ComponentRef<any> = this._viewContainerRef.createComponent(this.injectComponent);
      (component.instance as RosterComponent).isDashboard = true;
      this._viewContainerRef.insert(component.hostView, 0);
    }
  }

}
