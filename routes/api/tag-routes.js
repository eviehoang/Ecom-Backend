const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', (req, res) => {
  // find all tags
  // be sure to include its associated Product data
  Category.findAll({
    include: {
      model: Product,
      attributes: ["product_name", "stock", "price", "category_id"]
    }
  }).then(data => {
    res.json(data);
  })
    .catch(err => {
      console.log(err);
      res.status(500).json(err)
    });
});

router.get('/:id', (req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data
  Category.findOne({
    where:{ id: req.params.id},
    include: {
      model: Product,
      attributes: ["product_name", "stock", "price", "category_id"]
    }
  }).then(data => {
    res.json(data);
  })
    .catch(err => {
      console.log(err);
      res.status(500).json(err)
    });
});

router.post('/', (req, res) => {
  // create a new tag
  Category.create({
    tag_name: req.body.tag_name
  }).then(data => {
    res.json(data);
  })
    .catch(err => {
      console.log(err);
      res.status(500).json(err)
    });
});

router.put('/:id', (req, res) => {
  // update a tag's name by its `id` value
  Category.Update(req.body,
    {
      where:{
        id: req.params.id
      }
  })
  .then(data => {
    if (!data) {
      return res.status(404).json({ message: 'No Tag Found With This ID' });
    }
    res.json(data);
  })
    .catch(err => {
      console.log(err);
      res.status(500).json(err)
    });
});

router.delete('/:id', (req, res) => {
  // delete on tag by its `id` value
  Category.destroy(req.body,
    {
      where:{
        id: req.params.id
      }
  })
  .then(data => {
    if (!data) {
      return res.status(404).json({ message: 'No Tag Found With This ID' });
    }
    res.json(data);
  })
    .catch(err => {
      console.log(err);
      res.status(500).json(err)
    });
});

module.exports = router;
