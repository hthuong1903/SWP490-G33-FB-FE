import placeholderImage from '@/assets/image/placeholderImage.png'
import { Button } from '@mui/material'
import { Box } from '@mui/system'
import { useEffect, useState } from 'react'

function ImageUpload({ onSubmit, selectedData, isEdit }) {
    const [image, setImage] = useState(null)
    const [imageFile, setImageFile] = useState(null)

    const handleFileUpload = (event) => {
        let file = URL.createObjectURL(event.target.files[0])
        let img = new Image()
        img.src = file
        setImage({ ...image, [event.target.name]: file })
        setImageFile({ ...imageFile, [event.target.name]: event.target.files[0] })
    }

    useEffect(() => {
        onSubmit && onSubmit(imageFile)
    }, [imageFile, image])

    useEffect(() => {
        if (selectedData) {
            if (selectedData?.imageUrl) {
                setImage({
                    photoMainName: selectedData?.imageUrl
                })
            } else {
                setImage({
                    photoMainName: selectedData?.urlImage
                })
            }
            console.log(image)
        }
    }, [])

    useEffect(() => {
        console.log('selectedData from image upload', selectedData)
    }, [])

    return (
        <>
            <Box sx={{ display: 'flex', flexDirection: 'column', px: 3 }}>
                <img
                    src={image?.photoMainName || placeholderImage}
                    alt="placeholderImage"
                    width="100%"
                />
                <Button variant="contained" component="label" sx={{ mt: 2 }}>
                    Chọn ảnh
                    {isEdit && (
                        <input
                            hidden
                            name="photoMainName"
                            accept="image/*"
                            type="file"
                            onChange={(event) => handleFileUpload(event)}
                        />
                    )}
                </Button>
            </Box>
        </>
    )
}

export default ImageUpload
