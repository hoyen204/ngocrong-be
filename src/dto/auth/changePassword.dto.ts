import { IsNotEmpty } from 'class-validator';
import { Match } from 'src/decorator';
import { NotMatch } from 'src/decorator/validate/notMatch.decorator';

export class ChangePasswordDto {
  @IsNotEmpty({
    message: 'Current password can not be empty',
  })
  currPassword: string;

  @IsNotEmpty({
    message: 'New password can not be empty',
  })
  @NotMatch('currPassword', {
    message: 'New password same as current password',
  })
  newPassword: string;

  @IsNotEmpty({
    message: 'Confirm password can not be empty',
  })
  @Match('newPassword', {
    message: 'Confirm password is not match',
  })
  // @Equals((o) => o.password)
  confirmPassword: string;
}
