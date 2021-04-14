import nodemailer from 'nodemailer';
import redis from 'redis';
import uuid from 'uuid';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const { MAIL_USER, MAIL_PASS, REDIS_URL, HASH_SALT, SECRET_KEY } = process.env;

class NotificatonManager {
  static mailTransporter() {
    return nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: MAIL_USER,
        pass: MAIL_PASS,
      },
    });
  }

  static sendMail(userEmail, subject, htmlContent) {
    const mailOptions = {
      from: MAIL_USER,
      to: userEmail,
      subject: subject,
      html: htmlContent,
    };

    this.mailTransporter().sendMail(mailOptions, function (err, info) {
      if (err) throw new Error(`Mail was not sent to ${userEmail}`);
    });
  }
}

class CacheManager {
  cacheClient = redis.createClient({ url: REDIS_URL });
}

class RandomNumberGeneratorManager {
  static generateRandHex() {
    const buffer = Buffer.alloc(16);
    uuid.v4({}, buffer);
    return buffer.toString('hex');
  }
}

class PasswordManager {
  static async comparePassword(hashedPassword, unhashedPassword) {
    return await bcrypt.compare(unhashedPassword, hashedPassword);
  }

  static async hashPassword(unhashedPassword) {
    return await bcrypt.hash(unhashedPassword, parseInt(HASH_SALT));
  }
}

class TokenManager {
  static async signClaim(claim, ttl = '2d') {
    return await jwt.sign(claim, SECRET_KEY, { expiresIn: ttl });
  }
  static async verifyClaim(token) {}
}

export {
  NotificatonManager,
  CacheManager,
  RandomNumberGeneratorManager,
  PasswordManager,
  TokenManager,
};
