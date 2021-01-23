const express = require('express');
const router = express.Router();
const Item = require('../../models/Item');

// route GET       request to api/items
// description:    Get all items
// access:         public
router.get('/', (req, res) => {
    Item.find()
        .then(item => res.json(item))
        .catch(err => console.log(`Error: ${err}`))
})

//route POST       posts to api
//description      post Item
//access:          public
router.post('/add', (req, res) => {
    const newItem = new Item({
        title: req.body.title,
        price: req.body.price,
        description: req.body.description
    });
    newItem.save()
        .then(() => res.json('Entry added!'))
        .catch(err => res.status(404).json(`Error: ${err}`))
})

//route PUT        updates the api
//description      update Items on the api
//access:          public
router.put('/special/:id', async (req, res) => {
    const id = req.params.id;

    let updateUser = {}
    updateUser.title = req.body.title
    updateUser.price = req.body.price
    updateUser.description = req.body.description

    await Item.findByIdAndUpdate(id, updateUser, (err, updateData) => {
        if (err) {
            console.log(`Error in updating the file: ${err}`)
        } else {
            console.log(`Succesful update: ${updateData}`)
        }
    })
})



module.exports = router;