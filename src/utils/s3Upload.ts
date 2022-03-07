import fs from 'fs';
import AWS from 'aws-sdk';
import dotenv from 'dotenv';
dotenv.config();

export const s3Upload = async (file: any, folder: any) => {
    try {
        const imagefile = fs.createReadStream(`src/upload/${folder}/` + file.filename);

        const params = {
            Bucket: process.env.AWS_BUCKET_NAME,
            Key: file.filename,
            Body: imagefile,
            ContentType: file.mimetype,
            ContentDisposition: 'inline'
        };

        return await s3bucket.putObject(params).promise();
    } catch (error) {
        console.log(error);
    }
};

export const s3bucket = new AWS.S3();
