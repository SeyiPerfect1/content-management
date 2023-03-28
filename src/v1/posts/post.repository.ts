import { Repository } from 'typeorm';
import { Post } from './entities/post.entity';

export class PostsRepository extends Repository<Post> {
}