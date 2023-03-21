//   container for notifications
const main = document.querySelector("main");

// get data for Notifications

fetch("./data.json")
  .then((response) => response.json())
  .then((data) => {
    return data.data;
  })
  .then((notifications) => insertNotifications(notifications));

// insert notifications to container(main)
function insertNotifications(notifications) {
  console.log(notifications);
  notifications.forEach((notification) => {
    const element = document.createElement("div");
    element.className = "notification";

    if (notification.readed) {
      element.classList.add("marked");
    } else {
      element.classList.add("unmarked");
    }
    element.innerHTML = `
       <img class="avatar" src=${notification.avatar} />
       <div class="content">
            <p>
                <span class="name">${notification.name}&nbsp;</span>
                ${notification.message}&nbsp;
            
            
                ${
                  notification.extraMessage.hasExtraMessage &&
                  (notification.extraMessage.extraMessageType === "post" ||
                    notification.extraMessage.extraMessageType === "club")
                    ? `<span class="${notification.extraMessage.extraMessageType}">
                            ${notification.extraMessage.content}
                    </span>`
                    : ""
                }
                <span class="markPoint"></span>
            </p>

          

            <p class="createdTime">
                ${notification.createdTime}
            </p>

            ${
              notification.extraMessage.hasExtraMessage &&
              notification.extraMessage.extraMessageType === "message"
                ? `<p class="message">${notification.extraMessage.content}</p>`
                : ""
            }
       </div>
        ${
          notification.extraMessage.hasExtraMessage &&
          notification.extraMessage.extraMessageType === "picture"
            ? `<img class="pic" src=${notification.extraMessage.imgUrl}>`
            : ""
        }
        `;

    main.appendChild(element);
  });
}

const button = document.querySelector("button");
const badge = document.querySelector(".badge");
button.addEventListener("click", markAllAsRead);

function markAllAsRead() {
  badge.textContent = "0";
  console.log(notifications);
  notifications.forEach((notification) => {
    notification.classList.remove("unmarked");
    console.log(notifications);
  });
}
