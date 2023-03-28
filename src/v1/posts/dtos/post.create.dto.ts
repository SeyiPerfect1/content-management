import { IsNotEmpty } from 'class-validator';
import { Length } from 'class-validator';

export class createPostDTO {
  @IsNotEmpty({ message: 'please, kindly provide post title' })
  title: string;

  @Length(6, 255)
  description: string;

  @IsNotEmpty({ message: 'please, kindly provide a post body' })
  body: string;

  @IsNotEmpty({ message: 'please, kindly provide a post body' })
  userId: string;
}
