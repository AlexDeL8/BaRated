<? php
    $link = mysqli_connect("0.0.0.0", "alexdel", "", "BaRatedDB");
    echo "This is the rating:" . $rating;
    
    $bar = $_REQUEST['bar'];
    $rating = $_REQUEST['rating'];
    
    if($rating = mysqli_query($link, "INSERT INTO TBL_Ratings(barID, barRating) VALUES ('" . $bar . "', '" . $rating . "')")) {
        while ($row = mysqli_fetch_assoc($rating)) {
            printf("In PHP: %s (%s)\n", $row["barID"], $row["barRating"]);
        }
    }
    
    mysqli_free_result($rating);

?>