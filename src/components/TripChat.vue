<template>
  <section class="tripChat flex column">
    <div class="chat-header flex row center space-between">
      <span>Trip Chat {{trip.title}}</span>
      <i class="fas fa-sliders-h"></i>
    </div>
    <div class="chat-body output">
      <li class="message clean-list" v-for="(msg, idx) in msgs" :key="idx" :class="myMessage(msg)">
        <div class="chat-from flex row center justify-start">
          <img class="chat-img" :src="msg.imgUrl" />
          <span class="chat-name">{{msg.from | capitalize}}</span>
        </div>
        <div class="chat-txt">{{msg.txt}}</div>
      </li>
    </div>
    <form class="chat-footer flex row center space-between" @submit.prevent="sendMsg">
      <input type="text" v-model="txt" placeholder="Share Your Thought's..." />
      <button>Send</button>
    </form>
  </section>
</template>
<script>
import SocketService from "../services/socket-service.js";
export default {
  props: ["trip"],
  data() {
    return {
      txt: "",
      msgs: []
    };
  },
  created() {
    SocketService.setup();
    SocketService.emit("chat topic", this.trip.title);
    SocketService.on("chat addMsg", this.addMsg);
  },
  destroyed() {
    SocketService.off("chat addMsg", this.addMsg);
    SocketService.terminate();
  },
  methods: {
    sendMsg() {
      if (this.txt) {
        let msg = {
          from: this.user.firstName,
          _id: this.user._id,
          imgUrl: this.user.imgUrl,
          txt: this.txt
        };
        SocketService.emit("chat newMsg", msg);
        this.txt = "";
      }
    },
    async addMsg(msg) {
      await this.msgs.push(msg);
    let messageBody = document.querySelector(".chat-body");
      messageBody.scrollTop =
        messageBody.scrollHeight - messageBody.clientHeight;
    },
    myMessage(msg) {
      if (this.user._id === msg._id) return { "my-message": true };
      return { "my-message": false };
    }
  },
  computed: {
    user() {
      let user = this.$store.getters.loggedinUser;
      if (!user)
        user = {
          firstName: "Guest123",
          _id: "test213",
          imgUrl:
            "http://lofrev.net/wp-content/photos/2017/03/user_blue_logo.png"
        };
      return user;
    }
  }
};
</script>