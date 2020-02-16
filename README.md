# Smart Device For Home Automation

The Idea behind the system design

-   So the idea is using the apis, we can control the connected smart devices.
-   First, a user registers in, one default home with 4 default rooms are created for the user, next time when the user logs in, no other home or room will be created, not even default rooms for newly created home.
-   He can update home and rooms data.
-   First, rooms grouped by homes are fetched.
-   Based upon that, smart devices apis are called.
-   Listing of all smart devices in a room, update the device, it's status or associate it with another room, or delete it entirely is also possible.
-   A user can have multiple homes, each home can have multiple rooms. Each room can have multiple smart devices.

# Run the project

-   `npm i`
-   `npm i nodemon -g`
-   `npm run dev` || `npm run prod`
