import jwt from "jsonwebtoken";

const generateAndSendToken = (id: any) => {
    const token = jwt.sign({ id }, process.env.JWT_SECRET as string, {
        expiresIn: "15d",
    });

    return token;
};

export default generateAndSendToken;
