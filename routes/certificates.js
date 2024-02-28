const express = require('express');
const router = express.Router();
const certificates = require('../controllers/certificates');
const catchAsync = require('../utils/catchAsync');
const { isLoggedIn, isAuthor, validateCertificate } = require('../middleware');
const multer = require('multer');
const { storage } = require('../cloudinary');
const upload = multer({ storage });

const Certificate = require('../models/certificate');

router.route('/')
    .get(catchAsync(certificates.index))
    .post(isLoggedIn, upload.array('image'), validateCertificate, catchAsync(certificates.createCertificate))


router.get('/new', isLoggedIn, certificates.renderNewForm)

router.route('/:id')
    .get(catchAsync(certificates.showCertificate))
    .put(isLoggedIn, isAuthor, upload.array('image'), validateCertificate, catchAsync(certificates.updateCertificate))
    .delete(isLoggedIn, isAuthor, catchAsync(certificates.deleteCertificate));

router.get('/:id/edit', isLoggedIn, isAuthor, catchAsync(certificates.renderEditForm))



module.exports = router;