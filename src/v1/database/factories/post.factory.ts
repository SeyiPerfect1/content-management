import { randFutureDate, randNumber, randParagraph, randPastDate, randWord  } from "@ngneat/falso";
import { Post } from "src/v1/posts/entities/post.entity";
import { define } from "typeorm-seeding";


define(Post, () => {
    const post = new Post();
    post.title = randWord()
    post.description = randWord()
    post.body = randParagraph()
    post.viewCount = randNumber()
    // post.user = randUser({randFirstName,})
    post.createdAt = randPastDate()
    post.updatedAt = randFutureDate()

    return post;
  });