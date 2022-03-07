import axios from 'axios';

export async function checkBankDetails(bankAccountNumber, ifsc) {
    const data = {
        data: {
            account_number: bankAccountNumber,
            ifsc: ifsc,
            consent: 'Y',
            consent_text: 'I hear by declare my consent agreement for fetching my information via ZOOP API'
        }
    };
    return axios({
        method: 'POST',
        url: 'https://test.zoop.one/api/v1/in/financial/bav/lite',
        headers: {
            'api-key': process.env.ZOOP_API_KEY,
            'app-id': process.env.ZOOP_APP_ID
        },
        data: data
    });
}
