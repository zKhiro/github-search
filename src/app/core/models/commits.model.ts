import { RepositoryResponseModel } from './repository.model';
import { SearchResponseModel } from './response.model';
import { UserSearchResponseWithoutScoreType } from './user.model';


export type CommitSearchResponseType = SearchResponseModel<CommitSearchResponseModel>;

export interface CommitModel {
  authorUsername: string;
  link: string;
  message: string;
  repository: {
    link: string;
    name: string;
    owner: {
      link: string;
      username: string;
    }
  }
  totalCommits: number;
}

export interface CommitQueryParamModel {
  /** `?q=author:{this}` */
  author: string;
  /** `?q=author:{author}ANDcommitter-date:>{year}-{this}-01` */
  month: string | number;
  /** `?q=author:{author}ANDcommitter-date:>{this}-{month}-01` */
  year: string | number;
}

export interface CommitSearchResponseModel {
  url: string;
  sha: string;
  node_id: string;
  html_url: string;
  comments_url: string;
  commit: {
    url: string;
    author: CommitterResponseModel;
    committer: CommitterResponseModel;
    message: string;
    tree: {
      url: string;
      sha: string;
    },
    comment_count: number;
  },
  author: UserSearchResponseWithoutScoreType;
  committer: UserSearchResponseWithoutScoreType;
  parents: [
    {
      url: string;
      html_url: string;
      sha: string;
    }
  ],
  repository: RepositoryResponseModel,
  score: number;
}

export interface CommitterResponseModel {
  date: string;
  name: string;
  email: string;
}
