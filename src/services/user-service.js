import HttpService from './http-service'

export default {
    getUsers,
    // getById,
    login,
    logOut,
    signUp,
    update
}

// function getById(userId) {
//     return HttpService.get(`users/${userId}`)
// }
function getUsers() {
    return HttpService.get('user/users')
}

async function login(userCred) {
    const user = await HttpService.post('auth/login', userCred)
    return _handleLogin(user)
}
async function signUp(userCred) {
    const user = await HttpService.post('auth/signup', userCred)
    return _handleLogin(user)
}
async function logOut() {
    await HttpService.post('auth/logout');
    sessionStorage.clear();
}

async function update(user){
    let currUser = await HttpService.put('user/update', user)
    return _handleLogin(currUser)

}

//Set Session
function _handleLogin(user) {
    sessionStorage.setItem('user', JSON.stringify(user))
    return user;
}