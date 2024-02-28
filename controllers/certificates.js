const Certificate = require('../models/certificate');
const { cloudinary } = require("../cloudinary");


module.exports.index = async (req, res) => {
    const certificates = await Certificate.find({});
    res.render('certificates/index', { certificates })
}

module.exports.renderNewForm = (req, res) => {
    res.render('certificates/new');
}

module.exports.createCertificate = async (req, res, next) => {
    const certificate = new Certificate(req.body.certificate);
    certificate.images = req.files.map(f => ({ url: f.path, filename: f.filename }));
    certificate.author = req.user._id;
    await certificate.save();
    console.log(certificate);
    req.flash('success', 'Successfully made a new certificate!');
    res.redirect(`/certificates/${certificate._id}`)
}

module.exports.showCertificate = async (req, res,) => {
    const certificate = await Certificate.findById(req.params.id).populate({
        path: 'reviews',
        populate: {
            path: 'author'
        }
    }).populate('author');
    if (!certificate) {
        req.flash('error', 'Cannot find that certificate!');
        return res.redirect('/certificates');
    }
    res.render('certificates/show', { certificate });
}

module.exports.renderEditForm = async (req, res) => {
    const { id } = req.params;
    const certificate = await Certificate.findById(id)
    if (!certificate) {
        req.flash('error', 'Cannot find that certificate!');
        return res.redirect('/certificates');
    }
    res.render('certificates/edit', { certificate });
}

module.exports.updateCertificate = async (req, res) => {
    const { id } = req.params;
    console.log(req.body);
    const certificate = await Certificate.findByIdAndUpdate(id, { ...req.body.certificate });
    const imgs = req.files.map(f => ({ url: f.path, filename: f.filename }));
    certificate.images.push(...imgs);
    await certificate.save();
    if (req.body.deleteImages) {
        for (let filename of req.body.deleteImages) {
            await cloudinary.uploader.destroy(filename);
        }
        await certificate.updateOne({ $pull: { images: { filename: { $in: req.body.deleteImages } } } })
    }
    req.flash('success', 'Successfully updated certificate!');
    res.redirect(`/certificates/${certificate._id}`)
}

module.exports.deleteCertificate = async (req, res) => {
    const { id } = req.params;
    await Certificate.findByIdAndDelete(id);
    req.flash('success', 'Successfully deleted certificate')
    res.redirect('/certificates');
}