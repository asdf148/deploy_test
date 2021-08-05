import { diskStorage } from "multer";
import { join } from "path";

export const multerOptions = {
      storage: diskStorage({
        destination(req, file, cb){
            cb(null, join(__dirname + '/public/background/'));
        },
        filename(req,file,cb){
            cb(null, `${Date.now()}__${file.originalname}`);
        }
      })
}