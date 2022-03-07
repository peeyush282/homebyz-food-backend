import multer from 'multer';
import fs from 'fs';
export function fileUpload(foldername: string) {
    const dir = `./src/upload/${foldername}`;

    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
    }
    const storage = multer.diskStorage({
        destination: function (req: any, file: any, cb: any) {
            cb(null, dir);
        },
        filename: function (req: any, file: any, cb: any) {
            cb(null, file.originalname);
        }
    });

    const upload = multer({
        storage: storage
    });
    return upload;
}
