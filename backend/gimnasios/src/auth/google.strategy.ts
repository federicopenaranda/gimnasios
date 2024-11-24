import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-google-oauth20';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
  constructor() {
    super({
      clientID: process.env.GOOGLE_CLIENT_ID, // Add your Google Client ID
      clientSecret: process.env.GOOGLE_CLIENT_SECRET, // Add your Google Client Secret
      callbackURL: 'http://localhost:3000/auth/google/callback', // Match your Google redirect URI
      scope: ['email', 'profile'],
    });
  }

  async validate(accessToken: string, refreshToken: string, profile: any) {
    const { name, emails, photos } = profile;
    return {
      email: emails[0].value,
      name: name.givenName,
      picture: photos[0].value,
    };
  }
}
