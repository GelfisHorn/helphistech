import axios from "axios";

export default async function handler(req, res) {
	const { projectId, email, config } = req.body;
	try {
        const { data } = await axios.request({
            method: 'POST',
            url: `${process.env.SERVER_URI}/v1/client/project/${projectId}`,
            headers: {
                'Authorization': config.headers.Authorization
            },
            data: { email }
        }) 
        console.log(data)
		return res.status(200).json(data);
	} catch (error) {
		const resError = new Error(error.response.data.msg)
		return res.status(400).json({ msg: resError.message });
	}
}