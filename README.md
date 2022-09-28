# Community API

## Considerations for your backend with [CORS](https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)

If the backend is about to run on a different host/port than the frontend, make sure to handle `OPTIONS` too and return correct `Access-Control-Allow-Origin` and `Access-Control-Allow-Headers` (e.g. `Content-Type`).

### Authentication Header:

Add the jwt token in the Header (POSTMAN)

`Authorization: Token jwt.token.here`

## JSON Objects returned by API:

Make sure the right content type like `Content-Type: application/json; charset=utf-8` is correctly returned.


#### Other status codes:

401 for Unauthorized requests, when a request requires authentication but it isn't provided

403 for Forbidden requests, when a request may be valid but the user doesn't have permissions to perform the action

404 for Not found requests, when a resource can't be found to fulfill the request


## Endpoints:


### Authentication:

`POST /api/users/login`

Example request body:
```JSON

{
 "email": "qwerty900@gmail.com",
 "password": 12345
}

```

No authentication required, returns a User (for authentication)

```JSON
{
    "user": {
        "email": "qwerty900@gmail.com",
        "username": "qwerty900",
        "token": 
"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InF3ZXJ0eTkwMCIsImlzQWRtaW4iOmZhbHNlLCJpYXQiOjE2MzE5NTc5Mjh9.o3PkflVPIIRqLDRzzGvFLlZAX6LS7WZ3_NafjvbA7HU"
    }
}
```

Required fields: `email`, `password`


### Registration:

`POST /api/users/register`

Example request body:
```JSON
{
   "email": "qwerty900@gmail.com",
   "username": "qwerty900",
   "password": 12345
}
```

No authentication required, returns a User (for authentication)

```JSON
{
    "user": {
        "email": "qwerty900@gmail.com",
        "username": "qwerty900",
        "token": 
"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InF3ZXJ0eTkwMCIsImlzQWRtaW4iOmZhbHNlLCJpYXQiOjE2MzE5NTc5Mjh9.o3PkflVPIIRqLDRzzGvFLlZAX6LS7WZ3_NafjvbA7HU"
    }
}
```

Required fields: `email`, `username`, `password`



### Get Current User

`GET /api/users/currentUserData`

Authentication required, returns a User,  that's the current user

```JSON
{
    "user": {
        "email": "qwerty900@gmail.com",
        "username": "qwerty900",
        "token": 
"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InF3ZXJ0eTkwMCIsImlzQWRtaW4iOmZhbHNlLCJpYXQiOjE2MzE5NTc5Mjh9.o3PkflVPIIRqLDRzzGvFLlZAX6LS7WZ3_NafjvbA7HU"
    }
}


### Get Profile

`GET /api/profiles/:username`

Authentication optional, returns a Profile


```JSON
{
    "profile": {
        "username": "qwerty900",
        "isAdmin": false,
        "isBlocked": false
    }
}
```

### Update User

`PUT /api/user`

Example request body:
```JSON
{
  "email": "qwerty600@gmail.com",
}
```

Authentication required, returns the User


```JSON
{
    "user": {
        "email": "qwerty600@gmail.com",
        "username": "qwerty900",
        "token": 
"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InF3ZXJ0eTkwMCIsImlzQWRtaW4iOmZhbHNlLCJpYXQiOjE2MzE5NTc5Mjh9.o3PkflVPIIRqLDRzzGvFLlZAX6LS7WZ3_NafjvbA7HU"
    }
}
```
Accepted fields: `email`, `username`, `password`

### Follow user

`GET /api/users/follow/:id`

Authentication required, returns an Updated User & Target User


```JSON
{
    "updatedUser": {
        "questions": [],
        "answers": [],
        "followers": [],
        "following": [],
        "isAdmin": false,
        "isBlocked": false,
        "_id": "6145b3a7f3b91a711a2f7756",
        "email": "qwerty900@gmail.com",
        "username": "qwerty900",
        "password": "$2a$10$zB9AbrnpJQ7oqLZc8xsLNO3W66Zqxd1P1/jqlxn6BSj.j2WwIALD.",
        "profile": "6145b3a8f3b91a711a2f7757",
        "__v": 0
    },
    "updatedTargetUser": {
        "questions": [],
        "answers": [],
        "followers": [],
        "following": [],
        "isAdmin": false,
        "isBlocked": false,
        "_id": "6145c0abf5517c73a5046252",
        "email": "narendra@gmail.com",
        "username": "narendra",
        "password": "$2a$10$MQcX29RqJQm4RAYVmNFnTups3KdRaqRPTU7OTOPtjGqty6Xq60Jkm",
        "profile": "6145c0abf5517c73a5046253",
        "__v": 0
    }
}
```
No additional parameters required



### Unfollow user

`GET /api/users/unfollow/:id`

Authentication required, returns a [Updateduser](#updateduser)

```JSON
{
    "updatedUser": {
        "questions": [],
        "answers": [],
        "followers": [],
        "following": [
            "6145c0abf5517c73a5046252"
        ],
        "isAdmin": false,
        "isBlocked": false,
        "_id": "6145b3a7f3b91a711a2f7756",
        "email": "qwerty900@gmail.com",
        "username": "qwerty900",
        "password": "$2a$10$zB9AbrnpJQ7oqLZc8xsLNO3W66Zqxd1P1/jqlxn6BSj.j2WwIALD.",
        "profile": "6145b3a8f3b91a711a2f7757",
        "__v": 0
    },
    "updatedTargetUser": {
        "questions": [],
        "answers": [],
        "followers": [
            "6145b3a7f3b91a711a2f7756"
        ],
        "following": [],
        "isAdmin": false,
        "isBlocked": false,
        "_id": "6145c0abf5517c73a5046252",
        "email": "narendra@gmail.com",
        "username": "narendra",
        "password": "$2a$10$MQcX29RqJQm4RAYVmNFnTups3KdRaqRPTU7OTOPtjGqty6Xq60Jkm",
        "profile": "6145c0abf5517c73a5046253",
        "__v": 0
    }
}
```

No additional parameters required



### Create New Question

`POST /api/questions/`


```JSON
{
      "title": "how to train a dragon",
      "description":
        "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years,grabIdtimes by accident,grabIdtimes on purpose (injected humour and the like).",
      "tags": "education,knowledge"
}
```
Authentication required, will return Specific Question created by followed users, ordered by most recent first.

```JSON
{
    "question": {
        "upvoteCount": 0,
        "upvotedBy": [],
        "comments": [],
        "tags": [
            "education,knowledge"
        ],
        "answers": [],
        "_id": "6145c4ddf5517c73a504625c",
        "title": "how to train a dragon",
        "description": "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years,grabIdtimes by accident,grabIdtimes on purpose (injected humour and the like).",
        "author": "6145b3a8f3b91a711a2f7757",
        "createdAt": "2021-09-18T10:52:13.772Z",
        "updatedAt": "2021-09-18T10:52:13.772Z",
        "slug": "how-to-train-a-dragon",
        "__v": 0
    }
}
```

### Get All the Questions

`GET /api/questions/`

Authentication required, will return Specific Question created by followed users, ordered by most recent first.

```JSON
{
    "questions": [
        {
            "upvoteCount": 0,
            "upvotedBy": [],
            "comments": [],
            "tags": [
                "education,knowledge"
            ],
            "answers": [],
            "_id": "6145c4ddf5517c73a504625c",
            "title": "how to train a dragon",
            "description": "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years,grabIdtimes by accident,grabIdtimes on purpose (injected humour and the like).",
            "author": "6145b3a8f3b91a711a2f7757",
            "createdAt": "2021-09-18T10:52:13.772Z",
            "updatedAt": "2021-09-18T10:52:13.772Z",
            "slug": "how-to-train-a-dragon",
            "__v": 0
        },
        {
            "upvoteCount": 0,
            "upvotedBy": [],
            "comments": [],
            "tags": [
                "education,knowledge"
            ],
            "answers": [
                "6145dde28bcd5d7cce6237e3"
            ],
            "_id": "6145cf268bcd5d7cce6237d8",
            "title": "how to train a dragon2",
            "description": "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years,grabIdtimes by accident,grabIdtimes on purpose (injected humour and the like).",
            "author": "6145b3a8f3b91a711a2f7757",
            "createdAt": "2021-09-18T11:36:06.830Z",
            "updatedAt": "2021-09-18T12:38:58.117Z",
            "slug": "how-to-train-a-dragon2",
            "__v": 0
        }
    ]
}
```

### Update Question using Id

`PUT /api/questions/:id`

Example request body:
```JSON
{
  "description": "hello pen please"
}
```

Authentication required, will return Specific Updated Question created by followed users.

```JSON
{
	"_id" : "6145c4ddf5517c73a504625c",
	"upvoteCount" : 0,
	"upvotedBy" : [ ],
	"comments" : [ ],
	"tags" : [
		"education,knowledge"
	],
	"answers" : [ ],
	"title" : "how to train a dragon3",
	"description" : "hello pen please",
	"author" : "6145b3a8f3b91a711a2f7757",
	"createdAt" : "2021-09-18T10:52:13.772Z",
	"updatedAt" : "2021-09-18T12:47:40.638Z",
	"slug" : "how-to-train-a-dragon",
	"__v" : 0
}
```

### Create New Answer

`POST /api/questions/:id/answers`

Authentication required, will return added Answer to the specific targeted question.

{
    "answer": {
        "upvoteCount": 0,
        "upvotedBy": [],
        "comments": [],
        "_id": "6145e15e8b19eb87fd7f0614",
        "text": "hey all , here is my answer",
        "author": "6145b3a8f3b91a711a2f7757",
        "questionId": "6145c4ddf5517c73a504625c",
        "createdAt": "2021-09-18T12:53:50.818Z",
        "updatedAt": "2021-09-18T12:53:50.818Z",
        "__v": 0
    }
}

### Get All the List of Answers

`GET /api/questions/:id/answers`

Authentication required, will return all the Answers for the specific Question.

```JSON
{
    "answers": [
        {
            "upvoteCount": 0,
            "upvotedBy": [],
            "comments": [],
            "_id": "6145e15e8b19eb87fd7f0614",
            "text": "hey all , here is my answer",
            "author": "6145b3a8f3b91a711a2f7757",
            "questionId": "6145c4ddf5517c73a504625c",
            "createdAt": "2021-09-18T12:53:50.818Z",
            "updatedAt": "2021-09-18T12:53:50.818Z",
            "__v": 0
        }
    ]
}
```


### Upvote the Question

`GET /api/questions/upvote/:id`

Authentication required, will return upvotes info for the specific Question.

```JSON
{
    "question": {
        "upvoteCount": 1,
        "upvotedBy": [
            "6145b3a8f3b91a711a2f7757"
        ],
        "comments": [],
        "tags": [
            "education,knowledge"
        ],
        "answers": [
            "6145e15e8b19eb87fd7f0614"
        ],
        "_id": "6145c4ddf5517c73a504625c",
        "title": "how to train a dragon3",
        "description": "hello pen please",
        "author": "6145b3a8f3b91a711a2f7757",
        "createdAt": "2021-09-18T10:52:13.772Z",
        "updatedAt": "2021-09-18T12:58:55.922Z",
        "slug": "how-to-train-a-dragon",
        "__v": 0
    }
}
```
### Delete the Upvote of the question

`GET /api/questions/removeupvote/:id`

Authentication required, will return upvotes info for the specific Question.

```JSON
{
    "question": {
        "upvoteCount": 0,
        "upvotedBy": [
            "6145b3a8f3b91a711a2f7757"
        ],
        "comments": [],
        "tags": [
            "education,knowledge"
        ],
        "answers": [
            "6145e15e8b19eb87fd7f0614"
        ],
        "_id": "6145c4ddf5517c73a504625c",
        "title": "how to train a dragon3",
        "description": "hello pen please",
        "author": "6145b3a8f3b91a711a2f7757",
        "createdAt": "2021-09-18T10:52:13.772Z",
        "updatedAt": "2021-09-18T12:58:55.922Z",
        "slug": "how-to-train-a-dragon",
        "__v": 0
    }
}
```
### Create a Comment on your question

`POST /api/questions/comments/:id`

Authentication required, will return added comments info for the question.

```JSON
{
    "comment": {
        "_id": "6145e5498b19eb87fd7f0624",
        "text": "iam comment over here",
        "author": "6145b3a8f3b91a711a2f7757",
        "questionId": "6145c4ddf5517c73a504625c",
        "createdAt": "2021-09-18T13:10:33.381Z",
        "updatedAt": "2021-09-18T13:10:33.381Z",
        "__v": 0
    }
}
```

### Update Answer using Id

`POST /api/answers/:id`

Authentication required, will return updated answer for the question.

```JSON
{
    "answer": {
        "upvoteCount": 0,
        "upvotedBy": [],
        "comments": [],
        "_id": "6145e15e8b19eb87fd7f0614",
        "text": "hey all , here is my answer",
        "author": "6145b3a8f3b91a711a2f7757",
        "questionId": "6145c4ddf5517c73a504625c",
        "createdAt": "2021-09-18T12:53:50.818Z",
        "updatedAt": "2021-09-18T12:53:50.818Z",
        "__v": 0
    }
}

```

### Upvote the Answer

`GET /api/Answers/upvote/:id`

Authentication required, will return upvotes info for the specific Answer.

```JSON
{
    "answer": {
        "upvoteCount": 0,
        "upvotedBy": [],
        "comments": [],
        "_id": "6145e15e8b19eb87fd7f0614",
        "text": "here is my answer for how to train a dragon",
        "author": "6145b3a8f3b91a711a2f7757",
        "questionId": "6145c4ddf5517c73a504625c",
        "createdAt": "2021-09-18T12:53:50.818Z",
        "updatedAt": "2021-09-18T13:16:28.074Z",
        "__v": 0
    }
}
```

### Delete the Upvote the Answer

`GET /api/Answers/removeupvote/:id`

Authentication required, will return downvotes info for the specific Answer.

```JSON
{
    "answer": {
        "upvoteCount": 0,
        "upvotedBy": [],
        "comments": [],
        "_id": "6145e15e8b19eb87fd7f0614",
        "text": "here is my answer for how to train a dragon",
        "author": "6145b3a8f3b91a711a2f7757",
        "questionId": "6145c4ddf5517c73a504625c",
        "createdAt": "2021-09-18T12:53:50.818Z",
        "updatedAt": "2021-09-18T13:25:32.258Z",
        "__v": 0
    }
}
```
### Create a new Comment

`POST /api/Answers/comment/:id`

Authentication required, will return comment info for the specific Answer.

```JSON
{
    "comment": {
        "_id": "6145eab46ddc5b8cc77156ce",
        "text": "Here is my comment for answer",
        "author": "6145b3a8f3b91a711a2f7757",
        "answerId": "6145e15e8b19eb87fd7f0614",
        "createdAt": "2021-09-18T13:33:40.406Z",
        "updatedAt": "2021-09-18T13:33:40.406Z",
        "__v": 0
    }
}
```
### Get all the list of avaialable Tags

`GET /api/tags`

Authentication required, will return Tag data from all the questions.

```JSON
{
    "tags": [
        "education,knowledge"
    ]
}
```
### Delete question using the slug

Authentication required, will return question info.

```JSON
{
    "question": {
        "upvoteCount": 1,
        "upvotedBy": [],
        "comments": [
            "6145e5498b19eb87fd7f0624"
        ],
        "tags": [
            "education,knowledge"
        ],
        "answers": [
            "6145e15e8b19eb87fd7f0614"
        ],
        "_id": "6145c4ddf5517c73a504625c",
        "title": "how to train a dragon3",
        "description": "hello pen please",
        "author": "6145b3a8f3b91a711a2f7757",
        "createdAt": "2021-09-18T10:52:13.772Z",
        "updatedAt": "2021-09-18T13:10:33.383Z",
        "slug": "how-to-train-a-dragon",
        "__v": 0
    }
}
```
### Delete Answer

Authentication required, will return Answer info.
```JSON
{
    "answer": {
        "upvoteCount": 0,
        "upvotedBy": [],
        "comments": [],
        "_id": "6145e15e8b19eb87fd7f0614",
        "text": "here is my answer for how to train a dragon",
        "author": "6145b3a8f3b91a711a2f7757",
        "questionId": "6145c4ddf5517c73a504625c",
        "createdAt": "2021-09-18T12:53:50.818Z",
        "updatedAt": "2021-09-18T13:16:28.074Z",
        "__v": 0
    }
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
