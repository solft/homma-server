const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();

let postSchema = require('../../models/post');


/**
 * CREATE - CREATE PHOTO POST
 * POST api/posts/create/:name
 * name collection에 사진 post 저장
 */
router.post('/create/:name', (req, res) => {
  const name = req.params.name;
  let Post = mongoose.model(name, postSchema);
  let post = new Post(req.body);
  post.save()
    .then(() => {
      res.status(200).json({ 'post': 'post is added successfully'});
    })
    .catch(() => {
      res.status(400).send('unable to save to database');
    });
});

/**
 * READ : READ ONE IDOL's ALL PHOTOS
 * GET api/posts/read/:name
 * name collection의 post를 페이지 사이즈로 가져오기
 */
router.get('/read/:name', (req, res) => {
  const name = req.params.name;
  
  const page = Number(req.query.page) || 1; // query가 없으면 첫 페이지
  let Post = mongoose.model(name, postSchema);
  Post.find(null, null, { sort: { date: -1 }, skip: ((page-1)*36), limit: 36 },(err, posts) => {
    if(err) {
      res.json(err);
    } else {
      res.json(posts);
    }
  });
});

router.get('/count/:name', (req, res) => {
  const name = req.params.name;
  let Post = mongoose.model(name, postSchema);
  Post.countDocuments((err, count) => {
    if(err) {
      res.json(err);
    } else {
      res.json(count);
    }
  });
});

/**
 * READ : READ ONE IDOL'S ONE PHOTO
 * GET api/posts/read/:name/:id
 * name collection의 id가 동일한 하나 가져오기
 * 결과로 하나만 나온다.
 */
/*
router.get('/read/:name/:id', (req, res) => {
  const name = req.params.name;
  const id = req.params.id;
  let Post = mongoose.model(name, postSchema);
  Post.findById(id ,(err, post) => {
    if(err) {
      res.json(err);
    } else {
      res.json(post);
    }
  });
});
*/

/**
 * 특정 날짜의 사진 불러오기
 * GET api/posts/:name/:date
 */
router.get('/read/:name/:date', (req, res) => {
  const name = req.params.name;
  const date = req.params.date;
  let Post = mongoose.model(name, postSchema);
  Post.find({ date: date }, (err, posts) => {
    if(err) {
      res.json(err);
    } else {
      res.json(posts);
    }
  });
});

// TEST 용
router.get('/test/:name', (req, res) => {
  const name = req.params.name;
  let Post = mongoose.model(name, postSchema);
  console.log(req.query);
  Post.find({ homma: 'box' }, null, { limit: 10 }, (err, posts) => {
    if(err) {
      res.json(err);
    } else {
      res.json(posts);
    }
  });
});


/**
 * UPDATE : FIND _id and UPDATE THAT POST
 * PUT api/posts/update/:id
 * id로 post 찾아서 해당 post 수정
 */



/**
 * DELETE : FIND _id and DELETE THAT POST
 * DELETE api/posts/delete/:id
 * id로 post 찾아서 해당 post 삭제
 */


module.exports = router;
