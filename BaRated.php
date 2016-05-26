<?php
    #https://advwebdesign-alexdel.c9users.io/FinalProject/db.php
    $link = mysqli_connect("0.0.0.0", "alexdel", "", "BaRatedDB");
    
    $bar = $_REQUEST['bar'];
    if($link){
        if($_GET) {
            $comments = mysqli_query($link, "SELECT * FROM TBL_Comments WHERE barID = " . $bar);
                class comment {
                    var $firstName; 
                    var $lastInit; 
                    var $comment;
                }
                class rating {
                    var $rating;
                }
                
                $commentsArray = Array();
                while ($row = mysqli_fetch_assoc($comments)) {
                    $comment = new comment;
                    $comment->firstName = $row["firstName"];
                    $comment->lastInit = $row["lastInit"];
                    $comment->comment = $row["barComment"];
                    $commentsArray[] = $comment;
                }
                
                $ratings = mysqli_query($link, "SELECT AVG(barRating) AS rating FROM TBL_Ratings WHERE barID = " . $bar);
                while($row = mysqli_fetch_assoc($ratings)) {
                    $rating = new rating;
                    $rating->rating = $row["rating"];
                }
                
                class returnObject {
                    var $comments;
                    var $rating;
                }
                $returningObject = new returnObject;
                $returningObject->comments = $commentsArray;
                $returningObject->rating = $rating;
                
                $returningJSONObject = json_encode($returningObject);
                echo $returningJSONObject;
                
                mysqli_free_result($comments);
                mysqli_free_result($ratings);
                
        } else if ($_POST) {
            $bar = $_REQUEST['bar'];
            $rating = $_REQUEST['rating'];
            
            if($bar != "") {
                if($rating == 0 || $rating == "") {
                    $firstName = $_REQUEST['firstName'];
                    $lastInit = $_REQUEST['lastInit'];
                    $comment = $_REQUEST['comment'];
                    $insert = mysqli_query($link, "INSERT INTO TBL_Comments(barID, barComment, firstName, lastInit) VALUES ('" . $bar . "', '" . $comment . "', '" . $firstName .  "', '" . $lastInit . "')");
                } else if($rating >= 1 && $rating <=5) {
                    $rating = mysqli_query($link, "INSERT INTO TBL_Ratings(barID, barRating) VALUES ('" . $bar . "', '" . $rating . "')");
                }
            }
        }
        echo mysqli_error($link);
    }
    
    mysqli_close($link)
?>