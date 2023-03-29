import { randFirstName, randBoolean, randEmail, randFutureDate, randLastName, randPassword, randPastDate,} from "@ngneat/falso";
import { User } from "src/v1/users/entities/user.entity";
import { define } from "typeorm-seeding";


define(User, () => {
    const user = new User();
    user.firstName = randFirstName()
    user.lastName = randLastName()
    user.email = randEmail()
    user.password = randPassword()
    user.confirmationCode = randFirstName()
    user.isActive = randBoolean()
    user.createdAt = randPastDate()
    user.updatedAt = randFutureDate()

    return user
})