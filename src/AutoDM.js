const T = require("./Twit.js");
const my_user_name = require("../config").userName;
const timeout = 1000 * 60 * 5; // timeout to send the message 5 min

const AutoDM = () => {
  const stream = T.stream("user");
  console.log("Start Sending Auto Direct Message 🚀🚀🚀");
  stream.on("follow", SendMessage);
};

const SendMessage = user => {
  const { screen_name, name } = user.source;

  const obj = {
    screen_name,
    text: GenerateMessage(name)
  };
  // the follow stream track if I follow author person too.
  if (screen_name != my_user_name) {
    console.log(" 🎉🎉🎉🎉 New Follower  🎉🎉🎉🎉🎉 ");
    setTimeout(() => {
      T.post("direct_messages/new", obj)
        .catch(err => {
          console.error("error", err.stack);
        })
        .then(result => {
          console.log(`Message sent successfully To  ${screen_name}  💪💪`);
        });
    }, timeout);
  }
};
const GenerateMessage = name => {
  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
  ];
  const d = new Date();
  const dayName = days[d.getDay()];
  return `Hello, ${name} Thanks for following me! You probably noticed if you browsed my profile, but if not, let me tell you: I'm a writer and blogger. In my blog, I post mostly flash fiction. It would be great if you give it a shot: ispreadwords.wordpress.com \nAlso, I want you to know I've recently published my first novella, My Last Foster Mom, a story about two very different women drawn together by their circumstances. If you feel like reading a short story (and helping an indie author grow), you can grab a copy here: http://amzn.com/B07DLP9CZ4/ \nThank you, and have a wonderful ${dayName}, ${name} `; // your message
  // My message   return `Hello, ${name} Thanks for following me! You probably noticed if you browsed my profile, but if not, let me tell you: I'm a writer and blogger. In my blog, I post mostly flash fiction. It would be great if you give it a shot: ispreadwords.wordpress.com \n Also, I want you to know I've recently published my first novella, My Last Foster Mom, a story about two very different women drawn together by their circumstances. If you feel like reading a short story (and helping an indie author grow), you can grab a copy here: http://amzn.com/B07DLP9CZ4/ \nThank you, and have a wonderful ${dayName} ${name} `;
};

module.exports = AutoDM;
