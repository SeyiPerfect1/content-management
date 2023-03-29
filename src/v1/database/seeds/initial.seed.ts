import { Factory, Seeder } from "typeorm-seeding";
import { DataSource } from "typeorm";
import { User } from "../../users/entities/user.entity";
import { Post } from "../../posts/entities/post.entity";

export default class InitialDatabaseSeed implements Seeder {
  public async run(factory: Factory, connectio: DataSource): Promise<void> {
    
    const users = await factory(User)().createMany(15);

    await factory(Post)()
      .map(async (post) => {
        post.user = users[Math.floor(Math.random() * users.length)];
        return post;
      })
      .createMany(100);
  }
}