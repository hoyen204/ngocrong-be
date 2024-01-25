import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class CreatePostDto {
  @MaxLength(155, {
    message: 'Title is over 155 characters.',
  })
  @IsNotEmpty({
    message: 'Title can not be empty',
  })
  title: string;

  @IsNotEmpty({
    message: 'Content can not be empty',
  })
  content: string;

  isNotitication: boolean;
  status: 'WAITING_FOR_APPROVAL' | 'APPROVED' | 'PROCESSED' | 'LOCKED' =
    'APPROVED';

  state: 'NONE' | 'HOT' | 'NEW' = 'NONE';
}
