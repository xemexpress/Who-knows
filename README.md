# UniMemo Blog API Spec

### Authentication Header:

`Authorization: Token jwt.token.here`


## JSON Objects returned by API:

### Users (for authentication)

```JSON
{
  "user": {
    "username": "Jason",
    "token": "jwt.token.here",
    "image": "https://res.cloudinary.com/unimemo-dfd94/image/upload/v1500289994/c6zgp0zjykx6t4uxva19.jpg"
  }
}
```

### Profile

```JSON
{
  "profile": {
    "username": "Jason",
    "image": "https://res.cloudinary.com/unimemo-dfd94/image/upload/v1500289994/c6zgp0zjykx6t4uxva19.jpg"
  }
}
```

### Single Article

```JSON
{
  "article": {
    "slug": "how-to-live-in-the-sea-of-palaces",
    "title": "How to live in the Sea of Palaces",
    "body": "Mark two points on a paper, and connect them.",
    "createdAt": "2017-08-14T00:00:59.720Z",
    "updatedAt": "2017-08-14T00:00:59.720Z",
    "author": {
      "username": "Jason",
      "image": "https://res.cloudinary.com/unimemo-dfd94/image/upload/v1500289994/c6zgp0zjykx6t4uxva19.jpg"
    }
  }
}
```

### Multiple Articles

```JSON
{
  "articles":[{
    "slug": "how-to-live-in-the-sea-of-palaces",
    "title": "How to live in the Sea of Palaces",
    "body": "Mark two points on a paper, and connect them.",
    "createdAt": "2017-08-14T00:10:59.720Z",
    "updatedAt": "2017-08-14T00:10:59.720Z",
    "author": {
      "username": "Jason",
      "image": "https://res.cloudinary.com/unimemo-dfd94/image/upload/v1500289994/c6zgp0zjykx6t4uxva19.jpg"
    }
  }, {
    "slug": "why-men-have-been-dominating-in-the-history",
    "title": "Why men have been dominating in the history",
    "body": "Its about a position",
    "createdAt": "2017-08-13T18:24:36.162Z",
    "updatedAt": "2017-08-13T18:24:36.162Z",
    "author": {
      "username": "Jason",
      "image": "https://res.cloudinary.com/unimemo-dfd94/image/upload/v1500289994/c6zgp0zjykx6t4uxva19.jpg"
    }
  }],
  "articlesCount": 2
}
```

### Single Comment

```JSON
{
  "comment": {
    "id": 1,
    "body": "Nuh!",
    "createdAt": "2017-08-13T18:40:39.425Z",
    "updatedAt": "2017-08-13T18:40:39.425Z",
    "author": {
      "username": "Jason",
      "image": "https://res.cloudinary.com/unimemo-dfd94/image/upload/v1500289994/c6zgp0zjykx6t4uxva19.jpg"
    }
  }
}
```

### Multiple Comments

```JSON
{
  "comments": [{
    "id": 1,
    "body": "Nuh!",
    "createdAt": "2017-08-13T18:40:39.425Z",
    "updatedAt": "2017-08-13T18:40:39.425Z",
    "author": {
      "username": "Jason",
      "image": "https://res.cloudinary.com/unimemo-dfd94/image/upload/v1500289994/c6zgp0zjykx6t4uxva19.jpg"
    }
  }, {
    "id": 2,
    "body": "Nuh!",
    "createdAt": "2017-08-14T08:49:12.255Z",
    "updatedAt": "2017-08-14T08:49:12.255Z",
    "author": {
      "username": "Jason",
      "image": "https://res.cloudinary.com/unimemo-dfd94/image/upload/v1500289994/c6zgp0zjykx6t4uxva19.jpg"
    }
  }]
}
```

### Errors and Status Codes

If a request fails any validations, expect a 422 and errors in the following format:

```JSON
{
  "errors":{
    "body": [
      "can't be empty"
    ]
  }
}
```

#### Other status codes:

401 for Unauthorized articles, when a article requires authentication but it isn't provided

403 for Forbidden articles, when a article may be valid but the user doesn't have permissions to perform the action

404 for Not found articles, when a resource can't be found to fulfill the article


## Endpoints:

### Authentication:

`POST /api/users/login`

Example article body:
```JSON
{
  "user":{
    "username": "Jason",
    "password": "unimemo"
  }
}
```

No authentication required, returns a [User](#users-for-authentication)

Required fields: `username`, `password`

### Registration:

`POST /api/users`

Example article body:
```JSON
{
  "user":{
    "username": "Jason",
    "password": "unimemo"
  }
}
```

No authentication required, returns a [User](#users-for-authentication)

Required fields: `username`, `password`

### Get Current User

`GET /api/user`

Authentication required, returns a [User](#users-for-authentication) that's the current user

### Update User

`PUT /api/user`

Example article body:
```JSON
{
  "user":{
    "image": "https://res.cloudinary.com/unimemo-dfd94/image/upload/v1500289994/c6zgp0zjykx6t4uxva19.jpg"
  }
}
```

Authentication required, returns the [User](#users-for-authentication)


Optional fields: `password`, `image`

### List Articles

`GET /api/articles`

Query Parameters:

Limit number of articles (default is 10):

`?limit=10`

Offset number of articles (default is 0):

`?offset=0`

Authentication optional, returns [multiple articles](#multiple-articles), ordered by most recent first

### Retrieve Article

`GET /api/articles/:slug`

Authentication optional, returns [single Article](#single-article)

### Create Article

`POST /api/articles`

Example article body:

```JSON
{
  "article": {
    "title": "How to live in the Sea of Palaces",
    "body": "Mark two points on a paper, and connect them.",
    "author": {
      "username": "Jason",
      "image": "https://res.cloudinary.com/unimemo-dfd94/image/upload/v1500289994/c6zgp0zjykx6t4uxva19.jpg"
    }
  }
}
```

Authentication required, returns the [Article](#single-article)

Required fields: `title`, `body`

### Update Article

`PUT /api/articles/:slug`

Example article body:

```JSON
{
  "article": {
    "body": "Link a point to another!"
  }
}
```

Authentication required, returns the updated [Article](#single-article)

Optional fields: `title`, `body`

### Delete Article

`DELETE /api/articles/:slug`

Authentication required, returns {}

### Get Comments from an Article

`GET /api/articles/:slug/comments`

No authentication required, returns [multiple Comments](#multiple-comments)

### Add Comment to an Article

`POST /api/articles/:slug/comments`

Example article body:

```JSON
{
  "comment": {
    "body": "Nuh!"
  }
}
```

Authentication required, returns the [Comment](#single-comment)

Required fields: `body`

### Update Comment

`PUT /api/articles/:slug/comments/:id`

Example comment body:

```JSON
{
  "comment": {
    "body": "Yep!"
  }
}
```

Authentication required, returns the updated [Comment](#single-comment)

Optional fields: `body`

### Delete Comment

`DELETE /api/articles/:slug/comments/:id`

Authentication required, returns {}