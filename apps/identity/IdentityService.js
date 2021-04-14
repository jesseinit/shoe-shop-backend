import User from '../../models/users';
import { GenericException } from '../../utils/exceptions';
import { PasswordManager, TokenManager } from '../../utils/helpers';

class IdentityOnboardingService {
  static async createUserAccount({ firstName, lastName, email, password, accountType }) {
    const isUserExisting = await User.findOne({ where: { email } });
    if (isUserExisting) throw new GenericException('A user with this email already exists', 409);
    const createdUser = await User.create({ firstName, lastName, email, password, accountType });
    return { id: createdUser.id, firstName, lastName };
  }

  // static async verifyUserAccount({ verificationCode }) {}
  // static async initiateUserPasswordReset({ firstName, lastName, email, password, accountType }) {}
  // static async completeUserPasswordReset({ firstName, lastName, email, password, accountType }) {}

  static async loginUserAccount({ email, password }) {
    const user = await User.findOne({ where: { email } });

    if (!user) throw new GenericException('A user with this email does not exist', 404);

    const isValidPasword = await PasswordManager.comparePassword(user.password, password);

    if (!isValidPasword) throw new GenericException('Incorrect email or password entered', 401);

    // if (user.state !== 'ACTIVE') throw new GenericException('Kindly verify your account', 401);

    const token = await TokenManager.signClaim({ userId: user.id });

    return {
      token,
      userData: {
        userId: user.id,
        userFullname: `${user.firstName} ${user.lastName}`,
        userAccountType: user.accountType,
        userAvatar: user.avatarUrl,
        userCreatedAt: user.createdAt,
      },
    };
  }
}

export { IdentityOnboardingService };

// dvyeenwwgffhypgk
