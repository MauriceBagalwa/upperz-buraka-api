import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
      Route.group(() => {
            Route.resource('rental-contrats', 'RentalContratsController')
            Route.post('rental-contrats/break/:id', 'RentalContratsController.breakContract')
            Route.get('guarantees', 'RentalContratsController.indexGuarantee')
            Route.resource('recoveries', 'RecoveriesController')

            Route.resource('payments/bank', 'BankPaymentsController')
            Route.resource('payments', 'PaymentsController')

            Route.get('payments/historical/:id', 'PaymentsController.historical')
      }).middleware('auth:user')

}).prefix('api/v1')