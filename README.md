# ID Books

![alt text](http://www.anulla.eu/id_books/INTRO.JPG)

## INSTALLATION PROCEDURE:

To run locally for development purpose:

#### ONLY ONCE
	
1. Create a free [Atlas/MongoDB](https://www.mongodb.com/) account   
		
2. Download the repository
    ```
    git clone https://github.com/AnnaScibska/ID_Books.git
    ```

3. In the root folder
    - Create `.env` file. Use `.env.example` as the example
        - Replace connection string with the one from you DB account
        - Create a JWT secret

	- Run the installation script:
      ```
      npm run installation 
      ```
      All required dependencies are going to be installed

    The application is ready to run locally and to work with

#### START APPLICATION 

4. In the root folder run script:

    ```
    npm run dev
    ```
	  
    Let the application to compile (it takes more time when run for the first time)
    
    The application runs locally:
	
    - Angular running on http://localhost:4200

    - Node (API) application running on http://localhost:5000


## DEPLOYING APPLICATION ON HEROKU PROCEDURE:

#### ONLY ONCE

1. Create a free [Atlas/MongoDB](https://www.mongodb.com/) account (if not done during installation procedure)

2. Create a free [Heroku](https://www.heroku.com/#) account   
		
3. Install [Heroku CLI](https://devcenter.heroku.com/articles/heroku-cli)

4. Download the repository
    ```
    git clone https://github.com/AnnaScibska/ID_Books.git
    ```
5. In the root folder

    - Create a Heroku application

      ```
      heroku create
      ```

    - Set environmental variables

      ```
      heroku config:set MONGODB_URI=<DB_connection_string>
      ```
      
      ```
      heroku config:set JWT_SECRET=<jwt_secret>
      ```

#### BEFORE EVERY DEPLOYMENT

6. Commit all the changes:

    ```  
    git commit -m "commit message"
    ```
  
7. Push application to Heroku:

    ```  
    git push heroku master
    ```
    Let the application deploy (it takes around 5 minutes)
    
  The application is deployed and accessible from everywhere

  Check example application on: https://frozen-cliffs-10385.herokuapp.com/
