import axios from "axios";
import sha1 from 'sha1';

/**
 * Delete images in Cloudinary
 * @images array of string images
 */
export default async function deleteImages(images, folder) {
    for(const image of images) {
        const urlPieces = image.split('/');
        const public_id = urlPieces[urlPieces.length - 1].split('.')[0];
        const timestamp = Math.floor(Date.now() / 1000);
        const api_key = process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY;  
        const api_secret = process.env.NEXT_PUBLIC_CLOUDINARY_API_SECRET;
        const signature = sha1(`public_id=${folder ? `${folder}/${public_id}` : public_id}&timestamp=${timestamp}` + api_secret)
        let formData = new FormData();
        formData.append('public_id', `${folder ? `${folder}/${public_id}` : public_id}`);
        formData.append('signature', signature);
        formData.append('api_key', api_key);
        formData.append('timestamp', timestamp);
        try {
            await axios.request({
                url: `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/destroy`,
                maxBodyLength: Infinity,
                method: 'POST',
                headers: {
                    'Content-Type': 'multipart/form-data'
                },
                data: formData
            })
        } catch (error) {
            console.log(error.response.data)
        }
    }
}