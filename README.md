# LIRI

LIRI is an application made by me, Hayley Hartman, in October 2018. LIRI is a command line node app that returns information to the user based on the command entered. Users can use this app to search a specific movie, song, or musician, and the app returns information back through the console. Please see below for an example of how the concert-this functionality works, or reference the table below to see how other commands work.

Command | Source | Function
------- | ------ | -------- 
movie-this [+ a movie title] | OMDB API | returns movie information for a movie of the user's choice
concert-this [+ a band name] | bands in town API | returns the next five shows that band is playing, the name of the venue, and the date of the show
spotify-this-song [+ song title] | node spotify API | returns song information for a song of the user's choice
do-this | fs and any of the above APIs | retrieves information from a separate document (formatted as command,thing to be searched)

![image of concert-this](concert-this.png)


