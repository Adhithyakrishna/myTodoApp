var express = require('express');
var router = express.Router();

var User = require('../models/user');

// Get Homepage
router.get('/',function(req, res){
	res.redirect('/task');
});

router.get('/addTask', function(req, res){
	res.render('addTask');
	});

router.get('/task', function(req, res){
   User.listTask(function(err, user){
	if(err)
	{
		throw err;
	}
	else
	{
		console.log(user);
	res.render('task',{
		user: user
		});
		}
	});
});
router.get('/completed', function(req, res){
   User.listCompletedTask(function(err, taskList){
	if(err)
	{
		throw err;
	}
	else
	{
		console.log(taskList);
		res.render('completed',{
		taskList: taskList,
		hasDate: false
		});
		}
	});
});

router.get('/removed', function(req, res){
   User.listRemovedTask(function(err, taskList){
	if(err)
	{
		throw err;
	}
	else
	{
		console.log(taskList);
		res.render('removed',{
		taskList: taskList,
		hasDate: false
		});
		}
	});
});

router.post('/completed', function(req, res){
	var startDate = req.body.startingDate;
	if(startDate.length>0)
	{
		var query = { $and: [{ updatedAt: { $eq: startDate}}, {isCompleted: true}] };

		User.find(query,function(err, taskList){
		if(err)
		{
			throw err;
		}
		else
		{
			console.log(taskList);
			res.render('completed',{
			taskList: taskList,
			hasDate: true
			});
			}
		});
	}
	else
	{
		res.redirect(req.get('referer'));
	}

});

router.post('/removed', function(req, res){
	var startDate = req.body.startingDate;

	var query = { $and: [{ updatedAt: { $eq: startDate}}, {isDeleted: true}] };

	User.find(query,function(err, taskList){
	if(err)
	{
		throw err;
	}
	else
	{
		console.log(taskList);
		res.render('completed',{
		taskList: taskList,
		hasDate: true
		});
		}
	});

});



module.exports = router;