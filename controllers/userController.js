import User from "../model/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";


export const register = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    const cek = await User.findOne({ email });
    if (cek) return res.status(400).json({ msg: "Email sudah digunakan" });

    const salt = await bcrypt.genSalt(10);
    const hashPass = await bcrypt.hash(password, salt);

    const newUser = await User.create({ username, email, password: hashPass });

    res.status(201).json({ msg: "Registrasi berhasil", user: newUser });
  } catch (err) {
    console.log("Error register:", err.message);
    res.status(500).json({ msg: err.message });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ msg: "User tidak ditemukan" });

    const cocok = await bcrypt.compare(password, user.password);
    if (!cocok) return res.status(401).json({ msg: "Password salah" });

    const token = jwt.sign({ id: user._id }, "rahasia123", { expiresIn: "2h" });

    res.json({
      msg: "Login berhasil",
      token,
      user: { id: user._id, username: user.username, email: user.email }
    });
  } catch (err) {
    console.log("Error login:", err.message);
    res.status(500).json({ msg: "Gagal login" });
  }
};
