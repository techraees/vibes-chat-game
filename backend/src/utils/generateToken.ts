import jwt from "jsonwebtoken";

const generateAndSendToken = (userId: any) => {
    const token = jwt.sign({ userId }, process.env.JWT_SECRET as string, {
        expiresIn: "15d",
    });

    return token;
};

export default generateAndSendToken;
