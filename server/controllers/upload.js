require('dotenv').config();
const response_format = require('../util/response_format');
const UserService = require('../services/user');
const fs = require('fs');
const path = require('path');
const mongoose = require('mongoose');
exports.uploadImage = async (req, res) => {
	if (!req.file) return res.json(response_format.error('You must upload an image.'));
	const ext = path.extname(req.file.originalname);
	if(ext !== '.png' && ext !== '.jpg' && ext !== '.gif' && ext !== '.jpeg'){
		fs.unlinkSync(`./images/${req.file.filename}`);
		return res.json(response_format.error('File must be image'));
	}
	let user = await UserService.getUserById(req.res.user._id);
	if (user.avatar) fs.unlinkSync(`./images/${user.avatar}`);
	user = await UserService.update(req.res.user._id, {
		avatar: req.file.filename,
	});
	return res.json(response_format.success('Upload photo succeed', user));
};
exports.getImage = async (req, res) => {
	checkObjectId(res, req.params.user_id);
	let user = await UserService.getUserById(req.params.user_id);
	let filepath;
	if (!user || !user.avatar) filepath = './images/default';
	else filepath = `./images/${user.avatar}`;
	fs.readFile(filepath, function (err, content) {
		if (err) {
			res.writeHead(400, { 'Content-type': 'text/html' });
			res.end('No such image');
		} else {
			res.end(content);
		}
	});
};
function checkObjectId(res, objectId) {
	const isObjectId = mongoose.Types.ObjectId.isValid(objectId);
	if (!isObjectId)
		return res.json(response_format.error('Invalid objectId.'));
}
