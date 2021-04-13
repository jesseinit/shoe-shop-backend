import User from '../../models/users';
import { GenericException } from '../../utils/exceptions';

class IdentityOnboardingService {
  static async createUserAccount({ firstName, lastName, email, password, accountType }) {
    const isUserExisting = await User.findOne({ where: { email } });
    if (isUserExisting) throw new GenericException('A user with this email already exists', 409);
    const createdUser = await User.create({ firstName, lastName, email, password, accountType });
    return { id: createdUser.id, firstName, lastName };
  }

  // static async verifyUserAccount({ firstName, lastName, email, password, accountType }) {}
  // static async initiateUserPasswordReset({ firstName, lastName, email, password, accountType }) {}
  // static async completeUserPasswordReset({ firstName, lastName, email, password, accountType }) {}
}

export { IdentityOnboardingService };

// dvyeenwwgffhypgk
