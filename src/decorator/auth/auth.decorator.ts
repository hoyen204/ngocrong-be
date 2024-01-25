import { SetMetadata } from '@nestjs/common';
import { constants } from 'src/common/constants';

export const PublicEndpoint = () =>
  SetMetadata(constants.IS_PUBLIC_ENDPOINT, true);
