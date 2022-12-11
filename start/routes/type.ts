import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
      Route.group(() => {
            Route.resource('type/biens', 'TypeBiensController')
            Route.resource('type/appartement', 'TypeAppartementsController')
      }).middleware('auth:user')
}).prefix('api/v1/')