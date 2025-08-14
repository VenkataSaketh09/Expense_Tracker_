import multer from "multer";

//configure storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

//File Filter
const fileFilter = (req, file, cb) => {
  const allowFileTypes = ["image/jpeg", "image/jpg", "image/png"];
  if (allowFileTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error("only .jpeg, .jpg and .png images are allowed", false));
  }
};

const upload=multer({storage,fileFilter});

export {upload}
