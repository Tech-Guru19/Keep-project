function login() {
    let input1 = document.getElementById("first_input").value
    let input2 = document.getElementById("second_input").value
    if (input1 === "" || input2 === "") {
        alert("Please fill in all fields")
    }else {
        const user = JSON.parse(localStorage.getItem("noteKeepCredentials"))
        if(input1 == user.email && input2 == user.password){
            alert("welcome")
            window.location.href = "Keep.html"
        }
        else{
            alert("Invalid credentials, pls try again or signUp")
        }
    }
}

