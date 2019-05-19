const express = require('express');
const app = express();
const RoomRouter = express.Router();
const Room = require('../models/Room.model');
const Build = require('../models/Build.model');

RoomRouter.route('/').get(function (req, res) {
    Room.find(function (err, Room) {
        if (err) {
            console.log(err);
        }
        else {
            res.render('manageRoom', { Room: Room });
        }
    });
});
//------------------------Craete-----------------------------------------
RoomRouter.route('/create').get(function (req, res) {
    Build.find(function (err, Build) {
        console.log(Build)
        res.render('createRoom', { build: Build });
    });
});
RoomRouter.route('/post').post(function (req, res) {
    const room = new Room(req.body);
    console.log(room);
    room.save()
        .then(room => {
            res.redirect('/manageRoom');
        })
        .catch(err => {
            res.status(400).send("unable to save to database");
        });
});
// -------------------------------------Edit--------------------------------------------------
RoomRouter.route('/edit/:id').get(function (req, res) {
    const id = req.params.id;
    Room.findById(id, function (err, Room) {
        res.render('editRoom', { Room: Room });
    });
});
//---------------------------------------Update-----------------------------------------------
RoomRouter.route('/update/:id').post(function (req, res) {
    Room.findById(req.params.id, function (err, Room) {
        if (!Room)
            return next(new Error('Could not load Document'));
        else {
            // do your updates here
            Room.name = req.body.name;
            Room.namefull = req.body.namefull;

            Room.save().then(Room => {
                res.redirect('/manageRoom');
            })
                .catch(err => {
                    res.status(400).send("unable to update the database");
                });
        }
    });
});
// ---------------------------------------------delete------------------------------------------
RoomRouter.route('/delete/:id').get(function (req, res) {
    Room.findByIdAndRemove({ _id: req.params.id },
        function (err, Room) {
            if (err) res.json(err);
            else res.redirect('/manageRoom');
        });
});
module.exports = RoomRouter;