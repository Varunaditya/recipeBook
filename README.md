# Recipe Book
Link: https://therecipebook.azurewebsites.net/
An Angular web application that provides recipes to the users and the option 
to add the ingredients to a shopping list. The application allows adding new recipes, 
editing existing ingredients and the shopping list.

## Development Server
Run ng serve for a development server. Navigate to http://localhost:4200/. The app will automatically reload if you change any of the source files.

### Prerequisites

Run 'npm install' to install all the dependencies.

## Components
The application has three main components

### Authorization Component
This component is responsible for granting access to authorized users and caters the signin/ signup page.

### Recipe Component
This component handles tasks like adding new recipes, editing existing ones and deleting recipes.

### Shopping List Component
This component takes care of the shopping list - adding items, deleting items. It also establishes cross-component communication
with the Recipe Component to get the ingredients of a recipe to the shopping list.

## Built With
* [Angular](https://angular.io/)  - The front-end web application platform
* [Firebase](https://firebase.google.com) - User authorization and database management services

## Authors
[Varunaditya Jadwal](https://github.com/Varunaditya/) 
