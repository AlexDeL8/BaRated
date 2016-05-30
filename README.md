=========================
BaRated Final Project
=========================

What is BaRated?
-----------

BaRated is a simple bar website that includes bars from New Brunswick, 
New Jersey.  This project was done for the Advanced Web Design course at Rutgers
University for the Spring 2016 semester.  This project uses the bootstrap
framework to give the site it's layout, Javascript and jQuery for it's
front-end functionality, and ajax and php for it's backend functionality.  The 
backend database is hosted by Cloud 9.  Users are able to post ratings and
comments about the bars on the site as well as view ratings, comments, and 
information about the bars (including hours of operation, phone number, etc.).

APIs Used
---------

There were 3 APIs required for the project and these were the 3 that were
implemented into BaRated.  These were mainly to add a social media aspect for 
the site for users to see a "live-feed" of the current bar expereinces others
are having.  The Google Maps API was used in order to show the location of the
bars in the city.

-Twitter<br />
    The Twitter API was used to retrieve tweets (in the form of a JSON object) using:<br />
        `q: '%23BaRated'`<br />
    with q being the query, and '%23BaRated' (translating to '#BaRated') being the arguement to search by.<br />

-Instagram<br />
    The Instagram API was used to retieve instagram posts (in the form of a JSONP object) using:<br />
        `q: 'BaRated'`<br />
    with q being the query to search for posts by, and 'BaRated' being the arguement to search by.<br />

-Google Maps<br />
    The Google Maps API was used to initalize and present a map of New Brunswick and placed markers on the map in respect to which bar is selceted on the site.<br />

Contacts
--------
    
If you have any questions or comments on this project please 
feel free to email me at [`alexnaj88@gmail.com`](mailto:alexnaj88@gmail.com?Subject=Questions/Comments About BaRated)
