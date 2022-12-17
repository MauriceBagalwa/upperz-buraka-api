import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
      Route.group(() => {
            Route.resource('personnes', 'PersonnesController')
            Route.post('personnes/phones/:id', 'PersonnesController.addPhone')
            Route.put('personnes/phones/:id', 'PersonnesController.updatePhone')
            Route.put('personnes/phones/running/:id', 'PersonnesController.selectRunningPhone')
            Route.delete('personnes/phones/:id', 'PersonnesController.deletePhone')
      }).middleware('auth:user')


}).prefix('api/v1/')