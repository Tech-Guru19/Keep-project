function signup() {
    let input1 = document.getElementById("firstName").value
    let input2 = document.getElementById("lastName").value
    let input3 = document.getElementById("email").value
    let input4 = document.getElementById("password").value
    let input5 = document.getElementById("confirmPassword").value
    if (input1 === "" || input2 === "" || input3==="" || input4==="" || input5==="") {
        alert("Please fill in all fields")
    }
    else if(input4 != input5){
        alert("Password must match")
    }
    else {
        const obj = {
            email: input3,
            password: input4
        }
        localStorage.setItem("noteKeepCredentials", JSON.stringify(obj))
        alert("Sign Up successful, pls sign in")
        window.location.href = "login.html"
    }
}
