export async function forgetPass(otp: string, name: string) {
    return `<!DOCTYPE html>
        <html lang="en">
            <head>
                <meta charset="UTF-8" />
                <meta http-equiv="X-UA-Compatible" content="IE=edge" />
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                <title>Homebyz</title>
                <link rel="preconnect" href="https://fonts.gstatic.com" />
                <link href="https://fonts.googleapis.com/css2?family=Montserrat&display=swap" rel="stylesheet" />
            </head>
            <body style="margin: 0px; padding: 30px 0px 30px 0px; background-color: #f5f5f5; font-family: 'Montserrat', sans-serif">
                <div class="wrapper" style="width: 465px; margin-left: auto; margin-right: auto">
                   
                    <div class="container" style="background: #fff">
                        <div class="containt" style="padding: 0px 20px">
                            <h3 style="color: #414141; font-size: 24px">${name}</h3>
                            <p style="font-size: 14px; color: #575656; font-family: 'Montserrat', sans-serif; margin-top: 0px">
                                Welcome to Homebyz.
                            </p>
                            <p style="font-size: 14px; color: #575656; font-family: 'Montserrat', sans-serif; margin-top: 0px">Enter this 6 digit OTP to change your password.</p>
                            <div class="otp">
                                <h3 style="font-size: 36px; color: #a3191e; margin: 20px 0px">${otp}</h3>
                            </div>
                        </div>
                    </div>
                    <footer>
                        <p style="margin: 0px; margin-top: 25px; color: #949393; font-size: 11px; text-align: center">
                            Please do not reply to this email. Emails sent to this address will not be answered.
                            <br />
                            Copyright © 12021 Homebyz. All rights reserved
                        </p>
                    </footer>
                </div>
            </body>
        </html>`;
}
