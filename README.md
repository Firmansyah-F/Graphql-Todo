##todo app

npm install
copy .envexample kemudian diisi dengan credential masing masing
npx sequeliz-cli db:create
npx sequeliz-cli db:migrare
npx sequeliz-cli db:seed:all
hot reload npm rund dev
node npm start