# SocialCops Node Task

Implemented API Endpoints as asked and mocha test scripts for them. User authentication has been implemented using JSON Web Tokens. Have used MongoDB as the database to store user information. For JSON patching endpoint, I have used jsonpatch.js library. Have used Morgan library for Logging/Monitoring. Used prettifier atom plugin for ES6 linting.

Project is live at: https://rocky-depths-18228.herokuapp.com/

## Setup

```
git clone https://github.com/prafful13/socialcops-task.git
cd socialcops-task
npm install
npm start
```

For testing, run: `npm test`

## API Endpoints

### 1. To register new users

### URL: /api/auth/register

**Resource Information**

|                 |        |
| --------------- | ------ |
| Request Method  | `POST` |
| Response Format | `JSON` |

**Data Parameters**

|   Name   | Required |   Description   | Default Value |    Example     |
| :------: | :------: | :-------------: | :-----------: | :------------: |
|   name   | required |   User's name   |               |      Ravi      |
|  email   | required | User's email id |               | Ravi@gmail.com |
| password | required | User's password |               | Ravispassword  |

**Example Request**

`POST /api/auth/register`

---

### 2. Login endpoint

### URL: /api/auth/login

**Resource Information**

|                 |        |
| --------------- | ------ |
| Request Method  | `POST` |
| Response Format | `JSON` |

**Data Parameters**

|   Name   | Required |   Description   | Default Value |    Example     |
| :------: | :------: | :-------------: | :-----------: | :------------: |
|  email   | required | User's email id |               | Ravi@gmail.com |
| password | required | User's password |               | Ravispassword  |

**Example Request**

`POST /api/auth/login`

---

### 3. Logout endpoint

### URL: /api/auth/logout

**Resource Information**

|                 |        |
| --------------- | ------ |
| Request Method  | `GET`  |
| Response Format | `JSON` |

**Example Request**

```
GET /api/auth/logout
```

---

### 4. Json patch endpoint

### URL: /api/jsonpatch

**Resource Information**

|                 |        |
| --------------- | ------ |
| Request Method  | `POST` |
| Response Format | `JSON` |

**Data Parameters**

|     Name     | Required |               Description                | Default Value |                                                                    Example                                                                    |
| :----------: | :------: | :--------------------------------------: | :-----------: | :-------------------------------------------------------------------------------------------------------------------------------------------: |
| Json object  | required |    Original json object to be patched    |               |                                                         {"baz": "qux", "foo": "bar"}                                                          |
| Patch object | required | Patch Object containg various operations |               | [{ "op": "replace", "path": "/baz", "value": "boo" },{ "op": "add", "path": "/hello", "value": ["world"] },{ "op": "remove", "path": "/foo"}] |

**Example Request**

`POST /api/jsonpatch/`

---

### 5. Create thumbnail endpoint

### URL: /api/imgdown

**Resource Information**

|                 |         |
| --------------- | ------- |
| Request Method  | `POST`  |
| Response Format | `IMAGE` |

**Data Parameters**

| Name | Required |    Description     | Default Value |                                  Example                                  |
| :--: | :------: | :----------------: | :-----------: | :-----------------------------------------------------------------------: |
| url  | required | Image's public URL |               | https://upload.wikimedia.org/wikipedia/commons/c/c6/Sierpinski_square.jpg |

**Example Request**

```
POST /api/imgdown
```

---
