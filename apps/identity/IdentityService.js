import User from '../../models/users';
import { GenericException } from '../../utils/exceptions';
import {
  CacheManager,
  NotificatonManager,
  PasswordManager,
  RandomNumberGeneratorManager,
  TokenManager,
} from '../../utils/helpers';

class IdentityOnboardingService {
  static async createUserAccount({ firstName, lastName, email, password, accountType }) {
    const isUserExisting = await User.findOne({ where: { email } });
    if (isUserExisting) throw new GenericException('A user with this email already exists', 409);
    const createdUser = await User.create({ firstName, lastName, email, password, accountType });

    const verificationCode = RandomNumberGeneratorManager.generateRandHex();
    CacheManager.saveToCache(
      `user:verification:${verificationCode}`,
      JSON.stringify({ isUserVerified: false, userEmail: createdUser.email }),
      30 * 60
    );

    NotificatonManager.sendMail(
      createdUser.email,
      'Verify your shoe shop account',
      `<a href=https://shoe-shop-front.herokuapp.com/verfiy/${verificationCode}>Verify your account</a>`
    );

    return { id: createdUser.id, firstName, lastName };
  }

  static async verifyUserAccount({ verificationCode, verificationData }) {
    await User.update({ state: 'ACTIVE' }, { where: { email: verificationData.userEmail } });
    CacheManager.deleteFromCache(`user:verification:${verificationCode}`);
    return {
      status: 'User account verified and activated.',
    };
  }

  static async loginUserAccount({ email, password }) {
    const user = await User.findOne({ where: { email } });

    if (!user) throw new GenericException('A user with this email does not exist', 404);

    const isValidPasword = await PasswordManager.comparePassword(user.password, password);

    if (!isValidPasword) throw new GenericException('Incorrect email or password entered', 401);

    if (user.state !== 'ACTIVE') throw new GenericException('Kindly verify your account', 401);

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

  // static async initiateUserPasswordReset({ firstName, lastName, email, password, accountType }) {}
  // static async completeUserPasswordReset({ firstName, lastName, email, password, accountType }) {}
}

export { IdentityOnboardingService };

// dvyeenwwgffhypgk
