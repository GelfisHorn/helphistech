import axios from "axios";

export default async function handler(req, res) {
	const { config, comment } = req.body;
	try {
        const { data } = await axios.request({
            url: `${process.env.SERVER_URI}/v1/projects/comment`,
            method: 'POST',
            headers: {
                'Authorization': config.headers.Authorization
            },
            data: comment
        })
		return res.status(200).json(data);
	} catch (error) {
		const resError = new Error(error.response.data.msg)
		return res.status(400).json({ msg: resError.message });
	}
}