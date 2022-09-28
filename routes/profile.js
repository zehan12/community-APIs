var express = require('express');
var router = express.Router();
var User = require('../models/User')
var auth = require('../middlewares/auth');

// GET profile 

router.get('/:username', async(req, res, next) => {
    const username = req.params.username;
    try {
        const user = await User.findOne({username});
        if(!user) return res.status(400).json({error: 'Username not available!'})
        res.json({profile:{
            name: user.name,
            username: user.username,
            image: user.image,
            bio: user.bio
        }})
    } catch (error) {
        next(error)
    }
})

// UPDATE profile 

router.put('/:username', auth.verifyToken, async(req, res, next) => {
    const username = req.params.username;
    try {
        const user = await User.findOneAndUpdate({username}, req.body, {new: true});
        if(!user) return res.status(400).json({error: 'Username not available!'})
        res.json({updatedProfile:{
            name: user.name,
            username: user.username,
            image: user.image,
            bio: user.bio
        }})
    } catch (error) {
        next(error)
    }
})

module.exports = router;
