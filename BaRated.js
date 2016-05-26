var bars = [
    ["Olive Branch", 40.501467, -74.452951 , 0],
    ["Kelly's Korner", 40.501003, -74.455018 , 1],
    ["Heuy's Knight Club", 40.499747, -74.454225 , 2],
    ["Ale 'N 'Wich", 40.496259, -74.456096 , 3],
    ["Scarlet Pub", 40.499595, -74.452885 , 4],
    ["Golden Rail", 40.497952, -74.449590 , 5],
    ["Stuff Yer Face", 40.498086, -74.448948 , 6],
    ["Evelyn's", 40.497978, -74.448733 , 7],
    ["Barca City", 40.498048, -74.448833 , 8],
    ["Brother Jimmy's BBQ", 40.496933, -74.446689 , 9]
    ];

var map;
  function initMap() {
        map = new google.maps.Map(document.getElementById('map'), {
            center: {lat: 40.49903, lng: -74.45186},
            zoom: 15
        });
    }
    
    function setOneMarker(map, barSelected, barName, barAddress) {
        for(var i = 0; i < bars.length; i++) {
            var bar = bars[i];
            if(bar[3] == barSelected) {
                var contentString = '<div id = "markerBarName">' + barName + '</div>' + '<div id = "markerAddress">' + barAddress + '</div>';
                
                var infowindow = new google.maps.InfoWindow({
                    content: contentString,
                    maxWidth: 200
                });
                
                var marker = new google.maps.Marker({
                    position: {lat: bar[1], lng: bar[2]},
                    map: map,
                    animation: google.maps.Animation.DROP,
                    title: bar[0],
                    zIndez: bar[3]
                });
                
                marker.addListener('click', function() {
                    infowindow.open(map, marker);
                });
                break;
            }
        }
    }

$(document).ready(function() {
    /*
    -Get Google Maps API working
    */
    
    $('#barRating').empty();
    
    var allowAjaxHide = false;
    $('#ajaxIndicator').on('hide.bs.modal', function(event) {
        if (!allowAjaxHide) {
            event.preventDefault(); 
            allowAjaxHide = false;
        }
    });
        
    $.ajax({
        url: '/api/index.php/TwitterAppOnly/search/tweets.json',
        type: 'GET',
        dataType: 'JSON',
        data: {
            q: "%23BaRated",
        },
        success: function(serverResponse) {
            try {
                console.log(serverResponse);
                var statuses = serverResponse.statuses;
                console.log(statuses);
                
                var myHTML = '';
                for(var i = 0; i < statuses.length; i++){
                    myHTML += '<li class="tweet list-group-item">';
                    myHTML += '<span class="profilePicture"> <img src="' + statuses[i].user.profile_image_url + '"></span>';
                    myHTML += '<span class="user">' + statuses[i].user.screen_name + '</span>';
                    myHTML += '- <span class="body">' + statuses[i].text + '</span>';
                    myHTML += '<span class="badge retweets">' + statuses[i].retweet_count + '</span>';
                    myHTML += '<span class="badge favorites">' + statuses[i].favorite_count + '</span>';
                    myHTML += '</li>';
                }
                $('#twitterFeed').append(myHTML);
            }
            catch (ex) {
                console.error(ex);
                console.log("An error occurred processing the data from Twitter");
            }
        },
        error: function(jqXHR, textStatus, errorThrown) {
            if (errorThrown == 'Service Unavailable') {
                console.log("Your cloud 9 instance isn't running!");
            }
            else {
                console.log('An unknown error occurred: ' + errorThrown);
            }
        },
        complete: function() {
            console.log("LOG: Tweet Retrieval complete.")
        }
    });
    
    $.ajax({
        url: 'https://api.instagram.com/v1/tags/barated/media/recent?access_token=209369514.1677ed0.f8139a25ddfc4d129495d659c9769beb',
        type: 'GET',
        dataType: 'JSONP',
        data: {
            ACCESS_TOKEN: "209369514.1677ed0.f8139a25ddfc4d129495d659c9769beb",
            q: 'BaRated'
        },
        success: function(serverResponse) {
            try {
                console.log(serverResponse);
                var posts = serverResponse.data;
                console.log(posts);
                
                var myHTML = "";
                for(var i = 0; i < posts.length; i++) {
                    myHTML += '<li class = "post list-group-item">';
                    myHTML += '<span class = "profilePicture"> <img src="' + posts[i].profile_picture + '"></span>';
                    myHTML += '<span class = "user">' + posts[i].username + '</span>';
                    myHTML += '<div class = "image"> <img src="' + posts[i].images.low_resolution.url + '"></span>';
                    myHTML += '<div class = "caption">' + posts[i].caption.text + '</div>';
                    myHTML += '<span class = "badge likes">' + posts[i].likes.count + '</span>';
                    myHTML += '</li>';
                }
                $('#instaFeed').append(myHTML);
            }
            catch (ex) {
                console.error(ex);
                console.log("An error occurred processing the data from Twitter");
            }
        },
        error: function(jqXHR, textStatus, errorThrown) {
            if (errorThrown == 'Service Unavailable') {
                console.log("Your cloud 9 instance isn't running!");
            }
            else {
                console.log('An unknown error occurred: ' + errorThrown);
            }
        },
        complete: function() {
            console.log("LOG: Insta Retrieval complete.")
        }
    })
      
    $('#barSelected').change(function(event) {
        $('#barRating').empty();
        $('#errorSection').empty();
        $('#errorSectionRating').empty();
        $('#barInformation').empty();
        $('#hoursOfOperation').empty();
        $('#commentsSectionList').empty();
        $('#successSection').empty();
        $('#successSectionRating').empty();
        
        
        
        var myHTMLInformation = "";
        var myHTMLHours = "";
        var error = false;
        
        switch (true) {
            case ($('#barSelected').val() == ""):
                initMap();
                myHTMLInformation = "";
                break;
            case ($('#barSelected').val() == "0"):
                initMap();
                setOneMarker(map, $('#barSelected').val(), "Olive Branch", "37 Bartlett St, New Brunswick, NJ 08901");
                myHTMLInformation += '<div class = "description">Popular with college students, this low-key haunt offers a full bar, pub grub & TVs for sports fans.</div>';
                myHTMLInformation += '<div class = "phone">Phone: (732)-729-0203</div>';
                myHTMLHours += '<li>Mon: 3PM-2AM</li>';
                myHTMLHours += '<li>Tues: 3PM-2AM</li>';
                myHTMLHours += '<li>Wed: 3PM-2AM</li>';
                myHTMLHours += '<li>Thrs: 3PM-2AM</li>';
                myHTMLHours += '<li>Fri: 3PM-2AM</li>';
                myHTMLHours += '<li>Sat: 3PM-2AM</li>';
                myHTMLHours += '<li class = "closedDay">Sun: CLOSED</li>';
                break;
            case ($('#barSelected').val() == "1"):
                initMap();
                setOneMarker(map, $('#barSelected').val(), "Kelly's Korner", "75 Morrell St, New Brunswick, NJ 08901");
                myHTMLInformation += '<div class = "description">Your favorite local Irish Pub & Grille within the heart of New Brunswick!</div>';
                myHTMLInformation += '<div class = "phone">Phone: (732)-247-5031</div>';
                myHTMLHours += '<li>Mon: 7AM-2AM</li>';
                myHTMLHours += '<li>Tues: 7AM-2AM</li>';
                myHTMLHours += '<li>Wed: 7AM-2AM</li>';
                myHTMLHours += '<li>Thrs: 7AM-2AM</li>';
                myHTMLHours += '<li>Fri: 7AM-2AM</li>';
                myHTMLHours += '<li>Sat: 7AM-2AM</li>';
                myHTMLHours += '<li>Sun: 12PM-12AM</li>';
                break;
            case ($('#barSelected').val() == "2"):
                initMap();
                setOneMarker(map, $('#barSelected').val(), "Heuy's Knight Club", "164 Easton Ave, New Brunswick, NJ 08901");
                myHTMLInformation += '<div class = "description">Home of Rutgers Fans to watch the game and your favorite (k)night club on a night out.</div>';
                myHTMLInformation += '<div class = "phone">Phone: (732)-246-1551</div>';
                myHTMLHours += '<li>Mon: 7PM-2AM</li>';
                myHTMLHours += '<li>Tues: 7PM-2AM</li>';
                myHTMLHours += '<li>Wed: 7PM-2AM</li>';
                myHTMLHours += '<li>Thrs: 7PM-2AM</li>';
                myHTMLHours += '<li>Fri: 7PM-2AM</li>';
                myHTMLHours += '<li>Sat: 7PM-2AM</li>';
                myHTMLHours += '<li>Sun: 7PM-2AM</li>';
                break;
            case ($('#barSelected').val() == "3"):
                initMap();
                setOneMarker(map, $('#barSelected').val(), "Ale 'N 'Wich", "246 Hamilton St, New Brunswick, NJ 08901");
                myHTMLInformation += '<div class = "description">College hangout since 1974 known for its large beer selection, Prohibition-era setting & bar games.</div>';
                myHTMLInformation += '<div class = "phone">Phone: (732)-745-9496</div>';
                myHTMLHours += '<li>Mon: 4PM-2AM</li>';
                myHTMLHours += '<li>Tues: 4PM-2AM</li>';
                myHTMLHours += '<li>Wed: 4PM-2AM</li>';
                myHTMLHours += '<li>Thrs: 4PM-2AM</li>';
                myHTMLHours += '<li>Fri: 3PM-2AM</li>';
                myHTMLHours += '<li>Sat: 4PM-2AM</li>';
                myHTMLHours += '<li>Sun: 6PM-2AM</li>';
                break;
            case ($('#barSelected').val() == "4"):
                initMap();
                setOneMarker(map, $('#barSelected').val(), "Scarlet Pub", "131 Easton Ave, New Brunswick, NJ 08901");
                myHTMLInformation += '<div class = "description">Local club on Easton ave with live music every night.</div>';
                myHTMLInformation += '<div class = "phone">Phone: (732)-247-4771</div>';
                myHTMLHours += '<li>Mon: 6PM-2AM</li>';
                myHTMLHours += '<li>Tues: 6PM-2AM</li>';
                myHTMLHours += '<li>Wed: 6PM-2AM</li>';
                myHTMLHours += '<li>Thrs: 6PM-2AM</li>';
                myHTMLHours += '<li>Fri: 6PM-2AM</li>';
                myHTMLHours += '<li>Sat: 6PM-2AM</li>';
                myHTMLHours += '<li>Sun: 6PM-2AM</li>';
                break;
            case ($('#barSelected').val() == "5"):
                initMap();
                setOneMarker(map, $('#barSelected').val(), "Golden Rail", "66 Easton Ave, New Brunswick, NJ 08901");
                myHTMLInformation += '<div class = "description">Neighborhood standby decked with LED lights & TVs offering happy hour specials & karaoke.</div>';
                myHTMLInformation += '<div class = "phone">Phone: (732)-846-6279</div>';
                myHTMLHours += '<li>Mon: 5PM-2AM</li>';
                myHTMLHours += '<li>Tues: 5PM-2AM</li>';
                myHTMLHours += '<li>Wed: 5PM-2AM</li>';
                myHTMLHours += '<li>Thrs: 5PM-2AM</li>';
                myHTMLHours += '<li>Fri: 5PM-2AM</li>';
                myHTMLHours += '<li>Sat: 12PM-2AM</li>';
                myHTMLHours += '<li>Sun: 12PM-2AM</li>';
                break;
            case ($('#barSelected').val() == "6"):
                initMap();
                setOneMarker(map, $('#barSelected').val(), "Stuff Yer Face", "49 Easton Avenue, New Brunswick, NJ 08901");
                myHTMLInformation += '<div class = "description">Bi-level spot and outdoor seating with stromboli sandwiches & loads of international beer, plus burgers, pizza & more.</div>';
                myHTMLInformation += '<div class = "phone">Phone: (732)-247-1727</div>';
                myHTMLHours += '<li>Mon: 11AM-12:30AM</li>';
                myHTMLHours += '<li>Tues: 11AM-12:30AM</li>';
                myHTMLHours += '<li>Wed: 11AM-12:30AM</li>';
                myHTMLHours += '<li>Thrs: 11AM-12:30AM</li>';
                myHTMLHours += '<li>Fri: 11AM-1AM</li>';
                myHTMLHours += '<li>Sat: 11AM-1AM</li>';
                myHTMLHours += '<li>Sun: 11AM-12:30AM</li>';
                break;
            case ($('#barSelected').val() == "7"):
                initMap();
                setOneMarker(map, $('#barSelected').val(), "Evelyn's", "45 Easton Ave, New Brunswick, NJ 08901");
                myHTMLInformation += '<div class = "description">Middle Eastern plates offered in a warm, polished restaurant with a brick patio & full bar.</div>';
                myHTMLInformation += '<div class = "phone">Phone: (732)-246-8792</div>';
                myHTMLHours += '<li>Mon: 11AM-11PM</li>';
                myHTMLHours += '<li>Tues: 11AM-11PM</li>';
                myHTMLHours += '<li>Wed: 11AM-11PM</li>';
                myHTMLHours += '<li>Thrs: 11AM-11PM</li>';
                myHTMLHours += '<li>Fri: 11AM-11PM</li>';
                myHTMLHours += '<li>Sat: 11AM-11PM</li>';
                myHTMLHours += '<li>Sun: 11AM-11PM</li>';
                break;
            case ($('#barSelected').val() == "8"):
                initMap();
                setOneMarker(map, $('#barSelected').val(), "Barca City", "47 Easton Ave, New Brunswick, NJ 08901");
                myHTMLInformation += '<div class = "description">Spanish/Barcelona inspired restaurant and bar serving unique food paired with well prepared drinks and vast beer selection.  Good for a night out, dinner, or watching the game.</div>';
                myHTMLInformation += '<div class = "phone">Phone: (732)-640-1155</div>';
                myHTMLHours += '<li>Mon: 11:30AM-1AM</li>';
                myHTMLHours += '<li>Tues: 11:30AM-1AM</li>';
                myHTMLHours += '<li>Wed: 11:30AM-1AM</li>';
                myHTMLHours += '<li>Thrs: 11:30AM-1AM</li>';
                myHTMLHours += '<li>Fri: 11:30AM-1AM</li>';
                myHTMLHours += '<li>Sat: 11:30AM-1AM</li>';
                myHTMLHours += '<li>Sun: 11:30AM-1AM</li>';
                break;
            case ($('#barSelected').val() == "9"):
                initMap();
                setOneMarker(map, $('#barSelected').val(), "Brother Jimmy's BBQ", "5 Easton Ave, New Brunswick, NJ 08901");
                myHTMLInformation += '<div class = "description">Relaxed joint for Southern-style BBQ, including pulled pork & dry-rub ribs, plus sports on TV.</div>';
                myHTMLInformation += '<div class = "phone">Phone: (732)-249-7427</div>';
                myHTMLHours += '<li>Mon: 11:30AM-10PM</li>';
                myHTMLHours += '<li>Tues: 11:30AM-10PM</li>';
                myHTMLHours += '<li>Wed: 11:30AM-10PM</li>';
                myHTMLHours += '<li>Thrs: 11:30AM-10PM</li>';
                myHTMLHours += '<li>Fri: 11:30AM-12AM</li>';
                myHTMLHours += '<li>Sat: 11:30AM-12AM</li>';
                myHTMLHours += '<li>Sun: 11:30AM-10PM</li>';
                break;
            default:
                break;
        }
        $('#barInformation').append(myHTMLInformation);
        $('#hoursOfOperation').append(myHTMLHours);
        
        if($('#barSelected').val() == "") {
            error = true;
        }
        
        if(error) {
            return false;
        }
        
        $.ajax({
            url: 'BaRated.php',
            type: 'GET',
            dataType: 'JSON',
            data: {
                bar: $('#barSelected').val()
            },
            success: function(serverResponse) {
                console.log(serverResponse);
                var comments = serverResponse.comments;
                console.log(comments);
                
                var myHTML = "";
                if($('#barSelected').val() == "") {
                    myHTML = '';
                }
                else if(comments.length == 0) {
                    myHTML += '<div>No comments for this bar.  Post one!'
                } else {
                    for(var i = 0; i < comments.length; i++) {
                        myHTML += '<li class = "comment list-group-item">';
                        myHTML += '<div class = "commentNames">' + comments[i].firstName + " " + comments[i].lastInit + '</div>';
                        myHTML += '<div class = "commentBody">' + comments[i].comment + '</div>';
                        myHTML += '</li>';
                    }
                }
                $('#commentsSectionList').append(myHTML);
                
                var myHTMLRating = "";
                var ratingRoundedToTenth = parseFloat(serverResponse.rating.rating).toFixed(1);
                myHTMLRating += '<h3>Bar\'s Rating:</h3>';
                switch (true) {
                    case (ratingRoundedToTenth <= 1.9):
                        myHTMLRating += '<span class = "currentBarRating" id = "badRating">' + ratingRoundedToTenth + '</span>';
                        break;
                    case (ratingRoundedToTenth <= 2.9 && ratingRoundedToTenth > 1.9):
                        myHTMLRating += '<span class = "currentBarRating" id = "poorRating">' + ratingRoundedToTenth + '</span>';
                        break;
                    case (ratingRoundedToTenth <=3.9 && ratingRoundedToTenth > 2.9):
                        myHTMLRating += '<span class = "currentBarRating" id = "okayRating">' + ratingRoundedToTenth + '</span>';
                        break;
                    case (ratingRoundedToTenth <= 4.4 && ratingRoundedToTenth > 3.9):
                        myHTMLRating += '<span class = "currentBarRating" id = "goodRating">' + ratingRoundedToTenth + '</span>';
                        break;
                    case (ratingRoundedToTenth > 4.5):
                        myHTMLRating += '<span class = "currentBarRating" id = "greatRating">' + ratingRoundedToTenth + '</span>';
                        break;
                    default:
                        myHTMLRating += '<span class = "currentBarRating" id = "NARating">N/A</span>';
                        break;
                    
                }
                myHTMLRating += '<span class = "currentBarRating">/5</span>';
                $('#barRating').append(myHTMLRating);
            },
            error: function(jqXHR, textStatus, errorThrown) {
                $('#errorSection').append('<p>' + errorThrown + '</p>');
            },
            complete: function(){
                console.log("LOG: Bar Retrieval Complete.");
            }
        });
    });
    
    $('#firstName').focusout(function (event) {
        $('#errorSection').empty();
        
        var firstName = $('#firstName').val();
        var lastInit = $('#lastInit').val();
        var comment = $('#commentBody').val();
        
        var namePattern = /^([A-Z]|[a-z]){1}[a-z]{0,19}?$/; 
        var initPattern = /^[A-Za-z][\.]?$/;
        var error = false;
        
        if(firstName != "" || lastInit != "" || comment != "") {
            if(!namePattern.test(firstName)) {
                $('#errorSection').append('<p>First name must start with capital letter/at most 19 characters</p>');
                error = true;
            }
            if(!initPattern.test(lastInit)) {
                $('#errorSection').append('<p>Last initial must be only 1 character (\'.\' optional)</p>');
                error = true;
            }
            if(comment.length <= 0) {
                $('#errorSection').append('<p>Comment must contain at least 1 character</p>');
                error = true;
            } else if (comment.length > 500) {
                $('#errorSection').append('<p>Comment must be under 500 characters</p>');
                error = true;
            }
        }
        if(error) {
            return false;
        }
    });
    
    $('#lastInit').focusout(function (event) {
        $('#errorSection').empty();
        
        var firstName = $('#firstName').val();
        var lastInit = $('#lastInit').val();
        var comment = $('#commentBody').val(); 
        
        var namePattern = /^([A-Z]|[a-z]){1}[a-z]{0,19}?$/; 
        var initPattern = /^[A-Za-z][\.]?$/;
        var error = false;
        
        if(firstName != "" || lastInit != "" || comment != "") {
            if(!namePattern.test(firstName)) {
                $('#errorSection').append('<p>First name must start with capital letter/at most 19 characters</p>');
                error = true;
            }
            if(!initPattern.test(lastInit)) {
                $('#errorSection').append('<p>Last initial must be only 1 character (\'.\' optional)</p>');
                error = true;
            }
            if(comment.length <= 0) {
                $('#errorSection').append('<p>Comment must contain at least 1 character</p>');
                error = true;
            } else if (comment.length > 500) {
                $('#errorSection').append('<p>Comment must be under 500 characters</p>');
                error = true;
            }
        }
        if(error) {
            return false;
        }
        
    });
    
    $('#commentBody').focusout(function (event) {
        $('#errorSection').empty();
        
        var firstName = $('#firstName').val();
        var lastInit = $('#lastInit').val();
        var comment = $('#commentBody').val();
        
        var namePattern = /^([A-Z]|[a-z]){1}[a-z]{0,19}?$/;
        var initPattern = /^[A-Za-z][\.]?$/;
        var error = false;
        
        if(firstName != "" || lastInit != "" || comment != "") {
            if(!namePattern.test(firstName)) {
                $('#errorSection').append('<p>First name must start with capital letter/at most 19 characters</p>');
                error = true;
            }
            if(!initPattern.test(lastInit)) {
                $('#errorSection').append('<p>Last initial must be only 1 character (\'.\' optional)</p>');
                error = true;
            }
            if(comment.length <= 0) {
                $('#errorSection').append('<p>Comment must contain at least 1 character</p>');
                error = true;
            } else if (comment.length > 500) {
                $('#errorSection').append('<p>Comment must be under 500 characters</p>');
                error = true;
            }
        }
        if(error) {
            return false;
        }
    });
    
    var ratingToSubmit;
    $('.ratingC').click(function (event){
        ratingToSubmit = $('input[name="rating"]:checked').val();
    });
    
    $('#ratingSelected').submit(function (event) {
        $('#errorSectionRating').empty();
        $('#successSectionRating').empty();
        event.preventDefault();
        
        var error = false;
        
        if($('#barSelected').val() == "") {
            $('#errorSectionRating').append('<p>Bar Not Selected</p>');
            error = true;
        }
        
        if(ratingToSubmit == null || ratingToSubmit == "") {
            $('#errorSectionRating').append('<p>No Rating Selected</p>')
            error = true;
        }
        
        if(error) {
            return false;
        }
        
        $.ajax({
            url: 'BaRated.php',
            type: 'POST',
            dataType: 'HTML',
            data: {
                bar: $('#barSelected').val(),
                rating: ratingToSubmit
            },
            success: function(serverResponse) {
                console.log(serverResponse);
                $('#successSectionRating').append('<p>Rating Submitted!</p>')
            },
            error: function(jqXHR, textStatus, errorThrown) {
                $('#errorSectionRating').append('<p>' + errorThrown + '</p>');
            },
            complete: function() {
                console.log("LOG: Bar Rating Complete.");
            }
        });
    });
    
    $('#commentSubmit').submit(function (event) {
        event.preventDefault();
        $('#successSection').empty();
        $('#errorSection').empty();
        
        var firstName = $('#firstName').val();
        var lastInit = $('#lastInit').val();
        var comment = $('#commentBody').val();
        
        var namePattern = /^([A-Z]|[a-z]){1}[a-z]{0,19}?$/;
        var initPattern = /^[A-Za-z][\.]?$/;
        var error = false;
        
        if ($('#barSelected').val() == "") {
            $('#errorSection').append('<p>No bar selected.  Please select a bar before submitting your comment.')
            error = true;
        } else if ($('#barSelected').val() != "") {
            error = false;
        }
        if(!namePattern.test(firstName)) {
            $('#errorSection').append('<p>First name must start with capital letter/at most 19 characters</p>');
            error = true;
        }
        if(!initPattern.test(lastInit)) {
            $('#errorSection').append('<p>Last initial must be only 1 character (\'.\' optional)</p>');
            error = true;
        }
        if(comment.length <= 0) {
            $('#errorSection').append('<p>Comment must contain at least 1 character</p>');
            error = true;
        } else if (comment.length > 500) {
            $('#errorSection').append('<p>Comment must be under 500 characters</p>');
            error = true;
        }
        
        if(error) {
            return false;
        }
        
        $.ajax({
            url: 'BaRated.php',
            type: 'POST',
            dataType: 'HTML',
            data: {
                bar: $('#barSelected').val(),
                firstName: firstName,
                lastInit: lastInit,
                comment: comment,
                rating: 0
            },
            success: function(serverResponse) {
                console.log(serverResponse);
                if(error != true) {
                    $('#successSection').append('<p>Comment Submitted! (Reload page to see)</p>');
                }
            },
            error: function(jqXHR, textStatus, errorThrown) {
                $('#errorSection').append('<p>' + errorThrown + '</p>');
            },
            complete: function() {
                console.log("LOG: Comment Submission Complete.");
            }
        });
    });
    
});