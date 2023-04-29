import axios from "axios";

export default async function handler(req, res) {
	const { _id, name, email, password, config } = req.body;

	try {
        const { data } = await axios.request({
            method: 'PUT',
            url: `${process.env.SERVER_URI}/v1/es/users`,
            headers: {
                'Authorization': config.headers.Authorization
            },
            data: { _id, name, email, password }
        }) 
		return res.status(200).json(data);
	} catch (error) {
        const resError = new Error(error.response.data.msg)
		return res.status(400).json({ msg: resError.message });
	}
}