let express = require("express");
let router = express.Router();
let characterAvatar = require("../middlewares/characterAvatar");
let { characterList, formCharacterAdd, characterAdd, formCharacterEdit, characterEdit, characterDelete, characterDetail, search } = require("../controllers/charactersController");
let verifyToken = require('../middlewares/verifyToken');

// Character List
router.get("/", verifyToken, characterList);

// Character Detail
router.get("/detail/:id", verifyToken, characterDetail);

// Character Add
router.get("/add", verifyToken, formCharacterAdd);
router.post("/add", verifyToken, characterAvatar.single("imagen_personaje"), characterAdd);

// Character Edit
router.get("/edit/:id", verifyToken, formCharacterEdit);
router.put("/edit/:id", verifyToken, characterAvatar.single('imagen_personaje'), characterEdit);

// Character Delete
router.delete("/delete/:id", verifyToken, characterDelete);

// Character Search
router.get("/search", verifyToken, search);

module.exports = router;