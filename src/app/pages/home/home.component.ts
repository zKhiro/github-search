import { Observable, tap } from 'rxjs';

import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { RequestPaginationClass } from '@classes';
import { RepositoryContentModel, RepositoryResponseType } from '@models/repository.model';
import { UserResultCardModel, UserSearchResponseType } from '@models/user.model';
import { RepositoryService, UserDetailService, UserService } from '@services';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {

  filterForm = new FormGroup({
    search: new FormControl<string>('', [ Validators.required ]),
    user: new FormControl(false),
    repository: new FormControl(false),
  });

  userSearchRequest: RequestPaginationClass<UserSearchResponseType, UserResultCardModel[]>;
  repositorySearchRequest: RequestPaginationClass<RepositoryResponseType, RepositoryContentModel[]>;

  currentSearch: typeof this.filterForm.value;


  constructor(
    private readonly userService: UserService,
    private readonly repositoryService: RepositoryService,
    protected readonly userDetailService: UserDetailService,
  ) {}

  performSearch() {
    this.filterForm.updateValueAndValidity();

    if (this.filterForm.controls.search.valid) {
      this.currentSearch = this.filterForm.value;

      this.currentSearch.search = this.filterForm.controls.search.value!;

      if (this.currentSearch.user || !this.currentSearch.repository) {
        this.searchUser(this.currentSearch.search);
      }

      if (this.currentSearch.repository || !this.currentSearch.user) {
        this.searchRepository(this.currentSearch.search);
      }

      this.filterForm.controls.search.reset();
    }
  }

  searchUser(query: string, pagination?: boolean) {
    this.userSearchRequest = new RequestPaginationClass<UserSearchResponseType, UserResultCardModel[]>(
      this.userService.searchUser(query, pagination),
    );

    this.userSearchRequest.observable$ = this.userService.mapUserSearch(
      this.userSearchRequest.observable$ as Observable<UserSearchResponseType>
    ).pipe(
      tap(response => {
        this.userSearchRequest.response = response;
      })
    );

    this.userSearchRequest.subscribe();
  }

  searchRepository(query: string, pagination?: boolean) {
    this.repositorySearchRequest = new RequestPaginationClass<RepositoryResponseType, RepositoryContentModel[]>(
      this.repositoryService.searchRepository(query, pagination),
    );

    this.repositorySearchRequest.observable$ = this.repositoryService.mapSearchRepository(
      this.repositorySearchRequest.observable$ as Observable<RepositoryResponseType>
    ).pipe(
      tap(respose => this.repositorySearchRequest.response = respose),
    );

    this.repositorySearchRequest.subscribe();
  }
}
