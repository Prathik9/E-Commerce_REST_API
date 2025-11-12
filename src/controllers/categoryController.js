const { Category } = require('../models');

exports.create = async (req, res) => {
  try {
    const { name, description } = req.body;
    const category = await Category.create({ name, description });
    res.status(201).json(category);
  } catch (err) { console.error(err); res.status(500).json({ message: 'Server error' }); }
};

exports.update = async (req, res) => {
  try {
    const id = req.params.id;
    const category = await Category.findByPk(id);
    if (!category) return res.status(404).json({ message: 'Not found' });
    await category.update(req.body);
    res.json(category);
  } catch (err) { console.error(err); res.status(500).json({ message: 'Server error' }); }
};

exports.remove = async (req, res) => {
  try {
    const category = await Category.findByPk(req.params.id);
    if (!category) return res.status(404).json({ message: 'Not found' });
    await category.destroy();
    res.json({ message: 'Deleted' });
  } catch (err) { console.error(err); res.status(500).json({ message: 'Server error' }); }
};

exports.list = async (req, res) => {
  try {
    const categories = await Category.findAll();
    res.json(categories);
  } catch (err) { console.error(err); res.status(500).json({ message: 'Server error' }); }
};
