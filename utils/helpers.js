import nodemailer from 'nodemailer';
import redis from 'redis';
import { v4 as uuidv4 } from 'uuid';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import envs from '../config/env';

const { MAIL_USER, MAIL_PASS, REDIS_URL, HASH_SALT, SECRET_KEY, NODE_ENV } = envs;

const cacheClient = redis.createClient({ url: REDIS_URL });

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
  static saveToCache(key, data, ttl = 60) {
    cacheClient.setex(key, ttl, data);
  }

  static deleteFromCache(key) {
    cacheClient.del(key);
  }

  static retrieveFromCache(key) {
    return new Promise((resolve, reject) => {
      cacheClient.get(key, (err, data) => {
        if (err) return reject('Cache does not not contain this data');
        return resolve(JSON.parse(data));
      });
    });
  }
}

class RandomNumberGeneratorManager {
  static generateRandHex() {
    const buffer = Buffer.alloc(16);
    uuidv4({}, buffer);
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
