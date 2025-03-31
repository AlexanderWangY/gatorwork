import { betterAuth } from 'better-auth';
import { prismaAdapter } from 'better-auth/adapters/prisma';
import { prisma } from './server/prisma';

export const auth = betterAuth({
	database: prismaAdapter(prisma, {
		provider: 'postgresql'
	}),
  emailAndPassword: {
    enabled: true,
    requireEmailVerification: false
  },
  emailVerification: {
    sendVerificationEmail: async ({ user, url, token }) => {
      console.log(`Send email to ${user.email} with url ${url}`);
    },
    sendOnSignUp: true,
    expiresIn: 3600
  }

});
