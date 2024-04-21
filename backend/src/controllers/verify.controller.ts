import express from 'express';
import jwt from 'jsonwebtoken';
import User from '../models/user.model';

export const verify = async (req: express.Request, res: express.Response) => {
  try {
    const { username } = req.body;
    const token: string | undefined = req.cookies.authToken;

    if (!token) {
      return res.status(401).json({ id: null });
    }

    const decoded: any = jwt.verify(token, process.env.JWT_SECRET as string);

    if (!decoded) {
      return res.status(401).json({ id: null });
    }

    const user = await User.findById(decoded.userId).select('-password');

    if (!user || user.username !== username) {
      return res.status(401).json({ id: null });
    }

    return res.status(201).json({ id: user._id });
  } catch (error) {
    console.error(`Error in verify controller: ${error}`);
    return res.status(500).json({ message: 'Something went wrong' });
  }
};
