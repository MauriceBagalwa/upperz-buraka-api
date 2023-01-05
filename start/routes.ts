/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| This file is dedicated for defining HTTP routes. A single file is enough
| for majority of projects, however you can define routes in different
| files and just make sure to import them inside this file. For example
|
| Define routes in following two files
| ├── start/routes/cart.ts
| ├── start/routes/customer.ts
|
| and then import them inside `start/routes.ts` as follows
|
| import './routes/cart'
| import './routes/customer'
|
*/

import Route from '@ioc:Adonis/Core/Route'
import "./routes/appartement"
import "./routes/entreprise"
import "./routes/type"
import "./routes/user"
import "./routes/personne"
import "./routes/location"
// import moment from 'moment'

Route.get('/', async () => {

  // const dateOne = moment(moment('2023-01-01T14:34:18.000+01:00'))
  // const dayTwo = moment()
  // const result = dateOne.diff(moment(), 'minute')
  // const hours = (result / 60)
  // const days = (hours / 24)
  // const d2 = d
  // var now = moment();
  // var day = moment(moment('2023-01-06T14:34:18.000+01:00'));
  // var remaining = day.diff(now, 'days');
  return { hello: 'Welcome to the party of yakuza 🚀' }
  // return {
  //   remaining
  //   dateOne,
  //   dayTwo,
  //   result,
  //   minutes: result,
  //   hours,
  //   days:Math.round(days),
  // }
})
