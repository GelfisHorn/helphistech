import axios from "axios";

export default async function handler(req, res) {
    const { token, password, lang } = req.body;

    try {
        // Create token on database
        const { data } = await axios.request({
            method: 'POST',
            url: `${process.env.SERVER_URI}/v1/${lang}/users/reset-password/${token}`,
            data: { password }
        })
        // Return response
        return res.status(200).json(data);
    } catch (error) {
        console.log(error)
        const resError = new Error(error?.response?.data?.msg || "There was an error")
        return res.status(400).json({ msg: resError.message });
    }
}