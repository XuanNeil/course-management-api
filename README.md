## Getting Started

1. First, install node modules:

```bash
npm install
or
yarn
```

2. Second, create .env file

```bash
## Environment ##
NODE_ENV=development

## Server ##
PORT=3001
HOST=localhost
DATABASE_URL=mongodb://localhost:27017
ACCESS_TOKEN_KEY=ACCESS_TOKEN
REFRESH_TOKEN_KEY=REFRESH_TOKEN
ACCESS_TOKEN_LIFE=10m
REFRESH_TOKEN_LIFE=10m
HASH_CODE=8
```

3. After, run the development server:

```bash
npm run dev
or
yarn dev
```

4.  Docs: (http://localhost:3001/docs)
    1. Auth api.
       - Register (POST: `auth/register`)
       - Login (POST: `auth/login`)
       - Refresh Token (POST: `auth/refresh_token`)
    2. Course api.
       - Create Course (POST: `course/create`)
       - List Course (GET: `course/list`)
       - Detail Course (GET: `course/{course_id}`)
       - Update Course (PUT: `course/{course_id}/update`)
       - Delete Course (DELETE: `course/{course_id}/delete`)
    3. Project api.
       - Create Project (POST: `project/create`)
       - List Project (GET: `project/list`)
       - Detail Project (GET: `project/{project_id}`)
       - Update Project (PUT: `project/{project_id}/update`)
       - Delete Project (DELETE: `project/{project_id}/delete`)
       
Open http://localhost:3001 with your browser to see the result.
