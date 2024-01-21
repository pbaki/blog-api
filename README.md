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

Currently everyone has access to make requests, and sample get request could be to https://blogapi22.adaptable.app/posts to get list of posts from MongoDB database.
