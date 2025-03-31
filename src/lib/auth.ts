import { betterAuth } from 'better-auth';
import { prismaAdapter } from 'better-auth/adapters/prisma';
import { prisma } from './server/prisma';
import { sendAuthEmail } from './server/email';

export const auth = betterAuth({
	database: prismaAdapter(prisma, {
		provider: 'postgresql'
	}),
	emailAndPassword: {
		enabled: true,
		requireEmailVerification: true
	},
	emailVerification: {
		sendVerificationEmail: async ({ user, url }) => {
			await sendAuthEmail(user, url);
		},
		sendOnSignUp: true,
		expiresIn: 3600
	}
});
