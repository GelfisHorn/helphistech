import axios from "axios";

export default async function handler(req, res) {
	const { accountId, config } = req.body;
    console.log(req.body);
	try {
        const { data } = await axios.request({
            method: 'DELETE',
            url: `${process.env.SERVER_URI}/v1/es/users`,
            headers: {
                'Authorization': config.headers.Authorization
            },
            data: { accountId }
        }) 
		return res.status(200).json(data);
	} catch (error) {
        const resError = new Error(error.response.data.msg)
		return res.status(400).json({ msg: resError.message });
	}
}