import nodemailer from "nodemailer";

export default async function handler(req, res) {
    if (req.method !== "POST") {
        return res.status(405).json({
            message: "Method not allowed",
        });
    }

    const { name, email, message } = req.body;

    try {
        const transporter = nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 587,
            secure: false,
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
            },
        });

        await transporter.sendMail({
            from: process.env.EMAIL_USER,
            to: "shantnuvispute+web@gmail.com",
            subject: `Portfolio Message from ${name}`,
            html: `
                <h2>New Portfolio Message</h2>

                <p><strong>Name:</strong> ${name}</p>

                <p><strong>Email:</strong> ${email}</p>

                <p><strong>Message:</strong></p>

                <p>${message}</p>
            `,
        });

        res.status(200).json({
            success: true,
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            success: false,
        });
    }
}
