import axios from "axios";

export default async function handler(req, res) {
  if(req.method === "GET") {
    try {
        const { data } = await axios.request({
            method: 'GET',
            url: `${process.env.SERVER_URI}/v1/projects/get`,
            headers: {
                'Authorization': config.headers.Authorization
            },
            data: { _id }
        }) 
		return res.status(200).json(data);
	} catch (error) {
		const resError = new Error(error.response.data.msg)
		return res.status(400).json({ msg: resError.message });
	}
  }
}