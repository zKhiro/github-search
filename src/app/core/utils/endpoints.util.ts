import { ObjectModel } from '@models/generic.model';


export const BASE_ENDPOINT    = 'https://api.github.com/';
export const PER_PAGE_DEFAULT = '9';

// LocalStorage
export const LS_FAVORITE = 'Favorites';


export enum GithubEndpoints {
  /** ?q={query}{&page,per_page,sort,order} */
  Commits           = 'search/commits',
  /** ?q={query}{&page,per_page,sort,order} */
  RepositorySearch  = 'search/repositories',
  User              = 'users/{user}',
  /** {?type,page,per_page,sort} */
  UserRepositories  = 'users/{user}/repos',
  /** ?q={query}{&page,per_page,sort,order} */
  UserSearch        = 'search/users',
}

export function prepareGithubEndpoint(url: GithubEndpoints, params?: ObjectModel<string>): string {
  let newUrl: string = url;

  if (params) {
    newUrl = replaceParams(url, params);
  }

  return BASE_ENDPOINT + newUrl;
}

function replaceParams(url: string, params: ObjectModel<string>): string {
  Object.keys(params).forEach(param => {
    const replaceRegEx = new RegExp('\{([' + param + ']+)\}', 'g');

    url = url.replaceAll(replaceRegEx, params[param]);
  });

  return url;
}