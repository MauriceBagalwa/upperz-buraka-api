import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
      Route.group(() => {
            Route.resource('rental-locations', 'RentalLocationsController')
            Route.post('rental-locations/break/:id', 'RentalLocationsController.breakContract')
            Route.get('guarantees', 'RentalLocationsController.indexGuarantee')
      }).middleware('auth:user')

}).prefix('api/v1')