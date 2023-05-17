import axios from "axios";

export default async function handler(req, res) {
	const { comment, config } = req.body;
    const { _id, message } = comment;
	try {
        const { data } = await axios.request({
            method: 'PUT',
            url: `${process.env.SERVER_URI}/v1/client/project/entry/comment/${_id}`,
            headers: {
                'Authorization': config.headers.Authorization
            },
            data: { message }
        }) 
        console.log(data)
		return res.status(200).json(data);
	} catch (error) {
		const resError = new Error(error.response.data.msg)
		return res.status(400).json({ msg: resError.message });
	}
}