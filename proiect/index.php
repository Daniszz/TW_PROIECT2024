<div?php
    session_start();
 
?>

<!DOCTYPE html>
<html lang="en-US">

<head>
    <meta charset="UTF-8">
    <meta name="keywords" content="yes">
    <meta name="description" content="More than you would think">
    <meta name="author" content="BigMoves">
    <meta name="viewport" content="width=device-width, initial-scale=1.0"> 
    <title>M-PIC</title>
    <link rel="icon" type="image/x-icon" href="css/images/logo.svg">
    <link rel="stylesheet" href="../final/css/filters.css">
    <link rel="stylesheet" href="../final/css/main.css">
    <link rel="stylesheet" href="../final/css/admin.css">
    <link rel="stylesheet" href="../final/css/login.css">
    <link rel="stylesheet" href="../final/css/viewProfile.css">

    <link rel="stylesheet" href="../final/css/register.css">
    <link rel="stylesheet" href="../final/css/newPost.css">
    <link rel="stylesheet" href="../final/css/post.css">
    <link rel="stylesheet" href="../final/css/filters.css">
    <link rel="stylesheet" href="../final/css/help.css">

    <script src="../final/javascript/admin.js" ></script>
    <script src="../final/javascript/reddit.js" ></script>
    <script src="../final/javascript/unsplash.js" ></script>
    <script src="../final/javascript/fb.js"></script>
    <script src="../final/javascript/help.js"></script>
    <script src="../final/javascript/filters.js" ></script>
    <script src="../final/javascript/newPost.js"></script>
    <script src="../final/javascript/add_photos_reddit.js"></script>
    <script src="../final/javascript/add_photos.js"></script>
    <script src="../final/javascript/add_photos_unsplash.js"></script>

    <script src="../final/javascript/main.js"></script>
    <script src="../final/javascript/register.js"></script>
    <script src="../final/javascript/viewProfile.js"></script>
    <script src="../final/javascript/login.js"></script>
    <script src="../final/javascript/newPost.js"></script>
    <script src="../final/javascript/search.js"></script>
    <script src="../final/javascript/viewProfile.js"></script>



</head>

<body>
    <div class="navigationBar">
        <div class="navigationBar__top">
            <button class="navigationBar__homeButton" onclick="goTopNav()">
                <img src="css/images/logo.svg" style="width: 100%; height: 100%;">
            </button>
            <button class="navigationBar__logo" onclick="displaySearchBar()">
                <img src="css/images/navLogo.svg" style="width: 100%; height: 100%;">
            </button>
            <button class="navigationBar__loginButton" onclick="login()">Log in</button>
        </div>

        <div class="navigationBar__bottom">
            <button class="navigationBar__bottom__fb" onclick="searchPlatform('facebook')">
                <img src="css/images/facebook.svg" style="width: 100%; height: 100%;">
            </button>
            <div class="navigationBar__bottom__tags">
                <input class="navigationBar__bottom__input" type="text" id="tag" name="tagSearched">
                <button class="navigationBar__bottom__button" onclick="search()">Search</button>
                <button class="navigationBar__bottom__rd" onclick="searchPlatform('unsplash')">
                    <img src="css/images/unsplash.svg" style="width: 100%; height: 100%;">
                </button>
            </div>
            <button class="navigationBar__bottom__rd" onclick="searchPlatform('reddit')">
                <img src="css/images/reddit-logo.svg" style="width: 100%; height: 100%;">
            </button>
        </div>
    </div>
    
    <div class="masterSection">

        <div class="masterSection__post" style = "background: radial-gradient(circle, rgb(251, 123, 63) 0%, rgb(245, 195, 47) 76%);">
            <div class="masterSection__post__title__div">
                <h2 class="masterSection__post__title">Welcome</h2>
            </div>
            <button class="masterSection__post__tag">People</button>
            <img src="css/images/logo.svg" class="masterSection__post__image">
            <div class="masterSection__post__statistics">
                <button class="masterSection__post__statistics__likesButton">
                    <img src="css/images/like.svg" style="width: 100%; height: 100%;">
                </button>
                <button class="masterSection__post__statistics__commentsButton">
                    <img src="css/images/comment.svg" style="width: 100%; height: 100%;">
                </button>
                <button class="masterSection__post__statistics__sharesButton">
                    <img src="css/images/share.svg" style="width: 100%; height: 100%;">
                </button>
            </div>
            <div class="masterSection__post__results">
                <button disabled class="masterSection__post__results__likes">more</button>
                <button disabled class="masterSection__post__results__comments">or</button>
                <button disabled class="masterSection__post__results__shares">less</button>
            </div>
        </div>

        <!--<div class="masterSection__post">
            <div class="masterSection__post__title__div">
                <h2 class="masterSection__post__title">Random</h2>
            </div>
            <button class="masterSection__post__tag">People</button>
            <img src="css/images/logo.svg" class="masterSection__post__image">
            <div class="masterSection__post__statistics">
                <button class="masterSection__post__statistics__likesButton">
                    <img src="css/images/like.svg" style="width: 100%; height: 100%;">
                </button>
                <button class="masterSection__post__statistics__commentsButton">
                    <img src="css/images/comment.svg" style="width: 100%; height: 100%;">
                </button>
                <button class="masterSection__post__statistics__sharesButton">
                    <img src="css/images/share.svg" style="width: 100%; height: 100%;">
                </button>
            </div>
            <div class="masterSection__post__results">
                <button disabled class="masterSection__post__results__likes">1034</button>
                <button disabled class="masterSection__post__results__comments">34</button>
                <button disabled class="masterSection__post__results__shares">394</button>
            </div>
        </div>

        <div class="masterSection__post">
            <div class="masterSection__post__title__div">
                <h2 class="masterSection__post__title">Random2</h2>
            </div>
            <button class="masterSection__post__tag">People</button>
            <img src="css/images/logo.svg" class="masterSection__post__image">
            <div class="masterSection__post__statistics">
                <button class="masterSection__post__statistics__likesButton">
                    <img src="css/images/like.svg" style="width: 100%; height: 100%;">
                </button>
                <button class="masterSection__post__statistics__commentsButton">
                    <img src="css/images/comment.svg" style="width: 100%; height: 100%;">
                </button>
                <button class="masterSection__post__statistics__sharesButton">
                    <img src="css/images/share.svg" style="width: 100%; height: 100%;">
                </button>
            </div>
            <div class="masterSection__post__results">
                <button disabled class="masterSection__post__results__likes">1034</button>
                <button disabled class="masterSection__post__results__comments">34</button>
                <button disabled class="masterSection__post__results__shares">394</button>
            </div>
        </div>

        <div class="masterSection__post">
            <div class="masterSection__post__title__div">
                <h2 class="masterSection__post__title">Random1</h2>
            </div>
            <button class="masterSection__post__tag">People</button>
            <img src="css/images/login.png" class="masterSection__post__image">
            <div class="masterSection__post__statistics">
                <button class="masterSection__post__statistics__likesButton">
                    <img src="css/images/like.svg" style="width: 100%; height: 100%;">
                </button>
                <button class="masterSection__post__statistics__commentsButton">
                    <img src="css/images/comment.svg" style="width: 100%; height: 100%;">
                </button>
                <button class="masterSection__post__statistics__sharesButton">
                    <img src="css/images/share.svg" style="width: 100%; height: 100%;">
                </button>
            </div>
            <div class="masterSection__post__results">
                <button disabled class="masterSection__post__results__likes">1034</button>
                <button disabled class="masterSection__post__results__comments">34</button>
                <button disabled class="masterSection__post__results__shares">394</button>
            </div>
        </div> -->
        <!-- <div class="masterSection__loginSection">
            <button class="masterSection__closePopUp" onclick="closeLogin()"></button>
        </div> -->
        <!-- <div class="masterSection__addPostSection">
            <button class="masterSection__closePopUp" onclick="closePosting()"></button>
        </div> -->
        <!-- <div class="masterSection__profileSection">
            <button class="masterSection__closePopUp" onclick="closeProfileViewer()"></button>
        </div> -->
    </div>
    <button class="addPostButton">New<br>post</button>
    <button class="viewProfileButton">View<br>profile</button>
    <button class="viewHelpButton"><div class="viewHelpButton__text" >Help</div></button>
</body>

</html>
