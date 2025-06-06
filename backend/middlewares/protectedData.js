import jwt, { decode } from 'jsonwebtoken';
import User from '../models/user.model.js';

export const protectedData = async (req, res, next) => {
  const token = req.cookies.jwt; 
  if (!token) {
    return res.status(401).json({ message: 'Chưa được cung cấp token' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.userId).select('-password -__v') ; 
    if(!user) {
        return res.status(409).json({ message: 'Tài khoản không tồn tại' });
    }
    req.user = user; 
    next(); 
  } catch (err) {
    return res.status(401).json({ message: 'Token không hợp lệ' });
  }
};
