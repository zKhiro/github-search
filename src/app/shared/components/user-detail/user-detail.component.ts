import { Subscription, tap } from 'rxjs';

import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { RequestClass } from '@classes';
import { CommitModel } from '@models/commits.model';
import { SelectOptionModel } from '@models/input.model';
import { UserDetailContentModel, UserDetailModel } from '@models/user.model';
import { CommitsService, UserService } from '@services';

import { HideBodyScrollDirective } from '../../directives/hide-body-scroll.directive';
import { BarChartComponent } from '../bar-chart/bar-chart.component';
import { CommitsComponent } from '../commits/commits.component';
import { EmptyStateComponent } from '../empty-state/empty-state.component';
import { IconCrossComponent } from '../icons/icon-cross/icon-cross.component';
import { InputSelectComponent } from '../inputs/input-select/input-select.component';
import { LoadingComponent } from '../loading/loading.component';
import { RepositoryComponent } from '../repository/repository.component';


@Component({
  selector: 'app-user-detail',
  standalone: true,
  imports: [
    CommonModule,

    IconCrossComponent,

    BarChartComponent,
    CommitsComponent,
    EmptyStateComponent,
    InputSelectComponent,
    LoadingComponent,
    RepositoryComponent,

    HideBodyScrollDirective,
  ],
  providers: [
    CommitsService,
  ],
  templateUrl: './user-detail.component.html',
  styleUrl: './user-detail.component.scss'
})
export class UserDetailComponent implements OnInit, OnDestroy {
  private _isOpen: boolean;
  @Input() set isOpen(newValue: boolean) {
    this._isOpen = newValue;
    this.isOpenChange.emit(newValue);

    if(this._isOpen) {
      const currentYear = new Date().getFullYear();

      this.commitFilterForm.setValue({
        month: new Date().getMonth() + 1,
        year: currentYear,
      });

      this.yearOptions = [{ label: currentYear.toString(), value: currentYear }]

      this.requestUserDetails();
    } else {
      this.commitsServices.firstCommitYear = '';
    }
  };
  get isOpen() { return this._isOpen; }

  @Output() isOpenChange = new EventEmitter<boolean>();

  @Input() user: UserDetailContentModel;

  readonly monthOptions: SelectOptionModel<number>[] = [
    { label: 'Jan.', value: 1 },
    { label: 'Fev.', value: 2 },
    { label: 'Mar.', value: 3 },
    { label: 'Abr.', value: 4 },
    { label: 'Mai.', value: 5 },
    { label: 'Jun.', value: 6 },
    { label: 'Jul.', value: 7 },
    { label: 'Ago.', value: 8 },
    { label: 'Set.', value: 9 },
    { label: 'Out.', value: 10 },
    { label: 'Nov.', value: 11 },
    { label: 'Dez.', value: 12 },
  ];

  commitFilterForm = new FormGroup({
    month: new FormControl(),
    year: new FormControl(),
  });

  yearOptions: SelectOptionModel<number>[];

  userDetailRequest: RequestClass<UserDetailModel>;
  commitsRequest: RequestClass<CommitModel[]>;

  commitFilterFormChanges: Subscription;


  constructor(
    protected readonly userService: UserService,
    protected readonly commitsServices: CommitsService,
  ) {}

  ngOnInit() {
    this.commitFilterFormChanges = this.commitFilterForm.valueChanges.pipe(
      tap(() => {
        this.requestCommits();
      }),
    ).subscribe();
  }

  ngOnDestroy(): void {
    this.commitFilterFormChanges.unsubscribe();
  }

  protected closeCard() {
    this.isOpen = false;
  }

  private requestUserDetails() {
    this.userDetailRequest = new RequestClass(this.userService.getUserDetails(this.user.username));

    this.userDetailRequest.observable$ = this.userDetailRequest.observable$.pipe(
      tap(response => this.userDetailRequest.response = response),
    );

    this.userDetailRequest.subscribe();
  }

  private requestCommits() {
    this.commitsRequest = new RequestClass(this.commitsServices.getCommits({
      author: this.user.username,
      month: this.commitFilterForm.value.month!,
      year: this.commitFilterForm.value.year!
    }));

    this.commitsRequest.observable$ = this.commitsRequest.observable$.pipe(
      tap(response => {
        const currentYear = new Date().getFullYear();

        if(this.commitsServices.firstCommitYear) {
          this.yearOptions = Array.from({ length: (currentYear - new Date(this.commitsServices.firstCommitYear).getFullYear()) }, (_, key) => {
            const year = currentYear - key;

            return { label: year.toString(), value: year };
          });
        }

        if(response.length) {
          this.commitsRequest.response = response.slice(0, this.commitsServices.maxVisibleCommits);
        }
      }),
    );

    this.commitsRequest.subscribe();
  }
}
