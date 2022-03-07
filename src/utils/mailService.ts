import mailgun from 'mailgun-js';

export async function mailService(email: string, htmlContent: any) {
    const data = {
        from: `donotreply@homebyz.com`,
        to: `${email}`,
        subject: 'Homebyz',
        html: htmlContent
    };
    const mg = mailgun({
        apiKey: process.env.MAILGUN_KEY,
        domain: process.env.MAILGUN_DOMAIN
    });

    mg.messages().send(data);

    return true;
}
