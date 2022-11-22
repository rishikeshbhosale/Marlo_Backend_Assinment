import User from '../models/user.model.js'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'

dotenv.config()
const salt = bcrypt.genSaltSync(12);

const createUser = async (req, res, next) => {
    const { fname, lname, mname, email, occ, password, company, phone } = req.body
    try {

        if (!fname | !lname | !phone | !email | !occ | !password) {
            return res.status(202).json({ msg: "Fill all the nessory data!!!" })
        }
        const checkEmail = await User.findOne({ email })
        const checkPhone = await User.findOne({ phone })
        if (checkPhone) {
            return res.status(202).json({ msg: "Phone Number already present" })
        }
        if (checkEmail) {
            return res.status(202).json({ msg: "email already present" })
        }
        var hashPass = bcrypt.hashSync(password, salt);
        const user = await User.create({ ...req.body, password: hashPass })
        return res.status(200).json(user)
    }
    catch (e) {

        next(e);
    }
}

const loginUser = async (req, res, next) => {
    const { email, phone, password } = req.body
    try {
        if (!email | !password) {
            return res.status(202).json({ msg: "Fill the user Correctly" })
        }
        const user = await User.findOne({ $or: [{ email }, { phone }] })

        if (user == null) {
            return res.status(202).json({ msg: "Invalid User" })
        }
        let comparePassword = bcrypt.compareSync(password, user.password)


        if (!comparePassword) {
            return res.status(202).json({ msg: "Invalid Passowrd" })
        }

        const token = jwt.sign({ _id: user.id }, process.env.JWT_SECRET_KEY)
        return res.json({ user, token })

    } catch (e) {
        next(e);
    }
}

const findAllUser = async (req, res, next) => {
    User.find()
        .then((r) => {
            return res.json(r)
        })
        .catch((e) => next(e))
}

const updateUser = async (req, res, next) => {
    const { email, password, phone, fname, lname, mname, occ, company } = req.body
    const { id } = req.params

    const update = {
        fname: fname,
        lname: lname,
        mname: mname,
        occ: occ,
        company: company
    }

    const user = await User.findOne({ $or: [{ email }, { phone }] })
    let comparePassword = bcrypt.compareSync(password, user.password)

    if (!comparePassword) {
        return res.status(202).json({ msg: "Cannot Change password" })
    } else {
        try {
            await User.findByIdAndUpdate(id, update)
                .then((r) => res.status(200).json(r))
                .catch((e) => next(e))
        } catch (e) {
            next(e)
        }
    }
}

const deleteUser = async (req, res, next) => {
    const { id } = req.params
    try {
        User.findByIdAndDelete(id)
            .then((r) => res.json("Deleted Compeleted"))
            .catch((e) => next(e))
    } catch (e) {
        next(e)
    }
}

export { createUser, findAllUser, loginUser, updateUser, deleteUser }