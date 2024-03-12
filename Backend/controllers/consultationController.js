const Post = require('../models/Post');
const Consult = require('../models/consultation'); // Import the Consult model
const cloudinary = require("cloudinary");

// Existing code for posts...

exports.getAllConsults = async (req, res) => {
    try {
        const consults = await Consult.find().populate('user', 'name');
        res.status(200).json(consults);
    } catch (error) {
        console.error('Error fetching consultations:', error);
        handleServerError(res, error, 'Internal Server Error');
    }
};
exports.getConsultsByUser = async (req, res) => {
    try {
        // const userId = req.user._id;

        const userConsults = await Consult.find({ user: req.params.userId }).populate('user', 'name');

        res.status(200).json(userConsults);
    } catch (error) {
        console.error('Error fetching user consultations:', error);
        handleServerError(res, error, 'Internal Server Error');
    }
};


// exports.getConsultById = async (req, res) => {
//     const consultId = req.params.id;

//     try {
//       const consult = await Consult.findById(consultId).populate('user', 'name');

//       if (!consult) {
//         return res.status(404).json({ success: false, message: 'Consultation not found' });
//       }

//       // Check if the user making the request is the owner of the consultation or an admin
//       if (req.user && (req.user._id.toString() === consult.user._id.toString() || req.user.role === 'admin')) {
//         res.status(200).json(consult);
//       } else {
//         return res.status(403).json({ success: false, message: 'Unauthorized access' });
//       }
//     } catch (error) {
//       console.error('Error fetching consultation details:', error);
//       handleServerError(res, error, 'Internal Server Error');
//     }
//   };



exports.createConsult = async (req, res) => {
    console.log(req);
    let imagesLinks = [];
    let images = [];

    if (req.files && req.files.length > 0) {
        req.files.forEach(image => {
            images.push(image.path);
        });
    }
    if (req.file) {
        images.push(req.file.path);
    }

    if (req.body.images) {
        if (typeof req.body.images === 'string') {
            images.push(req.body.images);
        } else {
            images = req.body.images
        }
    }

    for (let i = 0; i < images.length; i++) {
        let imageDataUri = images[i];
        try {
            const result = await cloudinary.uploader.upload(`${imageDataUri}`, {
                folder: 'gabi-taro',
                width: 1000,
                crop: 'auto',
            });

            imagesLinks.push({
                public_id: result.public_id,
                url: result.secure_url,
            });
        } catch (error) {
            console.error(error);
            return res.status(500).json({
                success: false,
                message: 'Error uploading image to Cloudinary',
            });
        }
    }

    req.body.images = imagesLinks;

    const consult = await Consult.create(req.body);
    if (!consult) {
        return res.status(400).json({
            success: false,
            message: 'consult not created',
        });
    }

    res.status(201).json({
        success: true,
        consult,
    })
}
exports.updateConsult = async (req, res) => {
    const consultId = req.params.id;
    const { title, content } = req.body;

    try {
        const updatedConsult = await Consult.findByIdAndUpdate(
            consultId,
            { title, content },
            { new: true, runValidators: true }
        );

        if (!updatedConsult) {
            return res.status(404).json({
                success: false,
                message: 'Consultation not found',
            });
        }

        res.status(200).json({
            success: true,
            consultation: updatedConsult,
        });
    } catch (error) {
        console.error('Error updating consultation:', error);
        res.status(500).json({
            success: false,
            error: 'Internal Server Error',
        });
    }
};

exports.deleteConsult = async (req, res) => {
    try {
        const { consultId } = req.params;
        const consult = await Consult.findById(consultId);

        if (!consult) {
            return res.status(404).json({ message: 'Consultation not found' });
        }

        await consult.remove();

        return res.json({ message: 'Consultation deleted successfully' });
    } catch (error) {
        console.error('Error deleting consultation:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
};

exports.getConsultById = async (req, res) => {
    const consultId = req.params.id;
    try {
        const consult = await Consult.findById(consultId).populate('user', 'name');

        if (!consult) {
            handleNotFound(res, 'Consultation not found');
            return;
        }
        res.status(200).json(consult);
    } catch (error) {
        console.error('Error fetching consultation details:', error);
        handleServerError(res, error, 'Internal Server Error');
    }
};

// Existing code...

const handleServerError = (res, error, defaultMessage) => {
    console.error(error);
    res.status(500).json({
        success: false,
        message: defaultMessage || 'Internal Server Error',
    });
};

const handleNotFound = (res, message) => {
    res.status(404).json({
        success: false,
        message: message || 'Not Found',
    });
};

module.exports = {
    getConsultsByUser: exports.getConsultsByUser,
    getAllConsults: exports.getAllConsults,
    createConsult: exports.createConsult,
    updateConsult: exports.updateConsult,
    deleteConsult: exports.deleteConsult,
    getConsultById: exports.getConsultById,
};

