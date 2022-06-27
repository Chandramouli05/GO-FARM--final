
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setu    p#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyDGK3s2FRd0vUKhKTsYnscNlT2uOGh3UaA",
    authDomain: "dl-smart-farming.firebaseapp.com",
    databaseURL: "https://dl-smart-farming-default-rtdb.firebaseio.com",
    projectId: "dl-smart-farming",
    storageBucket: "dl-smart-farming.appspot.com",
    messagingSenderId: "752177491786",
    appId: "1:752177491786:web:42f43f116da9c529ee1bb3",
    measurementId: "G-FHNCQGBJRD"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
const usersRef = db.collection("users");

async function login(username, password) {
    const snapshot = await usersRef.where("username", "==", username.toLowerCase()).get()
        .then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                const data = doc.data();
                if (data && data.username === username.toLowerCase() && data.password === password) {
                    console.log('login success!');
                } else {
                    console.log('login failed!')
                }
            });
        })
        .catch((error) => {
            console.log("Error getting documents: ", error);
        });
}

login("testuser", "123456");


//--------------------------------Signup.js------------------------------//

function signup() {
    var userEmail = document.getElementById("user_email").value;
    var userName = document.getElementById("user_name").value;
    var userPass = document.getElementById("user_Pass").value;
    var userNameFormate = /^([A-Za-z.\s_-])/;
    var userEmailFormate = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    var userPasswordFormate = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{10,}/;

    var checkUserNameValid = userName.match(userNameFormate);
    var checkUserEmailValid = userEmail.match(userEmailFormate);
    var checkUserPasswordValid = userPass.match(userPasswordFormate);

    if (checkUserNameValid == null) {
        return checkUserName();

    } else if (checkUserEmailValid == null) {
        return checkUserEmail();
    } else if (checkUserPasswordValid == null) {
        return checkUserPassword();
    } else {
        firebase.auth().createUserWithEmailAndPassword(userEmail, userPassword).then((success) => {
            var user = firebase.auth().currentUser;
            var uid;
            if (user != null) {
                uid = user.uid;
            }
            var firebaseRef = firebase.database().ref();
            var userData = {
                userFullName: userFullName,
                userEmail: userEmail,
                userPassword: userPassword,

            }
            firebaseRef.child(uid).set(userData);
            swal('Your Account Created', 'Your account was created successfully, you can log in now.',
            ).then((value) => {
                setTimeout(function () {
                    window.location.replace("../login.html");
                }, 1000)
            });
        }).catch((error) => {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            swal({
                type: 'error',
                title: 'Error',
                text: "Error",
            })
        });
    }
}

//--------------------------login.js-------------------------------------------------------------------//

function login() {
    var userSIEmail = document.getElementById("user_email").value;
    var userSIPass = document.getElementById("user_Pass").value;
    var userSIEmailFormate = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    var userSIPasswordFormate = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{10,}/;

    var checkUserSIEmailValid = userSIEmail.match(userSIEmailFormate);
    var checkUserSIPasswordValid = userSIPassword.match(userSIPasswordFormate);

    if (checkUserSIEmailValid == null) {
        return checkUserSIEmail();
    } else if (checkUserSIPasswordValid == null) {
        return checkUserSIPassword();
    } else {
        firebase.auth().signInWithEmailAndPassword(userSIEmail, userSIPassword).then((success) => {
            swal({
                type: 'successfull',
                title: 'Succesfully signed in',
            }).then((value) => {
                setTimeout(function () {
                    window.location.replace("./pages/home.html");
                }, 1000)
            });
        }).catch((error) => {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            swal({
                type: 'error',
                title: 'Error',
                text: "Error",
            })
        });
    }
}