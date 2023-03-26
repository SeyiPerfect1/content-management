import { IsNotEmpty } from 'class-validator';
import { Length, Matches } from 'class-validator';

const emailRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*#?&]+$/;

export class createUserDTO {
  @IsNotEmpty({ message: 'please, kindly provide first name' })
  firstName: string;

  @IsNotEmpty({ message: 'please, kindly provide last name' })
  lastName: string;

  @IsNotEmpty({ message: 'please, kindly provide a valid email' })
  @Matches(emailRegex, {
    message: 'please, kindly provide a valid email',
  })
  email: string;

  @IsNotEmpty()
  @Length(6, 255)
  @Matches(passwordRegex, {
    message: 'password must be alphanumeric with at least a special character',
  })
  password: string;

  confirmationCode: string;
}
