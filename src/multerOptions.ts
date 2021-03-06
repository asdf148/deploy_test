import { diskStorage } from "multer";
import { join } from "path";

export const multerBGOptions = {
  storage: diskStorage({
    destination(req, file, cb){
        cb(null, join(__dirname, '../src/public/background/'));
    },
    filename(req,file,cb){
        cb(null, `${Date.now()}__${file.originalname}`);
    }
  })
}

export const multerPFOptions = {
  storage: diskStorage({
    destination(req, file, cb){
        cb(null, join(__dirname, '../src/public/profile/'));
    },
    filename(req,file,cb){
        cb(null, `${Date.now()}__${file.originalname}`);
    }
  })
}