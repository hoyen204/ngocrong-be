import { IsNotEmpty } from 'class-validator';
import { Match } from 'src/decorator';

export class SignUpDto {
  @IsNotEmpty({
    message: 'Username can not be empty',
  })
  username: string;

  @IsNotEmpty({
    message: 'Password can not be empty',
  })
  password: string;

  @IsNotEmpty({
    message: 'Confirm password can not be empty',
  })
  @Match('password', {
    message: 'Confirm password is not match',
  })
  // @Equals((o) => o.password)
  confirmPassword: string;
}
