# Run the following commands after cloning:
$ npm install

## Make a .env file and store DATABASE_URL=<YOUR_DATABASE_URL> inside it

$ npx prisma migrate dev --name init

# To view data in browser use the following command
$ npx prisma studio

# To run backend:
$ npm run dev
