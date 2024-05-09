import { Subject } from 'rxjs';

import { Injectable } from '@angular/core';
import { UserResultCardModel } from '@models/user.model';
import { UserDetailEvent } from '@utils';


@Injectable({
  providedIn: 'root'
})
export class UserDetailService {

  readonly events = new Subject<UserDetailEvent>();

  private _isOpen: boolean;
  private set isOpen(newValue: boolean) {
    this._isOpen = newValue;
  }

  get isOpen(): boolean {
    return this._isOpen;
  }
  private _content: UserResultCardModel;
  private set content(newValue: UserResultCardModel) {
    this._content = newValue;
  }

  get content(): UserResultCardModel {
    return this._content;
  }


  open(content: UserResultCardModel) {
    this.content = content;
    this.isOpen = true;

    this.events.next(UserDetailEvent.Open);
  }

  close() {
    this.isOpen = false;

    this.events.next(UserDetailEvent.Close);
  }

}
