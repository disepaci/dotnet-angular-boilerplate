# .NET Core 3.1 / Angular 10 Boilerplate - V.1.0.0

Boilerplate for projects using ASP.NET Core 3.1 and Angular.

Enjoy it!


# Build

- just build the client with angular cli and then the .Net project. 

- the angular bundle will be outputed at `API/wwwroot` and served as static resourse from API
server.


# Back / Front ends

## API

the APi has a middelware to handle the redirection to angular bundle.

- auth controller implemented
- see api documentation importing
  `API_documentation_BoilerplateApi.postman_collection.json` file in postman. as
  recomendation you sould keep using and scalling this documentation.
- in case of using databases, write the database initialization script in
  `sqlScripts.sql` file located in repo's root

## Client

- 3 modules: `private` `public` and `admin`
- guards implementation for private and admin modules
- auth services implemented
- using sass as default css engine
- error page components
- api models implemented

## client variations

you can choose variations of client on angular depending on the
repo branch you checkout: 

### master

Clean and basic angular project without external plugins o css frameworks
installed

### materialDesign

> comming soon

Angular proyect with meterial design intalled

### Bootstrap

> comming soon

Angular proyect with bootstrap framework intalled
