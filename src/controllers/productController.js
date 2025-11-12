const { Product, Category } = require('../models');
const cloudinary = require('../config/cloudinary');

exports.create = async (req, res) => {
  try {
    const { name, description, price, stock, categoryId } = req.body;
    let imageUrl = null;
    if (req.file) {
      const result = await cloudinary.uploader.upload_stream({ resource_type: 'image', folder: 'products' }, (err, resu) => {});
      // Note: we'll use upload with buffer below since upload_stream style is slightly more code.
    }
    // simple approach: multer saved file path => cloudinary.uploader.upload(file.path)
    if (req.file?.path) {
      const uploadResult = await cloudinary.uploader.upload(req.file.path, { folder: 'products' });
      imageUrl = uploadResult.secure_url;
    }
    const product = await Product.create({ name, description, price, stock, categoryId, imageUrl });
    res.status(201).json(product);
  } catch (err) { console.error(err); res.status(500).json({ message: 'Server error' }); }
};

exports.update = async (req, res) => {
  try {
    const product = await Product.findByPk(req.params.id);
    if (!product) return res.status(404).json({ message: 'Not found' });

    if (req.file?.path) {
      const uploadResult = await cloudinary.uploader.upload(req.file.path, { folder: 'products' });
      req.body.imageUrl = uploadResult.secure_url;
    }

    await product.update(req.body);
    res.json(product);
  } catch (err) { console.error(err); res.status(500).json({ message: 'Server error' }); }
};

exports.remove = async (req, res) => {
  try {
    const product = await Product.findByPk(req.params.id);
    if (!product) return res.status(404).json({ message: 'Not found' });
    await product.destroy();
    res.json({ message: 'Deleted' });
  } catch (err) { console.error(err); res.status(500).json({ message: 'Server error' }); }
};

exports.get = async (req, res) => {
  try {
    const product = await Product.findByPk(req.params.id, { include: Category });
    if (!product) return res.status(404).json({ message: 'Not found' });
    res.json(product);
  } catch (err) { console.error(err); res.status(500).json({ message: 'Server error' }); }
};

exports.list = async (req, res) => {
  try {
    const { minPrice, maxPrice, category, q, page = 1, limit = 10 } = req.query;
    const where = {};
    if (minPrice || maxPrice) where.price = {};
    if (minPrice) where.price['$gte'] = parseFloat(minPrice);
    if (maxPrice) where.price['$lte'] = parseFloat(maxPrice);
    if (q) where.name = { [require('sequelize').Op.iLike]: `%${q}%` };
    if (category) where.categoryId = category;

    const offset = (page - 1) * limit;
    const { count, rows } = await Product.findAndCountAll({ where, include: Category, limit: parseInt(limit), offset });
    res.json({ total: count, page: parseInt(page), perPage: parseInt(limit), items: rows });
  } catch (err) { console.error(err); res.status(500).json({ message: 'Server error' }); }
};
