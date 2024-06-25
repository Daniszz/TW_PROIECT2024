function displaySearchBar() {
    document.getElementsByClassName('navigationBar__bottom')[0].style.display = 'inline-flex';
    document.getElementsByClassName('navigationBar__logo')[0].onclick = hideSearchBar;
}

function hideSearchBar() {
    document.getElementsByClassName('navigationBar__bottom')[0].style.display = 'none';
    document.getElementsByClassName('navigationBar__logo')[0].onclick = displaySearchBar;
}

var prevSearch = null;
var displayed = 0;

function searchPlatform(tag) {
    if(tag === prevSearch  && tag !== null) {
        //console.log('prev');
        displayed++;
        //console.log(tag, ' ', displayed);
        goTopPlatform(tag, displayed);
    }
    else if(tag !== null) {
        //console.log('new');
        prevSearch = tag;
        displayed = 0;
        //console.log(tag, ' ', displayed);
        goTopPlatform(tag, displayed);
    }
}

function search() {
    var tag = document.getElementsByClassName('navigationBar__bottom__input')[0].value.trim();

    if(tag === prevSearch  && tag !== null) {
        //console.log('prev');
        displayed++;
        //console.log(tag, ' ', displayed);
        goTop(tag, displayed);
    }
    else if(tag !== null) {
        //console.log('new');
        prevSearch = tag;
        displayed = 0;
        //console.log(tag, ' ', displayed);
        goTop(tag, displayed);
    }
    
    //console.log(tag);
}

function goTop(tag, index) {
    var found= -1;
    console.log(document.getElementsByClassName('masterSection__post__tag').length);

    for(var i=0; i<document.getElementsByClassName('masterSection__post__tag').length; i++) {
        //console.log('da');
        var text = document.getElementsByClassName('masterSection__post__tag')[i].innerHTML;
        console.log(text);
        if(text.indexOf(tag) !== -1) {
            found++;
            if(found === index) {
                var coord = document.getElementsByClassName('masterSection__post__tag')[i].getBoundingClientRect();
            }
        }
    }
    
    if(found === -1) {
        window.alert("Tag not found.");
    }

    else if(found < index) {
        displayed = 0;
        goTop(tag, displayed);
    }
    else {
        var coordNav = document.getElementsByClassName('navigationBar')[0].getBoundingClientRect();
        console.log(coordNav.x , ' ' , coordNav.y - coordNav.height * 3 / 2);
        window.scrollTo({
            left: coord.left + window.scrollX,
            top: coord.top + window.scrollY - coordNav.height * 3 / 2,
            behavior: 'smooth'
        });
    }
}

function goTopPlatform(tag, index) {
    var found= -1;
    console.log(document.getElementsByClassName('masterSection__post__title').length);

    for(var i=0; i<document.getElementsByClassName('masterSection__post__title').length; i++) {
        //console.log('da');
        var text = document.getElementsByClassName('masterSection__post__title')[i].innerHTML;
        console.log(text);
        if(text.indexOf(tag) !== -1) {
            found++;
            if(found === index) {
                var coord = document.getElementsByClassName('masterSection__post__title')[i].getBoundingClientRect();
            }
        }
    }
    
    if(found === -1) {
        window.alert("Tag not found.");
    }

    else if(found < index) {
        displayed = 0;
        goTopPlatform(tag, displayed);
    }
    else {
        var coordNav = document.getElementsByClassName('navigationBar')[0].getBoundingClientRect();
        console.log(coordNav.x , ' ' , coordNav.y - coordNav.height * 3 / 2);
        window.scrollTo({
            left: coord.left + window.scrollX,
            top: coord.top + window.scrollY - coordNav.height * 3 / 2,
            behavior: 'smooth'
        });
    }
}
