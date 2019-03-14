const { expect } = require('chai');
const sinon = require('sinon');
const mongoose = require('mongoose');

const User = require('../models/user');
const Post = require('../models/post');
const FeedController = require('../controllers/feed');

describe('Feed Controller', () => {
  before(done => {
    mongoose
      .connect(process.env.MONGODB_TEST_URI, { useNewUrlParser: true })
      .then(() => {
        const user = new User({
          email: 'tet@test.com',
          password: 'tester',
          name: 'Test',
          posts: [],
          _id: '5c0f66b979af55031b34728a'
        });

        return user.save();
      })
      .then(() => done());
  });

  beforeEach(() => {});
  afterEach(() => {});

  it('should add a created post to the posts of the creator', done => {
    const req = {
      userId: '5c0f66b979af55031b34728a',
      body: {
        title: 'Test post',
        content: 'A test post'
      },
      file: {
        path: 'abc'
      }
    };
    const res = {
      statusCode: 500,
      data: null,
      status(code) {
        this.statusCode = code;
        return this;
      },
      json(data) {
        this.userStatus = data.status;
      }
    };

    FeedController.createPost(req, res, () => {})
      .then(() => {
        return User.findById('5c0f66b979af55031b34728a');
      })
      .then(savedUser => {
        expect(savedUser).to.have.property('posts');
        expect(savedUser.posts).to.have.length(1);

        done();
      });
  });

  after(done => {
    User.deleteMany({})
      .then(() => mongoose.disconnect())
      .then(() => done());
  });
});
