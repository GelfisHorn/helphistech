import axios from "axios";

export default async function handler(req, res) {
	const { entryId, config } = req.body;

	try {
		const { data } = await axios(`${process.env.SERVER_URI}/v1/client/project/entry/${entryId}`, config);
		return res.status(200).json(data);
	} catch (error) {
		const resError = new Error(error.response.data.msg)
		return res.status(400).json({ msg: resError.message });
	}
}