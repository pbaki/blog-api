# blog-api

Blog server side api handling requests and login. Login is handled through simple passport Localstrategy configuration, and data is managed using MongoDB.

## Description

Api allows to make requests about:

- posts - Information specific to posts; getting list of posts, creating a post, getting post comments, updating post title etc.
- comments - List of all comments
- users - login, register, logout, and user information like; user posts, user comments (only Admin users can make these requests)

## Getting Started

### Api Hosting

Currently app is hosted using [Adaptable](https://adaptable.io/) free plan and domain name to make requests to is [https://blogapi22.adaptable.app/](https://blogapi22.adaptable.app/).

### Sample request

Currently everyone has access to make requests, and sample get request could be to https://blogapi22.adaptable.app/posts to get list of posts from MongoDB database. Rest of requests are explained below.

---

### Blogpost requests

All blogpost requests follow pattern https://blogapi22.adaptable.app/posts/...

List of all posts - get > /posts

Creating new post - post > /posts with body params ({title: String, authors: [author1, author2], body: String, comments: [comment id1, comment id2]})

Get blogpost by title - get > /posts/posttitle

Update blogpost by title - put > /posts/posttitle with same parameters as Creating new post

Delete post - delete > /posts/posttitle

Get all post comments - get > /posts/posttitle/comments

Create post comment - post > /posts/posttitle/comments with body params ({author: String, body: String, hidden: Boolean, post: {postid}, subcomments: [commentid1, commentid2]})

Get single comment - get > /posts/posttitle/comments/commentid

Update single comment - put > posts/:posttitle/comments/commentid with same params as in Create post comment

Delete comment - delete > /posts/posttitle/comments/commentid

Some initial general rules: Title needs to be unique, and contain at least 1 character, There must be atleast 1 author, Blog content must be at least 5 characters long, Author must contain at least 1 character, comment content body must be at least 5 characters long

---

### Comments requests

All comments requests follow pattern https://blogapi22.adaptable.app/comments/...

List of all comments - > get /comments

---

### Users requests

All user requests expect login, register, logout follow pattern https://blogapi22.adaptable.app/users/...
Only users logged with admin membership can make requests on user, sample admin user is with {username: zxc, password: zxc}

Register user - post > /register with params ({ username : unique username, password : userpassword})

Login user - post > /login with same params as register

Logout - get > /logout

List of all users - get > /users

Get single user - get > /users/username

Update user - put > /users/username with params ({ username: String, email: String, comments: [commentid1, commentid2], posts: [postid1, postid2], membership: One of 3 values - ("basic", "creator", "admin")})

Delete user - delete > /users/username

Get all user posts - get > /users/username/posts

Get single user post - get > /users/username/posts/posttitle

Get all user coments - get > /users/username/comments

Get single user comment - get > /users/username/comments/commentid
