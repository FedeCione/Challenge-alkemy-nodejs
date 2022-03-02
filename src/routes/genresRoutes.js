let express = require("express");
let router = express.Router();
let genreAvatar = require("../middlewares/genreAvatar");
let { genreList, formGenreAdd, genreAdd, formGenreEdit, genreEdit, genreDelete, genreDetail } = require("../controllers/genresController");
let genreValidator = require('../validations/genreValidator');
let verifyToken = require('../middlewares/verifyToken');

// Genre List
router.get("/", verifyToken, genreList);

//Genre Detail
router.get("/detail/:id", verifyToken, genreDetail);

// Genre Add
router.get("/add", verifyToken, formGenreAdd);
router.post("/add", verifyToken, genreAvatar.single("imagen_genero"), genreValidator, genreAdd);

// Genre Edit
router.get("/edit/:id", verifyToken, formGenreEdit);
router.put("/edit/:id", verifyToken, genreAvatar.single('imagen_genero'), genreValidator, genreEdit);

// Genre Delete
router.delete("/delete/:id", verifyToken, genreDelete);

module.exports = router;