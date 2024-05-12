const express = require("express")
const router = express.Router()
const {registerUser, loginUser, updateUser, getAllUsers, deleteUser} = require("../constrollers/userController")

router.post("/reg", registerUser)
router.post("/log", loginUser)
router.put('/update/:id', updateUser)
router.get("/admin/all", getAllUsers)
router.delete('/admin/del/:id', deleteUser)


module.exports = router