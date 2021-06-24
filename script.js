const CLICK_EVENT_TYPE = 'click'

// Page (DOM) has finished loading:
$(function () {

    /* 1. API-KEY: START ----------------------------------------
    - Purpose: Send the API key to authenticate with the Server
        - Remark: Do not touch this
    ------------------------------------------------------------- */

    // 1.1. Send the API key with every jQuery AJAX-call:
    $.ajaxSetup({
        'headers': {
            'X-Auth-Token': 'a534e63a0d68ad8ec00d'
        }
    });

    /* API-KEY: END --------------------------------------------- */


    /* 2. FETCH POSTS: START ------------------------------------
        - Purpose: Fetch and display all posts from the server
        - Remark: You have to complete this part on your own
    - Task: Chapter 3.3.1 - Task #3
    ------------------------------------------------------------- */

    // 2.1. Must-have: Fetch the data from the server:
    $.getJSON('https://nafra.at/adad_st2021/posts/', function (data) {

        // 2.2. Must-have: Display the data:
        // ... Iterate over the "data" object (using a loop - try the forEach) and return the posts back to the page
        // ... You have to complete this part on your own
        data.forEach(function (userPost) {
            showListOfPosts(userPost);
        });

        data.forEach(function (posts) {
            showListOfUsers(posts);
        });

        /* FETCH POSTS: END ----------------------------------------- */


        /* 3. LIKE POSTS: START ------------------------------------
            - Purpose: Like a post
            - Remark: You have to complete this part on your own
            - Task: Chapter 3.3.1 - Task #4
        ------------------------------------------------------------ */

        // 3.1. Must-have: Like button was pressed:
        // ... Execute the "like a post" functionality whenever a "like"-button is pressed
        // ... You have to complete this part on your own

        document.querySelectorAll('.like-button').forEach(function (element) {
            element.addEventListener(CLICK_EVENT_TYPE, function (button) {
                showAndIncreaseLikes(button);
            });
        });

    });

    /* LIKE POSTS: END ----------------------------------------- */


    /* 4. CREATE POSTS: START ------------------------------------
        - Purpose: Create a post
        - Remark: You have to complete this part on your own
    - Task: Chapter 3.3.1 - Task #5
    -------------------------------------------------------------- */

    // 4.1. Must-have: The create form was submitted:
    // ... Execute the "create a post" logic (below) whenever the "create"-form was submitted
    // ... Don't forget to prevent the form from submitting (forcing a refresh): event.preventDefault();
    // ... You have to complete this part on your own
    createANewPost();
    /* CREATE POSTS: END ----------------------------------------- */


    /* 5. CREATE COMMENTS: START ------------------------------------
        - Purpose: Comment a post
        - Remark: This is optional but you have to complete this part on your own
    - Task: Chapter 3.3.2 - Task #1
    ----------------------------------------------------------------- */

    // Nice-to-have: ...
    // ... You have to complete this part on your own (optional)

    /* CREATE COMMENTS: END ----------------------------------------- */


    /* 6. YOUR OWN IDEAS: START ------------------------------------
        - Purpose: Your own purpose
        - Remark: This is optional but you have to complete this part on your own
    - Task: Chapter 3.3.2 - Task #4
    ---------------------------------------------------------------- */

    // Nice-to-have: ...
    // ... You have to complete this part on your own (optional)
    // Example starter JavaScript for disabling form submissions if there are invalid fields
    /* YOUR OWN IDEAS: END ----------------------------------------- */
});

function showListOfPosts(userPost) {
    let postItem = `<div class="post">
            <p style="font-weight: bold;">${userPost['user']}</p>
            <p>${userPost['description']}</p>
            <p><img src="${userPost['file']}" alt="post image"/></p>
            <p>${moment(userPost['timestamp']).fromNow()}</p>
            <p><button id="${userPost['id']}" class="like-button btn btn-outline-success" data-bs-toggle="tooltip" data-bs-placement="top" title="Click Me if you like this!">Likes: ${userPost['likes']}</button></p>
            <p>Comments: ${displayAllComments(userPost['comments'])}</p>
          </div>`;
    document.querySelector('.user-posts').insertAdjacentHTML('afterbegin', postItem);
}

function showListOfUsers(posts) {
    let user = `<div id="user-names"><p style="font-weight: bold;">${posts['user']}</p></div>`;
    document.querySelector('#user-names').insertAdjacentHTML('afterbegin', user);
}

function showAndIncreaseLikes(button) {
    // 3.2. Must-have: Increase the "like"-counter on the server:
    const postID = button.target.id; // You need to replace the postID with the ID of the post on which the button was pressed
    $.get('https://nafra.at/adad_st2021/posts/' + postID, function (data) {
        // 3.3. Must-have: Update the template with the new like count:
        // ... Adapt the value of the counter next to your button with the result that is stored in data
        document.getElementById(button.target.id).innerHTML = "Likes: " + data;
        // ... You have to complete this part on your own
        console.log('3.3. number of likes: ' + data); // This returns the message from the server - replace it with the logic to show the increased like count
    });
}

function createANewPost() {
    document.querySelector('#post-submit-btn').addEventListener(CLICK_EVENT_TYPE, function () {
        event.preventDefault();

        let form = document.getElementById('create-a-post');
        let user = form.elements[0];
        let description = form.elements[1];
        let file = form.elements[2];
        // 4.3. Must-have: Post the data from your formular to the server:

        const formData = new FormData($('#create-a-post')[0]); // Change the #idoftheform to the id of your form; The command takes all values from inputs of a form and attaches it to the variable

        $.ajax({
            type: 'POST',
            url: 'https://nafra.at/adad_st2021/posts/',
            data: formData,
            processData: false,
            contentType: false,
            success: function (data) {

                // 4.4. Must-have: Update the template with the new post:
                // ... You have created a post, now display it on the webpage
                // ... You have to complete this part on your own
                console.log('4.4.: ' + data); // This returns the message from the server - replace it with the logic to show the freshly created post
                location.reload();
            }
        });

    });
}

function displayAllComments(userComments) {
    let postComment = "no comment yet";
    if (userComments != null) {
        userComments.forEach(function (comment) {
            if (comment != null && comment.text != null && comment.text !== "") {
                postComment = comment.text + " ";
                console.log('comments2: ' + postComment);
            }
        });
    }
    console.log('comments3: ' + postComment);
    return postComment;
}
