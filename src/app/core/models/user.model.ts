import { SearchResponseModel } from './response.model';


export type UserSearchResponseType              = SearchResponseModel<UserSearchResponseModel>;
export type UserSearchResponseWithoutScoreType  = Omit<UserSearchResponseModel, 'score'>;
export type TechMap                             = Map<string, number>;

export interface UserResultCardModel {
  username: string;
  profilePicture: string;
  techs: TechMap;
  favorite: boolean;
}

export interface UserDetailModel {
  bio: string;
  followers: number;
  following: number;
  link: string;
  name: string;
}

export interface TechModel {
  name: string;
  percentage: number;
}

export interface UserSearchResponseModel {
  login: string;
  id: number;
  node_id: string;
  avatar_url: string;
  gravatar_id: string;
  url: string;
  html_url: string;
  followers_url: string;
  following_url: string;
  gists_url: string;
  starred_url: string;
  subscriptions_url: string;
  organizations_url: string;
  repos_url: string;
  events_url: string;
  received_events_url: string;
  type: string;
  site_admin: boolean;
  score: number;
}

export interface UserResponseModel {
  login: string;
  id: number;
  node_id: string;
  avatar_url: string;
  gravatar_id: string;
  url: string;
  html_url: string;
  followers_url: string;
  following_url: string;
  gists_url: string;
  starred_url: string;
  subscriptions_url: string;
  organizations_url: string;
  repos_url: string;
  events_url: string;
  received_events_url: string;
  type: string;
  site_admin: boolean;
  name: string;
  company: string;
  blog: string;
  location: string;
  email: string;
  hireable: boolean;
  bio: string;
  twitter_username: string;
  public_repos: number;
  public_gists: number;
  followers: number;
  following: number;
  created_at: string;
  updated_at: string;
}
