const timeContainer = document.getElementById("zeit-container");
const firstDay = "2013-05-22";
const firstDayDate = new Date(firstDay);
const intlNumberFormatter = new Intl.NumberFormat("en-US");

setInterval(() => {
  const now = new Date();
  const difference = Math.floor(
    (now.getTime() - firstDayDate.getTime()) / 1000
  );

  timeContainer.innerText = intlNumberFormatter.format(difference);
}, 1000);


// copyright year
document.getElementById('currentYear').textContent = new Date().getFullYear();
