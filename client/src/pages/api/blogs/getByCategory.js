import axios from "axios";

export default async function handler(req, res) {

	const { category, language } = req.body;

    const config = {
        headers: {
            Authorization: `bearer ${process.env.STRAPI_TOKEN}`
        }
    }

	try {
        const { data } = await axios.request({
            method: 'GET',
            url: `${process.env.STRAPI_URI}/api/blogs?locale=${language}&filters[category][code][$eq]=${category}&populate=preview`,
            headers: {
                'Authorization': config.headers.Authorization
            }
        }) 
		return res.status(200).json(data);
	} catch (error) {
		const resError = new Error(error.response.data.msg)
		return res.status(400).json({ msg: resError.message });
	}
}