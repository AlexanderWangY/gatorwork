import { betterAuth } from 'better-auth';
import { prismaAdapter } from 'better-auth/adapters/prisma';
import { prisma } from './server/prisma';
import { sendAuthEmail } from './server/email';
import { isDev } from './constants';

export const auth = betterAuth({
	database: prismaAdapter(prisma, {
		provider: 'postgresql'
	}),
	emailAndPassword: {
		enabled: true,
		requireEmailVerification: !isDev // Disable email verification in development
	},
	emailVerification: {
		sendVerificationEmail: async ({ user, url }) => {
			if (isDev) return; // Don't send emails in development
			await sendAuthEmail(user, url);
		},
		sendOnSignUp: true,
		expiresIn: 3600
	}
});
