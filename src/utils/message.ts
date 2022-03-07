import axios from 'axios';

async function messageService(mobile, otp) {
    try {
        const url = `https://api.textlocal.in/send/?apikey=NTc0NzZjMzA0Mzc4NjM0MTU3NTQzNTcwNTU0ZjU4NmE=&numbers=91${mobile}&sender=HomByz&message=OTP for activating your HOMEBYZ account is ${otp}. Valid for 10 minutes. Please do not share this OTP.`;
        await axios.get(url);
    } catch (error) {
        throw new Error('Something went wrong in in message api');
    }
}

export default messageService;
