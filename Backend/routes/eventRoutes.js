const express=require('express');
const { getEvents, createEvent,getEventscreatedbyparticularperson, getEventById, updateEvent, deleteEvent, rsvp, remove_rsvp, remove_rsvp_from_table } = require('../Controllers/eventController');
const { protect } = require('../middlewares/authMiddleware');
const router=express.Router()

// To get all the events
router.route('/').get( getEvents);  //protect is middleware
//here on get request it would send getEvents res.json file 

router.route('/get').get(protect,getEventscreatedbyparticularperson);
// to create a event
router.route('/create').post(protect,createEvent);

// suppose we get a route of id so we should be able to get the the event , edit (put) the event and delete the event so we add .get() .put and .delete()
router.route('/:id').get(getEventById).put(protect,updateEvent).delete(protect,deleteEvent);

router.route('/:id/rsvp').put(protect,rsvp);
router.route('/:id/remove_rsvp').put(remove_rsvp);
router.route('/:id/remove_rsvp_list_event').put(remove_rsvp_from_table);

module.exports=router;