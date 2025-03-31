import type { User } from 'better-auth';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_KEY);

export const sendAuthEmail = async (user: User, url: string) => {
	const { data, error } = await resend.emails.send({
		from: 'GatorMarket <auth@auth.gatormarket.com>',
		to: user.email,
		subject: 'GatorMarket: Verify your email',
		text: `Click this link to verify your email: ${url}`
	});

	if (error) throw error;

	return data;
};
