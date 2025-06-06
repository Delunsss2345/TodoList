import { generateToken } from "../lib/utils.js";
import User from "../models/user.model.js";
import bcrypt from 'bcrypt' ; 
import cloudinary from '../lib/cloudinary.js'
const validateFields = ({ fullName, email, password }, isSignup = false) => {
    if (!email || !password || (isSignup && !fullName)) {
        return { valid: false, message: "Trường không được trống" };
    }

    if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email)) {
        return { valid: false, message: "Email sai định dạng" };
    }

    if (password.length < 6) {
        return { valid: false, message: "Mật khẩu phải dài trên 6 ký tự" };
    }

    return { valid: true };
};

export const login = async (req , res) => {
    const {email , password} = req.body ; 
    const validation = validateFields({email, password });
    if (!validation.valid) {
        return res.status(400).json({ message: validation.message });
    }
    
    try {
        const user = await User.findOne({email}) ; 
        if(!user) {
            return res.status(404).json({message : "Tài khoản không tồn tại"}) ; 
        }

        const isPassword = await bcrypt.compare(password, user.password);
        if(!isPassword) {
            return res.status(400).json({message : "Tài khoản hoặc mật khẩu sai"}) ; 
        }
        const userObject = user.toObject();
        delete userObject.password;

        generateToken(user._id , res) ; 
        res.status(200).json({message : "Đăng nhập thành công" , user : userObject}) ; 
    }
    catch (error) {
        console.error(error) ; 
        res.status(500).json({message : 'Lỗi Server'}) ; 
    }

}

export const signup = async (req , res) => {
    const {fullName , email , password } = req.body ; 


    const validation = validateFields({ fullName, email, password }, true);
    if (!validation.valid) {
        return res.status(400).json({ message: validation.message });
    }
    try {
        const user = await User.findOne({email}) ; 
        if(user) {
            return res.status(409).json({message : "Tài khoản đã tồn tại"}) ; //Đã tồn tại 409
        }


        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({fullName , email , password : hashedPassword , profilePic : ""}) ;
        generateToken(newUser._id , res) ; 

        await newUser.save() ; 
        res.status(201).json({message : "Tạo tài khoản thành công" , newUser}) ; 

    }
    catch (error) {
        console.error(error) ; 
        res.status(500).json({message : 'Lỗi Server'}) ; 
    }
}

export const logout = (req , res) => {
    try {
        res.clearCookie("jwt");
        res.status(200).json({message : "Đăng xuất thành công"}) ; 

    }
    catch (error) {
        console.error(error) ; 
        res.status(500).json({message : 'Lỗi Server'}) ; 
    }
}


export const updateProfile = async (req, res) => {
  const { fullName, email, profilePic } = req.body;
  if (
    email &&
    !/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email)
  ) {
    return res.status(400).json({ message: 'Email sai định dạng' });
  }

  try {
    let imageUrl;

    if (profilePic) {
      const result = await cloudinary.uploader.upload(profilePic); 
      imageUrl = result.secure_url;
    }

    const updatedUser = await User.findByIdAndUpdate(
      req.user._id,
      {
        fullName,
        email,
        ...(imageUrl && { profilePic: imageUrl }), 
      },
      { new: true }
    ).select('-password -__v');

    res.status(200).json({ message: 'Update thành công', user : updatedUser});
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Lỗi Server' });
  }
};

export const checkAuth = (req , res) => {
    try {
        const user = req.user ; 
        res.status(200).json({message : "Có đủ quyền truy cập" , user}) ; 
    }
    catch (error) {
        console.error(error) ; 
        res.status(500).json({message : 'Lỗi Server'}) ; 
    }
}
