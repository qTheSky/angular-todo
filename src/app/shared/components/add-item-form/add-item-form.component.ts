import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-add-item-form',
  templateUrl: './add-item-form.component.html',
  styleUrls: ['./add-item-form.component.scss']
})

export class AddItemFormComponent {
  @Input() addItemCallBack!: (title: string) => void

  title = ''

  constructor() {
  }

  onClickAddItemHandler() {
    this.addItemCallBack(this.title)
    this.title = ''
  }

}
