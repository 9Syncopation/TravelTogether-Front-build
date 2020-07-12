import userService from '../services/user-service.js'
import utilService from '../services/util-service.js';

var localLoggedinUser = null;
var localusers = null;
if (sessionStorage.user) localLoggedinUser = JSON.parse(sessionStorage.user);
if (sessionStorage.users) localusers = JSON.parse(sessionStorage.users);



export default {
    state: {
        loggedinUser : localLoggedinUser,
        users: localusers
    },
    getters: {
        users(state) {
            return state.users;
        },
        loggedinUser(state) {
            return state.loggedinUser;
        },
    },
    mutations: {
        setUser(state, {user}) {
            state.loggedinUser = user;
        },
        setUsers(state, {users}) {
            utilService.store('users',users)
            state.users = users;
        },
        removeUser(state, {userId}) {
            state.users = state.users.filter(user => user._id !== userId)
        },
        updateUser(state,{updatedUser}){
            let idx = state.users.findIndex(user => user._id === updatedUser._id);
            state.users.splice(idx,1,updatedUser);
        }
    },
    actions: {
        async login(context, userCred) {
            const user = await userService.login(userCred);
            context.commit({type: 'setUser', user})
            return user;
        },
        async signUp(context, userCred) {
            // console.log("signUp -> userCred", userCred)
            // console.log("signUp -> context", context)
            const user = await userService.signUp(userCred)
            context.commit({type: 'setUser', user})
            return user;
        },
        async logOut(context) {
            await userService.logOut()
            context.commit({type: 'setUser', user: null})
        },
        async loadUsers(context) {
            const users = await userService.getUsers();
            context.commit({type: 'setUsers', users});
            return users;
        },
        async updateUser(context,{user}){
            const loggedUser = await userService.update(user);
            context.commit({type: 'setUser',user:loggedUser})
        },
        async updatePendingUser(context,user){
            const updatedUser = await userService.update(user);
            context.commit({type: 'updateUser', updatedUser})
        }
    }
}