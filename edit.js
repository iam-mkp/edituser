function saveToLocalStorage(event) {
  event.preventDefault()
  const name = event.target.username.value
  const email = event.target.emailId.value
  const phonenumber = event.target.phonenumber.value

  const obj = {
    name,
    email,
    phonenumber,
  }
  axios
    .post(
      "https://crudcrud.com/api/668f6d1ae18646c1b41a4961864d9a99/AppoinmentData",
      obj
    )
    .then((response) => {
      showNewUserOnScreen(response.data)
      console.log(response)
    })
    .catch((err) => {
      console.log(err)
    })

  // localStorage.setItem(obj.email ,JSON.stringify(obj));
  // showNewUserOnScreen(obj);
}

function showNewUserOnScreen(user) {
  const parentNode = document.getElementById("listOfUsers")
  const childHTML = `<li id=${user._id}> ${user.name} - ${user.email} 
                      <button onclick=deleteUser('${user._id}')> Delete User</button>
                      <button onclick=EditUser('${user.email}','${user.name}','${user.phonenumber}','${user._id}')> Edit User</button>
                      </li>`

  parentNode.innerHTML = parentNode.innerHTML + childHTML
}

window.addEventListener("DOMContentLoaded", () => {
  axios
    .get(
      "https://crudcrud.com/api/668f6d1ae18646c1b41a4961864d9a99/AppoinmentData"
    )
    .then((response) => {
      console.log(response)
      for (var i = 0; i < response.data.length; i++) {
        showNewUserOnScreen(response.data[i])
      }
    })
    .catch((err) => {
      console.log(error)
    })
  // const localStorageObj = localStorage;
  // const localStorageKeys = Object.keys(localStorageObj)

  // for(var i=0; i<localStorageKeys.length; i++){
  //     const key = localStorageKeys[i];
  //     const userDetailsString = localStorageObj[key]
  //     showNewUserOnScreen(userDetailsObj)
  // }
})

function EditUser(emailId, name, phonenumber, userId) {
  document.getElementById("emailId").value = emailId
  document.getElementById("username").value = name
  document.getElementById("phonenumber").value = phonenumber

  deleteUser(userId)
}
function deleteUser(userId) {
  axios
    .delete(
      `https://crudcrud.com/api/668f6d1ae18646c1b41a4961864d9a99/AppoinmentData/${userId}`
    )
    .then((response) => {
      removeUserFromScreen(userId)
    })
    .catch((err) => {
      console.log(err)
    })
  //     console.log(emailId)
  //     localStorage.removeItem(emailId);
  //     removeUserFromScreen(emailId);
}

function removeUserFromScreen(userId) {
  const parentNode = document.getElementById("listOfUsers")
  const childNodeToBeDeleted = document.getElementById(userId)

  parentNode.removeChild(childNodeToBeDeleted)
}
