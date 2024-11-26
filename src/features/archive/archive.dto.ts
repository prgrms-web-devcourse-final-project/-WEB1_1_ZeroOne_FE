import type { Color } from './colors.type';

import type { ApiResponse } from '@/shared/api';

export interface BaseArchiveDTO {
  title: string;
  description: string;
  type: Color;
  canComment: boolean;
  tags: { content: string }[];
  imageUrls: { url: string }[];
}

export interface PostArchiveResponseDTO {
  archiveId: number;
}

export interface Archive extends BaseArchiveDTO {
  username: string;
  job: string;
  likeCount: number;
  commentCount: number;
  hits: number;
}

export type PostArchiveApiResponse = ApiResponse<PostArchiveResponseDTO>;
export type GetArchiveApiResponse = ApiResponse<Archive>;
