import { SetMetadata } from '@nestjs/common';

export const PUBLIC_KEY = 'isPublic';
export const ISPublic = () => SetMetadata(PUBLIC_KEY, true);
