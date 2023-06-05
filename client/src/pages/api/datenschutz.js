import axios from "axios"

export default async function handler(req, res) {
    
    const { language } = req.body || {};

    const config = {
        headers: {
            Authorization: `bearer ${process.env.STRAPI_TOKEN}`
        }
    }

    try {
        const { data } = await axios.request({
            url: `${process.env.STRAPI_URI}/api/datenschutz?locale=${language}`,
            method: "GET",
            headers: {
                'Authorization': config.headers.Authorization
            }
        })
        console.log(data);
        return res.status(200).json(data.data.attributes);
    } catch (error) {
        console.log(error.response.data)
        const resError = new Error(error.response.data.msg)
        return res.status(400).json({ msg: resError.message });
    }
}